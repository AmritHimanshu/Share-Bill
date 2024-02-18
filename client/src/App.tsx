import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './pages/style.css'
import { Home } from './pages/Home';
import NewHome from './pages/NewHome';
import BillPage from './pages/BillPage';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-bill" element={<NewHome />} />
          <Route path="/view-bill" element={<BillPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
