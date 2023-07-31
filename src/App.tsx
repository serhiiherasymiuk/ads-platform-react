import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { IAuthUser } from "./interfaces/user";
import { Login } from "./components/auth/login/Login";
import View from "./components/View/View";
import { Register } from "./components/auth/register/Register";
import { Homepage } from "./components/home/Homepage";
import { Profile } from "./components/profile/Profile";
import { ProfileEdit } from "./components/profile/edit/ProfileEdit";
import { ProfileLayout } from "./components/profile/layout/ProfileLayout";
import { CategoryCreate } from "./components/admin/category/create/CategoryCreate";
import { CategoryEdit } from "./components/admin/category/edit/CategoryEdit";
import { CategoryList } from "./components/admin/category/list/CategoryList";
import { AdminLayout } from "./components/admin/layout/AdminLayout";
import { AdvertisementList } from "./components/admin/advertisement/list/AdvertisementList";
import { AdvertisementCreate } from "./components/admin/advertisement/create/AdvertisementCreate";
import { AdvertisementEdit } from "./components/admin/advertisement/edit/AdvertisementEdit";
import { Search } from "./components/Search/Search";
import { Create } from "./components/advertisementDetails/create/Create";
import { AdvertisementDetails } from "./components/advertisementDetails/AdvertisementDetails";
import Notification from "./common/loader/Loader";

function App() {
  const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);

  return (
    <>
      <Notification />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="view-post/:id" element={<View />} />
        <Route path="search/:value" element={<Search />} />
        <Route path="search/" element={<Search />} />
        <Route path=":category/:value" element={<Search />} />
        <Route path=":category/" element={<Search />} />
        <Route path="/advertisement/:id" element={<AdvertisementDetails />} />
        {isAuth ? (
          <Route path="/create" element={<Create />} />
        ) : (
          <Route path="/create" element={<Login />} />
        )}
        <Route path={"/profile/:username"} element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          {isAuth ? (
            <Route path="edit" element={<ProfileEdit />} />
          ) : (
            <Route path="edit" element={<Login />} />
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
              <Route path="advertisement">
                <Route index element={<AdvertisementList />} />
                <Route path="create" element={<AdvertisementCreate />} />
                <Route path="edit">
                  <Route path=":id" element={<AdvertisementEdit />} />
                </Route>
              </Route>
            </Route>
          ) : (
            <Route path="admin" element={<Profile />} />
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
