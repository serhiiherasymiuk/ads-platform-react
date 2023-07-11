import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ViewPost from "../Pages/ViewPost";
import Create from "../Pages/Create";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/login" Component={Login}></Route>
      <Route path="/create" Component={Create}></Route>
      <Route path="/view-post" Component={ViewPost} />
    </Routes>
  );
}

export default MainRoutes;
