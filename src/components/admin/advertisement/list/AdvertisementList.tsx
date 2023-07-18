import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import http_common from "../../../../http_common";
import { Link } from "react-router-dom";
import "./AdvertisementList.scss";
import { ModalDelete } from "../../../../common/ModalDelete";
import { ICategory } from "../../../../interfaces/category";
import { setCategories } from "../../../../redux/reducers/CategoryReducer";
import {
  IAdvertisment,
  IAdvertismentImage,
} from "../../../../interfaces/advertisment";

export const AdvertisementList = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const dispatch = useDispatch();

  const [advertisements, setAdvertisements] = useState<IAdvertisment[]>([]);

  useEffect(() => {
    http_common.get("api/Advertisments").then((resp) => {
      setAdvertisements(resp.data);
    });
    http_common.get("api/Categories").then((resp) => {
      dispatch(setCategories(resp.data));
    });
  }, []);

  return (
    <>
      <div className="advertisements">
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
              <th scope="col">Location</th>
              <th scope="col">Contact person</th>
              <th scope="col">Contact phone number</th>
              <th scope="col">Images</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {advertisements.map((a: IAdvertisment) => {
              return (
                <React.Fragment key={a.id}>
                  <tr>
                    <th scope="row">{a.id}</th>
                    <td>{a.name}</td>
                    <td>{a.description}</td>
                    <td>{a.location}</td>
                    <td>{a.contactPerson}</td>
                    <td>{a.contactPhoneNumber}</td>
                    <td className="advertisement-images">
                      {a.advertismentImages.map((i: IAdvertismentImage) => {
                        return (
                          <React.Fragment key={i.id}>
                            <img
                              src={`https://adsplatformstorage.blob.core.windows.net/advertisment-images/${i.image}`}
                              alt=""
                            />
                          </React.Fragment>
                        );
                      })}
                    </td>
                    <td>
                      <div className="buttons-container">
                        <ModalDelete id={a.id} text={a.name}></ModalDelete>
                        <Link
                          to={`edit/${a.id}`}
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
