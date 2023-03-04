import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Cart from './components/Cart'
import Home from './components/Home'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import CheckoutSuccess from './components/CheckoutSuccess'
import Dashboard from './components/admin/Dashboard'
import Products from './components/admin/Products'
import Summary from './components/admin/Summary'
import CreateProduct from './components/admin/CreateProduct'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ToastContainer />
        <NavBar />

        <div className='content-container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout-success' element={<CheckoutSuccess />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<Dashboard />}>
              <Route path='products' element={<Products />}>
                <Route path='create-product' element={<CreateProduct />} />
              </Route>
              <Route path='summary' element={<Summary />} />
            </Route>
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/not-found' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}
export default App
