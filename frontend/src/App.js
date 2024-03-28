import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import CarouselTest from './pages/CarouselTest';

function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/landing" index element={<LandingPage />} />
        <Route path="/carouseltest" index element={<CarouselTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
