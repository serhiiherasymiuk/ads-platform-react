import { Link } from "react-router-dom";
import "./ProfileContainer.scss";
import { useDispatch, useSelector } from "react-redux";
import { AuthUserActionType, IAuthUser } from "../../../interfaces/user";
import { googleLogout } from "@react-oauth/google";

export const ProfileContainer = () => {
  const dispatch = useDispatch();

  const { user, isAuth, isGoogle } = useSelector(
    (store: any) => store.auth as IAuthUser
  );

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    dispatch({ type: AuthUserActionType.LOGOUT_USER });
    if (isGoogle) googleLogout();
  };

  return (
    <>
      {isAuth ? (
        <div className="profile-container">
          <button onClick={onLogoutHandler}>Logout</button>
          <Link className="nav-link" to="/profile">
            {isGoogle ? (
              <img src={user?.profilePicture} alt="" />
            ) : user?.profilePicture ? (
              <img
                src={`https://adsplatformstorage.blob.core.windows.net/user-images/${user?.profilePicture}`}
                alt=""
              />
            ) : (
              <i className="bi bi-person-circle"></i>
            )}
          </Link>
        </div>
      ) : (
        <div className="links-container">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      )}
    </>
  );
};
