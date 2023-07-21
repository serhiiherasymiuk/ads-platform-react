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
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    http_common.get("api/Categories/getHead").then((resp) => {
      setCategories(resp.data);
    });

    http_common.get("api/Categories").then((resp) => {
      setAllCategories(resp.data);
    });
  }, []);

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    dispatch({ type: AuthUserActionType.LOGOUT_USER });
    if (isGoogle) googleLogout();
  };

  const [subcategories, setSubcategories] = useState<{
    [parentId: number]: ICategory[];
  }>({});

  const [hoveredCategories, setHoveredCategories] = useState<number[]>([]);

  const fetchSubcategories = (id: number) => {
    setSubcategories((prevSubcategories) => ({
      ...prevSubcategories,
      [id]: allCategories.filter((c) => c.parentId === id),
    }));
  };

  const handleSubcategoryMouseEnter = (id: number) => {
    setHoveredCategories((prevHoveredCategories) => [
      ...prevHoveredCategories,
      id,
    ]);
    if (!subcategories[id]) {
      fetchSubcategories(id);
    }
  };

  const handleSubcategoryMouseLeave = (id: number) => {
    setHoveredCategories((prevHoveredCategories) =>
      prevHoveredCategories.filter((categoryId) => categoryId !== id)
    );
  };

  const renderSubcategories = (id: number) => {
    if (hoveredCategories.includes(id) && subcategories[id]?.length) {
      return (
        <ul>
          <i className="bi bi-caret-right-fill category-icon"></i>
          {subcategories[id].map((subcategory: ICategory) => (
            <li
              key={subcategory.id}
              onMouseEnter={() => handleSubcategoryMouseEnter(subcategory.id)}
              onMouseLeave={() => handleSubcategoryMouseLeave(subcategory.id)}
            >
              <img
                src={`https://adsplatformstorage.blob.core.windows.net/category-images/${subcategory.image}`}
                alt={subcategory.name}
              />
              <p>{subcategory.name}</p>
              <div>{renderSubcategories(subcategory.id)}</div>
            </li>
          ))}
        </ul>
      );
    }
    return null;
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
              <div
                onMouseEnter={() => handleSubcategoryMouseEnter(c.id)}
                onMouseLeave={() => handleSubcategoryMouseLeave(c.id)}
              >
                <img
                  src={`https://adsplatformstorage.blob.core.windows.net/category-images/${c.image}`}
                  alt={c.name}
                />
                <p>{c.name}</p>
                {hoveredCategories.find((x) => x === c.id) && (
                  <div className="categories active">
                    {renderSubcategories(c.id)}
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
