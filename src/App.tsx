import React from "react";
import "./App.css";
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./components/home/Homepage";
import { Register } from "./components/register/Register";
import { Profile } from "./components/profile/Profile";
import { ProfileLayout } from "./components/profile/layout/ProfileLayout";
import { ProfileEdit } from "./components/profile/edit/ProfileEdit";
import { Login } from "./components/login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={"/profile"} element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="edit" element={<ProfileEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
