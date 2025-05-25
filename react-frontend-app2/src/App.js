import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProviderSKR } from './allCompontsSKR/AuthContextSKR';
import HeaderSKR from './allCompontsSKR/HeaderSKR';
import HomeSKR from './allCompontsSKR/HomeSKR';
import LoginSKR from './allCompontsSKR/LoginSKR';
import ContactUsSKR from './allCompontsSKR/ContactUsSKR';
import AboutUsSKR from './allCompontsSKR/AboutUsSKR';
import RecipeExplorerSKR from './allCompontsSKR/RecipeExplorerSKR';
import { Provider } from 'react-redux';
import './App.css';

function App() {
  return (
      <AuthProviderSKR>
          <BrowserRouter >
            <HeaderSKR />
            <Routes>
              <Route path="/" element={<HomeSKR />} />
              <Route path="/homeSKR" element={<HomeSKR />} />
              <Route path="/loginSKR" element={<LoginSKR />} />     
              <Route path="/ContactUsSKR" element={<ContactUsSKR />} />
              <Route path="/aboutusSKR" element={<AboutUsSKR />} />
              <Route path="/recipeSKR" element={<RecipeExplorerSKR />} />
            </Routes>
          </BrowserRouter>
      </AuthProviderSKR>
  );
}

export default App;

