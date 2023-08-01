import { useNavigate, useParams } from "react-router-dom";
import http_common from "../../http_common";
import { SearchSection } from "../search/searchSection/SearchSection";
import { Header } from "../home/header/Header";
import { ProfileContainer } from "../home/profileContainer/ProfileContainer";
import "./AdvertisementDetails.scss";
import { useEffect, useState } from "react";
import {
  IAdvertisement,
  IAdvertisementImage,
} from "../../interfaces/advertisement";
import { IUser } from "../../interfaces/user";

export const AdvertisementDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formattedCreationDate, setFormattedCreationDate] =
    useState<string>("");

  const [formattedRegistrationDate, setFormattedRegistrationDate] =
    useState<string>("");

  const [advertisement, setAdvertisement] = useState<IAdvertisement>();
  const [user, setUser] = useState<IUser>();

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

  useEffect(() => {
    http_common.get(`api/Advertisements/${id}`).then((resp) => {
      setAdvertisement(resp.data);
      if (resp.data && resp.data.creationDate) {
        const utcDate = new Date(resp.data.creationDate);
        const day = utcDate.getUTCDate().toString().padStart(2, "0");
        const hours = utcDate.getUTCHours().toString().padStart(2, "0");
        const minutes = utcDate.getUTCMinutes().toString().padStart(2, "0");
        const month = monthNames[utcDate.getUTCMonth()];
        const year = utcDate.getUTCFullYear();
        const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}`;
        setFormattedCreationDate(formattedDate);
      }
      http_common.get(`api/Users/${resp.data.userId}`).then((resp) => {
        setUser(resp.data);
        const utcDate = new Date(resp.data.registrationDate);
        const month = monthNames[utcDate.getUTCMonth()];
        const year = utcDate.getUTCFullYear();
        setFormattedRegistrationDate(`${month} ${year}`);
      });
    });
  }, []);

  return (
    <>
      <div className="advertisementDetails">
        <div>
          <Header></Header>
          <ProfileContainer></ProfileContainer>
        </div>
        <SearchSection></SearchSection>
        <div className="advertisement-info">
          <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
              {advertisement?.advertisementImages.map(
                (i: IAdvertisementImage, index: number) => (
                  <button
                    key={i.id}
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={index.toString()}
                    className={index === 0 ? "active" : ""}
                  ></button>
                )
              )}
            </div>
            <div className="carousel-inner">
              {advertisement?.advertisementImages.map(
                (i: IAdvertisementImage, index: number) => (
                  <div
                    key={i.id}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={`https://adsplatformstorage.blob.core.windows.net/advertisement-images/${i.image}`}
                      alt={i.image}
                    />
                  </div>
                )
              )}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div>
            {formattedCreationDate && (
              <p className="date">Published at {formattedCreationDate}</p>
            )}
            <h3>{advertisement?.name}</h3>
            <div className="price">
              <p>{advertisement?.price}</p>
              <i className="bi bi-currency-dollar"></i>
            </div>
            <p>{advertisement?.description}</p>
            <p>
              <i className="bi bi-geo-alt"></i>
              {advertisement?.location}
            </p>
          </div>
        </div>
        <div className="user-info">
          <div>
            <h3>Connect with seller</h3>
          </div>
          <div>
            <div onClick={() => navigate(`/profile/${user?.userName}`)}>
              <img
                  src={`https://adsplatformstorage.blob.core.windows.net/user-images/${user?.profilePicture}`}
                  alt=""
              />
              <div className="user-contact">
                <p>{advertisement?.contactPerson}</p>
                <p>On AdsPlatform since {formattedRegistrationDate}</p>
              </div>
            </div>
            <div>
              <i className="bi bi-telephone call-icon"></i>
              <p>{advertisement?.contactPhoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
