import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import http_common from "../../../../http_common";
import { Link } from "react-router-dom";
import { ISubcategory } from "../../../../interfaces/subcategory";
import "./SubcategoryList.scss";
import { ModalDelete } from "../../../../common/ModalDelete";
import { setSubcategories } from "../../../../redux/reducers/SubcategoryReducer";

export const SubcategoryList = () => {
  const subcategories = useSelector(
    (state: RootState) => state.subcategory.subcategories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    http_common.get("api/Subcategories").then((resp) => {
      dispatch(setSubcategories(resp.data));
    });
  }, []);

  return (
    <>
      <div className="subcategories">
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
              <th scope="col">Category id</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((s: ISubcategory) => {
              return (
                <React.Fragment key={s.id}>
                  <tr>
                    <th scope="row">{s.id}</th>
                    <td>{s.name}</td>
                    <td>{s.description}</td>
                    <td>{s.categoryId}</td>
                    <td>
                      <div className="buttons-container">
                        <ModalDelete id={s.id} text={s.name}></ModalDelete>
                        <Link
                          to={`edit/${s.id}`}
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
