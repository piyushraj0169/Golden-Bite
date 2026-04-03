import User from "../models/User.js";
import Order from "../models/Order.js";
import FoodItem from "../models/FoodItem.js";
import bcrypt from "bcrypt";
import DeliveryAgent from "../models/DeliveryAgent.js";
import { getIO } from "../socket.js";

// Dashboard Analytics
export const getDashboardStats = async (req, res) => {
  try {
    const { timeframe } = req.query || { timeframe: 'all' };
    
    const now = new Date();
    let startDate = new Date(0); // default all time
    let groupBy = 'month'; // 'day', 'week', 'month'

    let prevStart = new Date(0);
    let prevEnd = new Date(0);

    if (timeframe === '1d') {
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      groupBy = 'hour';
      prevStart = new Date(startDate.getTime() - 24 * 60 * 60 * 1000);
      prevEnd = startDate;
    } else if (timeframe === '1w') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      groupBy = 'day';
      prevStart = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      prevEnd = startDate;
    } else if (timeframe === '1m') {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      groupBy = 'day';
      prevStart = new Date(startDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      prevEnd = startDate;
    } else if (timeframe === '3m') {
      startDate = new Date(now.setMonth(now.getMonth() - 3));
      groupBy = 'month';
      prevStart = new Date(new Date(startDate).setMonth(startDate.getMonth() - 3));
      prevEnd = startDate;
    } else if (timeframe === '6m') {
      startDate = new Date(now.setMonth(now.getMonth() - 6));
      groupBy = 'month';
      prevStart = new Date(new Date(startDate).setMonth(startDate.getMonth() - 6));
      prevEnd = startDate;
    } else if (timeframe === '1y') {
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      groupBy = 'month';
      prevStart = new Date(new Date(startDate).setFullYear(startDate.getFullYear() - 1));
      prevEnd = startDate;
    } else if (timeframe === '3y') {
      startDate = new Date(now.setFullYear(now.getFullYear() - 3));
      groupBy = 'year';
      prevStart = new Date(new Date(startDate).setFullYear(startDate.getFullYear() - 3));
      prevEnd = startDate;
    }

    const query = timeframe === 'all' ? {} : { createdAt: { $gte: startDate } };
    
    // CURRENT TIMEFRAME STATS
    const totalUsers = await User.countDocuments({ role: 'user', ...query });
    const orders = await Order.find(query).sort({ createdAt: 1 });
    const totalOrders = orders.length;

    let totalRevenue = 0;
    const chartMap = {};
    const itemFreq = {};
    const dayFreq = {};

    orders.forEach(o => { 
      let isPaid = o.status === 'paid' || o.status === 'completed';
      let amount = isPaid ? ((o.amount || 0) / 100) : 0;
      totalRevenue += amount;

      const d = new Date(o.createdAt || o.created_at || Date.now());
      let key = '';
      
      if (groupBy === 'hour') {
        key = `${d.getHours()}:00`;
      } else if (groupBy === 'day') {
        key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else if (groupBy === 'month') {
        key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      } else {
        key = d.getFullYear().toString();
      }

      if (!chartMap[key]) chartMap[key] = { name: key, sales: 0, orders: 0 };
      chartMap[key].orders += 1;
      chartMap[key].sales += amount;

      // Smart Insights Data Collection
      if (o.items && Array.isArray(o.items)) {
        o.items.forEach(i => {
          if (i.title) {
            itemFreq[i.title] = (itemFreq[i.title] || 0) + (i.qty || 1);
          }
        });
      }
      const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
      dayFreq[dayName] = (dayFreq[dayName] || 0) + 1;
    });

    const analyticsChart = Object.values(chartMap);
    if (analyticsChart.length === 0) {
      analyticsChart.push({ name: 'No Data', sales: 0, orders: 0 });
    }

    // PREVIOUS TIMEFRAME STATS (for % changes)
    let prevOrdersCount = 0;
    let prevRevenue = 0;
    let prevUsersCount = 0;

    if (timeframe !== 'all') {
      const prevQuery = { createdAt: { $gte: prevStart, $lt: prevEnd } };
      const prevOrdersDb = await Order.find(prevQuery);
      prevOrdersCount = prevOrdersDb.length;
      prevOrdersDb.forEach(o => {
        if (o.status === 'paid' || o.status === 'completed') {
           prevRevenue += ((o.amount||0)/100);
        }
      });
      prevUsersCount = await User.countDocuments({ role: 'user', ...prevQuery });
    }

    const calcChange = (current, prev) => {
      if (prev === 0 && current > 0) return 100;
      if (prev === 0 && current === 0) return 0;
      return (((current - prev) / prev) * 100).toFixed(1);
    };

    const changes = {
      orders: timeframe === 'all' ? null : calcChange(totalOrders, prevOrdersCount),
      revenue: timeframe === 'all' ? null : calcChange(totalRevenue, prevRevenue),
      users: timeframe === 'all' ? null : calcChange(totalUsers, prevUsersCount)
    };

    // SMART INSIGHTS EXTRACTION
    const topItems = Object.entries(itemFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(x => ({ name: x[0], sold: x[1] }));
    const peakDay = Object.entries(dayFreq).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      activeDeliveries: await Order.countDocuments({ status: 'out_for_delivery' }),
      analyticsChart,
      changes,
      insights: { topItems, peakDay }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

// Users Management
export const updateUser = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (role) user.role = role;
    if (password && password.trim().length > 0) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    
    const safeUser = user.toObject();
    delete safeUser.password;
    res.json(safeUser);
  } catch (err) { 
    console.error(err);
    res.status(500).json({ message: "Error updating user credentials" }); 
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ message: "Error fetching users" }); }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted completely" });
  } catch (err) { res.status(500).json({ message: "Error deleting user" }); }
};

