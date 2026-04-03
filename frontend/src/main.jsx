import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

import StoreContextProvider from './context/StoreContext.jsx';

import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from './components/ScrollToTop.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop />
    <StoreContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StoreContextProvider>
  </BrowserRouter>,

)
