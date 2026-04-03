
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Cart from './pages/Cart'

import Footer from './components/Footer'
import ProductList from './components/ProductList'
import Products from './pages/Products'
import TermsAndConditions from './pages/TermsAndCondition'
import Support from './pages/Support'

import Checkout from "./pages/Checkout"

import Success from "./pages/Success"


import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";

// Admin Imports
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMenu from './pages/admin/AdminMenu';
import AdminDelivery from './pages/admin/AdminDelivery';
import AdminPayments from './pages/admin/AdminPayments';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import { useLocation } from 'react-router-dom';

function App()
{
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  return(
    <div>
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='/services' element={<Services/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path='/productlist' element={<Products />} />
        <Route path='/termsandcondition' element={<TermsAndConditions/>} />
        <Route path='/support' element={<Support />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="delivery" element={<AdminDelivery />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
     
      {!isAdminRoute && <Footer/>}
    </div>
  )
}
export default App
























// import {Routes,Route} from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Services from './pages/Services';
// import Contact from './pages/Contact';
// import About from './pages/About';
// import  './App.css';
// import OurFeature from './components/OurFeature';
// import Footer from './components/Footer';
// import Products from './pages/Products'
// import NoMatch from './pages/NoMatch'


// function App() {
//   return (

//     <div>
      
//       <Navbar/>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/services' element={<Services/>}/>
//         <Route path='/contact' element={<Contact/>}/>
//         <Route path='/about' element={<About/>}/>
//         <Route path='/products' element={<Products/>}/>
//         <Route path='*' element={<NoMatch/>}/>
//       </Routes>

//       <Footer/>

      

     
      

//     </div>
    
//   )
// }

// export default App