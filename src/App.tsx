import React from 'react';
import './App.css';
import MainRoutes from './Components/Route/MainRoutes';
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./components/home/Homepage";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
