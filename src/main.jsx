import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter} from 'react-router-dom';

import StoreContextProvider from './context/StoreContext.jsx';

import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
    <AuthProvider>
  <App />
  </AuthProvider>
  </StoreContextProvider>
  </BrowserRouter>,
  
)
