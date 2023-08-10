import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import http_common from "../../../../http_common";
import { Link } from "react-router-dom";
import "./AdvertisementList.scss";
import {
  IAdvertisement,
  IAdvertisementImage,
} from "../../../../interfaces/advertisement";
import { ModalAdvertisementsDelete } from "../../../../common/ModalAdvertisementDelete";
import { ICategory } from "../../../../interfaces/category";

export const AdvertisementList = () => {
  const [advertisements, setAdvertisements] = useState<IAdvertisement[]>([]);

  useEffect(() => {
    http_common.get("api/Advertisements").then((resp) => {
      setAdvertisements(resp.data);
    });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await http_common.delete(`api/Advertisements/${id}`);
      setAdvertisements(advertisements.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error deleting advertisement:", error);
    }
  };

  return (
    <>
      <div className="advertisements-admin">
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
            {advertisements.map((a: IAdvertisement) => {
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
                      {a.advertisementImages.map((i: IAdvertisementImage) => {
                        return (
                          <React.Fragment key={i.id}>
                            <img
                              src={`https://adsplatformstorage.blob.core.windows.net/advertisement-images/${i.image}`}
                              alt=""
                            />
                          </React.Fragment>
                        );
                      })}
                    </td>
                    <td>
                      <div className="buttons-container">
                        <ModalAdvertisementsDelete
                          id={a.id}
                          text={a.name}
                          deleteFunc={handleDelete}
                        ></ModalAdvertisementsDelete>
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
