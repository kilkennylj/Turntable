import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import AlbumPage from './pages/AlbumPage';

function App() 
{
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" index element={<LoginPage />} />
    <Route path="/albums" index element={<AlbumPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
