import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/landing" index element={<LandingPage />} />
        <Route path="/forgotpassword" index element={<ForgotPasswordPage />} />
        <Route path="/resetpassword" index element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
