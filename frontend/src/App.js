import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Cart from './components/Cart'
import Home from './components/Home'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'

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
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/not-found' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}
export default App
