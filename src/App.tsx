
import React from 'react';

import './App.css';
import MainRoutes from './Components/Route/MainRoutes';

function App() {
  return (
    <div>
      <MainRoutes />
    </div>

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./components/home/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
    </>

  );
}

export default App;
