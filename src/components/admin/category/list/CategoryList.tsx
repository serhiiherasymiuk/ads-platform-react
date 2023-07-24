import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import http_common from "../../../../http_common";
import { Link } from "react-router-dom";
import "./CategoryList.scss";
import { ICategory } from "../../../../interfaces/category";
import { setCategories } from "../../../../redux/reducers/CategoryReducer";
import { ModalCategoryDelete } from "../../../../common/ModalCategoryDelete";

export const CategoryList = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    http_common.get("api/Categories").then((resp) => {
      dispatch(setCategories(resp.data));
    });
  }, []);

  return (
    <>
      <div className="categories-admin">
        <Link to={"create"}>
          <button type="button" className="btn btn-dark">
            Create
          </button>
        </Link>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Parent</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c: ICategory) => {
              return (
                <React.Fragment key={c.id}>
                  <tr>
                    <th scope="row">{c.id}</th>
                    <td>{c.name}</td>
                    <td>{c.description}</td>
                    <td>{c.parentId}</td>
                    <td>
                      <img
                        src={`https://adsplatformstorage.blob.core.windows.net/category-images/${c.image}`}
                        alt=""
                      />
                    </td>
                    <td>
                      <div className="buttons-container">
                        <ModalCategoryDelete
                          id={c.id}
                          text={c.name}
                        ></ModalCategoryDelete>
                        <Link
                          to={`edit/${c.id}`}
                          className="btn btn-warning btn-sm"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
