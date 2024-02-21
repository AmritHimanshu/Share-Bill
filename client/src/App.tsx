import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import './pages/style.css'
import { Home } from './pages/Home';
import AddBill from './pages/AddBill';
import BillPage from './pages/BillPage';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await fetch('/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      const data = await res.json();

      if (data) {
        dispatch(login(data));
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-bill" element={<AddBill />} />
          <Route path="/:name/:billId" element={<BillPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
