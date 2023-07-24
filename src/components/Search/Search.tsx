import { useParams } from "react-router-dom";
import "./Search.scss";
import { useEffect, useState } from "react";
import { Header } from "../home/header/Header";
import { SearchSection } from "./searchSection/SearchSection";
import { ProfileContainer } from "../home/profileContainer/ProfileContainer";
import { IAdvertisement } from "../../interfaces/advertisement";
import http_common from "../../http_common";

export const Search = () => {
  const { value, category } = useParams();

  const [advertisements, setAdvertisements] = useState<IAdvertisement[]>([]);

  useEffect(() => {
    if (value) {
      if (category) {
        http_common
          .get(`api/Advertisements/SearchByCategory/${value}/${category}`)
          .then((resp) => {
            setAdvertisements(resp.data);
          });
      } else {
        http_common.get(`api/Advertisements/Search/${value}`).then((resp) => {
          setAdvertisements(resp.data);
        });
      }
    } else if (category) {
      http_common
        .get(`api/Advertisements/getByCategoryName/${category}`)
        .then((resp) => {
          setAdvertisements(resp.data);
        });
    } else {
      http_common.get(`api/Advertisements`).then((resp) => {
        setAdvertisements(resp.data);
      });
    }
  }, [value, category]);

  const formatDate = (date: Date) => {
    console.log(date);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  return (
    <>
      <div className="search">
        <div>
          <Header></Header>
          <ProfileContainer></ProfileContainer>
        </div>
        <SearchSection></SearchSection>
        <div className="advertisements">
          {advertisements.map((c: IAdvertisement) => {
            return (
              <div key={c.id}>
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
                      {c.location} {formatDate(c.creationDate)}
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
