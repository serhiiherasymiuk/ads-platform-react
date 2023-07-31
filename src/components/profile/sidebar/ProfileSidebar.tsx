import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "./ProfileSidebar.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAuthUser, IUser } from "../../../interfaces/user";
import http_common from "../../../http_common";

export const ProfileSidebar = () => {
  const navigate = useNavigate();

  const { username } = useParams();

  const location = useLocation();

  const { user, isAuth, isGoogle } = useSelector(
    (store: any) => store.auth as IAuthUser
  );

  const [owner, setOwner] = useState<IUser>();

  useEffect(() => {
    http_common.get(`api/Users/getByUserName/${username}`).then((resp) => {
      setOwner(resp.data);
    });
  }, [username]);

  return (
    <>
      <div className="profile-sidebar">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          <i className="bi bi-house"></i>
          Home
        </Link>
        <Link
          className={
            location.pathname === `/profile/${owner?.userName}` ? "active" : ""
          }
          to={`/profile/${owner?.userName}`}
        >
          <i className="bi bi-person"></i>
          Profile
        </Link>
        {isAuth && user?.id === owner?.id && !isGoogle && (
          <Link
            className={
              location.pathname === `/profile/${user?.userName}/edit`
                ? "active"
                : ""
            }
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
