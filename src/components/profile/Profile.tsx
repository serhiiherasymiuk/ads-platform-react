import { Link, useNavigate, useParams } from "react-router-dom";
import "./Profile.scss";
import { useEffect, useState } from "react";
import { IAuthUser, IUser } from "../../interfaces/user";
import http_common from "../../http_common";
import { useSelector } from "react-redux";
import { IAdvertisement } from "../../interfaces/advertisement";
export const Profile = () => {
  const navigate = useNavigate();

  const { user, isAuth, isGoogle } = useSelector(
    (store: any) => store.auth as IAuthUser
  );

  const { username } = useParams();

  const [owner, setOwner] = useState<IUser>();

  const [advertisements, setAdvertisements] = useState<IAdvertisement[]>([]);

  useEffect(() => {
    http_common.get(`api/Users/getByUserName/${username}`).then((resp) => {
      setOwner(resp.data);
    });
    http_common
      .get(`api/Advertisements/getByUserId/${owner?.id}`)
      .then((resp) => {
        setAdvertisements(resp.data);
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
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  return (
    <>
      <div className="profile">
        {!isAuth ? (
          <h1>Profile</h1>
        ) : user?.id === owner?.id ? (
          <h1>My Profile</h1>
        ) : (
          <h1>Profile</h1>
        )}
        <div>
          <div>
            {owner?.profilePicture ? (
              <img
                src={`https://adsplatformstorage.blob.core.windows.net/user-images/${owner?.profilePicture}`}
                alt=""
              />
            ) : (
              <i className="bi bi-person-circle"></i>
            )}
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
          {advertisements.map((c: IAdvertisement) => {
            return (
              <div
                key={c.id}
                onClick={() => navigate(`/advertisement/${c.id}`)}
              >
                <img
                  src={`https://adsplatformstorage.blob.core.windows.net/advertisement-images/${c.advertisementImages[0].image}`}
                  alt=""
                />
                <div>
                  <div>
                    <p className="advertisement-title">{c.name}</p>
                    <div className="advertisement-price">
                      <i className="bi bi-truck"></i>
                      <div>
                        <p>{c.price}</p>
                        <i className="bi bi-currency-dollar"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>
                      {c.location} - {formatDate(c.creationDate)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
