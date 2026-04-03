import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';
import upload from '../utils/upload.js';
import { 
  getDashboardStats, 
  getUsers, updateUser, deleteUser, toggleBlockUser, getUserOrders,
  getMenu, addFoodItem, updateFoodItem, deleteFoodItem,
  getOrders, updateOrderStatus, assignDeliveryAgent,
  getAgents, addAgent
} from '../controllers/adminController.js';

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

// Analytics
router.get('/dashboard-stats', getDashboardStats);

// Users CRUD
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/block', toggleBlockUser);
router.get('/users/:id/orders', getUserOrders);

// Menu CRUD
router.get('/menu', getMenu);
router.post('/menu', upload.single('image'), addFoodItem);
router.put('/menu/:id', upload.single('image'), updateFoodItem);
router.delete('/menu/:id', deleteFoodItem);

// Orders CRUD
router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.put('/orders/:id/assign', assignDeliveryAgent);

// Delivery Agents CRUD
router.get('/delivery', getAgents);
router.post('/delivery', addAgent);

export default router;