export const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({message: "User not found"});
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json(user);
  } catch (err) { res.status(500).json({ message: "Error toggling block status" }); }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { res.status(500).json({ message: "Error fetching user orders" }); }
};

// Food Items Menu Management
export const getMenu = async (req, res) => {
  try {
    const menu = await FoodItem.find();
    res.json(menu);
  } catch (err) { res.status(500).json({ message: "Error fetching menu" }); }
}

export const addFoodItem = async (req, res) => {
  try {
    const itemData = { ...req.body };
    if (req.file) {
      itemData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    const item = await FoodItem.create(itemData);
    res.json(item);
  } catch (err) { 
    import('fs').then(fs => fs.writeFileSync('last_add_error.txt', String(err.stack)));
    res.status(500).json({ message: "Error adding food item", error: err.message }); 
  }
}

export const updateFoodItem = async (req, res) => {
  try {
    const itemData = { ...req.body };
    if (req.file) {
      itemData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    const item = await FoodItem.findByIdAndUpdate(req.params.id, itemData, { new: true });
    res.json(item);
  } catch (err) { res.status(500).json({ message: "Error updating food item", error: err.message }); }
}

export const deleteFoodItem = async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Food item deleted" });
  } catch (err) { res.status(500).json({ message: "Error deleting food item" }); }
}

// Order Management
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email phone')
      .populate('deliveryAgentId', 'name phone vehicleNumber')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { res.status(500).json({ message: "Error fetching orders" }); }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    try {
      const io = getIO();
      if (io) {
        io.emit('order_status_change', {
          order_id: order.order_id || order._id,
          status: status
        });
      }
    } catch (e) { console.error("Socket emit failed", e); }

    res.json(order);
  } catch (err) { res.status(500).json({ message: "Error updating order status" }); }
}

export const assignDeliveryAgent = async (req, res) => {
  try {
    const { agentId } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { deliveryAgentId: agentId }, { new: true });
    res.json(order);
  } catch (err) { res.status(500).json({ message: "Error assigning delivery agent" }); }
}

// Delivery Agents Management
export const getAgents = async (req, res) => {
  try {
    const agents = await DeliveryAgent.find();
    res.json(agents);
  } catch (err) { res.status(500).json({ message: "Error fetching delivery agents" }); }
}

export const addAgent = async (req, res) => {
  try {
    const agent = await DeliveryAgent.create(req.body);
    res.json(agent);
  } catch (err) { res.status(500).json({ message: "Error adding delivery agent" }); }
}
