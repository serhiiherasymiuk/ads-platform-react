import "./App.css";
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import { Profile } from "./components/profile/Profile";
import { ProfileLayout } from "./components/profile/layout/ProfileLayout";
import { ProfileEdit } from "./components/profile/edit/ProfileEdit";
import { Login } from "./components/auth/login/Login";
import { useSelector } from "react-redux";
import { IAuthUser } from "./interfaces/user";
import { AdminLayout } from "./components/admin/layout/AdminLayout";
import { Homepage } from "./components/home/Homepage";
import { Register } from "./components/auth/register/Register";
import List from "./components/Pages/List";
import View from "./components/View/View";
import { CategoryCreate } from "./components/admin/category/create/CategoryCreate";
import { CategoryEdit } from "./components/admin/category/edit/CategoryEdit";
import { CategoryList } from "./components/admin/category/list/CategoryList";

function App() {
  const { user, isAuth, isGoogle } = useSelector(
    (store: any) => store.auth as IAuthUser
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="view-post/:id" element={<View />} />
        <Route path="list/:value" element={<List />} />

        {isAuth ? (
          <Route path={"/profile"} element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            {!isGoogle ? (
              <Route path="edit" element={<ProfileEdit />} />
            ) : (
              <Route path="edit" element={<Profile />} />
            )}
            {user?.roles.includes("admin") ? (
              <Route path={"admin"} element={<AdminLayout />}>
                <Route path="category">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit">
                    <Route path=":id" element={<CategoryEdit />} />
                  </Route>
                </Route>
              </Route>
            ) : (
              <Route path="admin" element={<Profile />} />
            )}
          </Route>
        ) : (
          <Route path="/profile" element={<Login />} />
        )}
      </Routes>
    </>
  );
}

export default App;
