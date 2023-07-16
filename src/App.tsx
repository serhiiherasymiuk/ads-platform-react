import "./App.css";
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./components/home/Homepage";
import { Register } from "./components/auth/register/Register";
import { Profile } from "./components/profile/Profile";
import { ProfileLayout } from "./components/profile/layout/ProfileLayout";
import { ProfileEdit } from "./components/profile/edit/ProfileEdit";
import { Login } from "./components/auth/login/Login";
import { useSelector } from "react-redux";
import { IAuthUser } from "./interfaces/user";
import { AdminLayout } from "./components/admin/layout/AdminLayout";
import { SubcategoryList } from "./components/admin/subcategory/list/SubcategoryList";
import { SubcategoryCreate } from "./components/admin/subcategory/create/create/SubcategoryCreate";
import { SubcategoryEdit } from "./components/admin/subcategory/edit/SubcategoryEdit";

function App() {
  const { user, isAuth, isGoogle } = useSelector(
    (store: any) => store.auth as IAuthUser
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
                <Route path="subcategories">
                  <Route index element={<SubcategoryList />} />
                  <Route path="create" element={<SubcategoryCreate />} />
                  <Route path="edit">
                    <Route path=":id" element={<SubcategoryEdit />} />
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
