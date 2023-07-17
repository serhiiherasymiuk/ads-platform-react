import React from 'react';
import './App.css';
import MainRoutes from './Components/Route/MainRoutes';
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./Components/home/Homepage";
import  {Login}  from "./Components/Login/Login";
import { Register } from "./Components/register/Register";
import View from './Components/View/View';
import List from './Components/Pages/List';


import AdminLayout from './Components/Admin/container/AdminLayout';
import CreateCategories from './Components/Admin/Category/create/CreateCategories';
import EditCategory from './Components/Admin/Category/edit/EditCategories';
import AdminDashboard from './Components/Admin/dashboard/AdminDashboard';
import { ListCategory } from './Components/Admin/Category/list/ListCategories';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="view-post/:id" element={<View/>} />
        <Route path="list/:value" element={<List/>} />
        
        <Route path={"/admin"} element={<AdminLayout/>}>
                    <Route index element={<AdminDashboard/>}/>
                    <Route path="category">
                        <Route index element={<ListCategory/>}/>
                        <Route path="create" element={<CreateCategories/>}/>
                        <Route path="edit">
                            <Route path=":id" element={<EditCategory/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
    </>
  );
}

export default App;
