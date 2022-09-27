import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import './index.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
