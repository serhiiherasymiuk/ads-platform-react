import { Link } from "react-router-dom";
import "./Categories.scss";
import { useEffect, useState } from "react";
import http_common from "../../../http_common";
import { ICategory } from "../../../interfaces/category";
import React from "react";

export const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    http_common.get("api/Categories").then((resp) => {
      setCategories(resp.data);
    });
  }, []);

  return (
    <>
      <div className="profile-container">
        <button>Login</button>
        <button>Register</button>
      </div>
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
