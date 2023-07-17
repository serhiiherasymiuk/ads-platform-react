import { Link, useNavigate, useLocation } from "react-router-dom";
import "./ProfileSidebar.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../../interfaces/user";

export const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuth, isGoogle } = useSelector(
    (store: any) => store.auth as IAuthUser
  );

  return (
    <>
      <div className="profile-sidebar">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          <i className="bi bi-house"></i>
          Home
        </Link>
        <Link
          className={location.pathname === "/profile" ? "active" : ""}
          to="/profile"
        >
          <i className="bi bi-person"></i>
          Profile
        </Link>
        {!isGoogle && (
          <Link
            className={location.pathname === "/profile/edit" ? "active" : ""}
            to="edit"
          >
            <i className="bi bi-pencil"></i>
            Edit
          </Link>
        )}
        {user?.roles.includes("admin") && (
          <Link
            className={location.pathname.includes("/admin") ? "active" : ""}
            to="admin"
          >
            <i className="bi bi-gear"></i>
            Admin
          </Link>
        )}
      </div>
    </>
  );
};
