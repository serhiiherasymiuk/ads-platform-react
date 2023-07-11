import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./components/home/Homepage";
import { Login } from "./components/login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
