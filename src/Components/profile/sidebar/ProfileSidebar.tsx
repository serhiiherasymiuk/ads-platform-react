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

  useEffect(() => {
    if (!isAuth) navigate("/register");
  }, []);

  return (
    <>
      <div className="profile-sidebar">
        <Link
          className={location.pathname === "/profile" ? "active" : ""}
          to="/profile"
        >
          Profile
        </Link>
        {!isGoogle && (
          <Link
            className={location.pathname === "/profile/edit" ? "active" : ""}
            to="edit"
          >
            Edit
          </Link>
        )}
        <Link
          className={location.pathname === "admin" ? "active" : ""}
          to="admin"
        >
          Admin
        </Link>
      </div>
    </>
  );
};
