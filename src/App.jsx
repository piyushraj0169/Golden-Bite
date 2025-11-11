
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





function App()
{
  return(
    <div>
      <Navbar/>
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
      </Routes> 
     
      <Footer/>
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