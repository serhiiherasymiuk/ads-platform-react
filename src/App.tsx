import "./App.css";
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { IAuthUser } from "./interfaces/user";
import { Login } from "./Components/auth/login/Login";
import { List } from "reactstrap";
import View from "./Components/View/View";
import { Register } from "./Components/auth/register/Register";
import { Homepage } from "./Components/home/Homepage";
import { Profile } from "./Components/profile/Profile";
import { ProfileEdit } from "./Components/profile/edit/ProfileEdit";
import { ProfileLayout } from "./Components/profile/layout/ProfileLayout";
import { CategoryCreate } from "./Components/admin/category/create/CategoryCreate";
import { CategoryEdit } from "./Components/admin/category/edit/CategoryEdit";
import { CategoryList } from "./Components/admin/category/list/CategoryList";
import { AdminLayout } from "./Components/admin/layout/AdminLayout";

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
