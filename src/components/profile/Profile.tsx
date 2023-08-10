import { Link, useNavigate, useParams } from "react-router-dom";
import "./Profile.scss";
import React, { FC, useEffect, useState } from "react";
import { IAuthUser, IUser } from "../../interfaces/user";
import http_common from "../../http_common";
import { useSelector } from "react-redux";
import { IAdvertisement } from "../../interfaces/advertisement";
import { dark, light, Theme } from "../../styles/Theme.styled";

interface Props {
  toggleThemeFunc: () => void;
}
export const Profile: FC<Props> = ({ toggleThemeFunc }) => {
  const navigate = useNavigate();

  const { user, isAuth, isGoogle } = useSelector(
    (store: any) => store.auth as IAuthUser,
  );

  const { username } = useParams();

  const [owner, setOwner] = useState<IUser>();

  const [advertisements, setAdvertisements] = useState<IAdvertisement[]>([]);

  useEffect(() => {
    http_common.get(`api/Users/getByUserName/${username}`).then((resp) => {
      setOwner(resp.data);
      http_common
        .get(`api/Advertisements/getByUserId/${resp.data.id}`)
        .then((resp) => {
          setAdvertisements(resp.data);
        });
    });
  }, [owner?.id, username]);

  const formatDate = (date: Date) => {
    const utcDate = new Date(date);
    const day = utcDate.getUTCDate().toString().padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[utcDate.getUTCMonth()];
    const year = utcDate.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <>
      <div className="profile">
        <div className="profile-head">
          {!isAuth ? (
            <h1>Profile</h1>
          ) : user?.id === owner?.id ? (
            <h1>My Profile</h1>
          ) : (
            <h1>Profile</h1>
          )}
          <div className="toggle-switch">
            <label>
              <input onChange={() => toggleThemeFunc()} type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <div>
          <div>
            <img
              src={`https://adsplatformstorage.blob.core.windows.net/user-images/${owner?.profilePicture}`}
              alt=""
            />
            <h2>{owner?.userName}</h2>
          </div>
          {isAuth && user?.id === owner?.id && (
            <Link to="edit">
              <button>
                Edit <i className="bi bi-pencil"></i>
              </button>
            </Link>
          )}
        </div>
        <div className="personal-info">
          <div>
            <h3>Personal Information</h3>
            {isAuth && user?.id === owner?.id && (
              <Link to="edit">
                <button>
                  Edit <i className="bi bi-pencil"></i>
                </button>
              </Link>
            )}
          </div>
          <div>
            <div>
              <h5>Email</h5>
              <p>{owner?.email}</p>
            </div>
            <div>
              <h5>Phone Number</h5>
              <p>{owner?.phoneNumber}</p>
            </div>
          </div>
        </div>
        {advertisements.length > 0 && <h1>User Advertisements</h1>}
        <div className="advertisements">
          {advertisements.map((a: IAdvertisement) => {
            return (
              <div
                key={a.id}
                onClick={() => navigate(`/advertisement/${a.id}`)}
              >
                <img
                  src={`https://adsplatformstorage.blob.core.windows.net/advertisement-images/${a.advertisementImages[0].image}`}
                  alt=""
                />
                <div>
                  <div>
                    <p className="advertisement-title">{a.name}</p>
                    <div className="advertisement-price">
                      <i className="bi bi-truck"></i>
                      <div>
                        <p>{a.price}</p>
                        <i className="bi bi-currency-dollar"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>
                      {a.location} - {formatDate(a.creationDate)}
                    </p>
                  </div>
                </div>
                {user?.id === a.userId && (
                  <Link
                    to={`/edit/${a.id}`}
                    className="btn btn-warning btn-sm edit-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
