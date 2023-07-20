import { Link, useNavigate } from "react-router-dom";
import "./Categories.scss";
import { useEffect, useState } from "react";
import http_common from "../../../http_common";
import { ICategory } from "../../../interfaces/category";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthUserActionType, IAuthUser } from "../../../interfaces/user";
import { googleLogout } from "@react-oauth/google";

export const Categories = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isAuth, isGoogle } = useSelector(
    (store: any) => store.auth as IAuthUser
  );

  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    http_common.get("api/Categories/getHead").then((resp) => {
      setCategories(resp.data);
    });
  }, []);

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
      <div className="category-container">
        {categories.map((c: ICategory) => {
          return (
            <React.Fragment key={c.id}>
              <div>
                <img
                  src={`https://adsplatformstorage.blob.core.windows.net/category-images/${c.image}`}
                  alt={c.name}
                />
                <p>{c.name}</p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
