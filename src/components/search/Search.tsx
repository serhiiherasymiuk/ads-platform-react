import { Link, useNavigate, useParams } from "react-router-dom";
import "./Search.scss";
import React, { useEffect, useRef, useState } from "react";
import { Header } from "../home/header/Header";
import { ProfileContainer } from "../home/profileContainer/ProfileContainer";
import { IAdvertisement } from "../../interfaces/advertisement";
import http_common from "../../http_common";
import { ICategory } from "../../interfaces/category";
import { SearchSection } from "./searchSection/SearchSection";
import no_items_found from "../../assets/no_items_found.png";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../interfaces/user";

export const Search = () => {
  const { user } = useSelector((store: any) => store.auth as IAuthUser);

  const { value, category } = useParams();

  const [advertisements, setAdvertisements] = useState<IAdvertisement[]>([]);

  const [headCategories, setHeadCategories] = useState<ICategory[]>([]);

  const [allCategories, setAllCategories] = useState<ICategory[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectMessage, setSelectMessage] = useState<string>();

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      if (category) {
        http_common
          .get(`api/Advertisements/searchByCategory/${value}/${category}`)
          .then((resp) => {
            setAdvertisements(resp.data);
          });
      } else {
        http_common.get(`api/Advertisements/search/${value}`).then((resp) => {
          setAdvertisements(resp.data);
        });
      }
    } else if (category) {
      http_common
        .get(`api/Advertisements/searchByCategory/${category}`)
        .then((resp) => {
          setAdvertisements(resp.data);
        });
    } else {
      http_common.get(`api/Advertisements`).then((resp) => {
        setAdvertisements(resp.data);
      });
    }

    if (category) setSelectMessage(category);
    else setSelectMessage("Select a category");

    fetchCategories();

    setIsDropdownOpen(false);
    setHoveredCategories([]);

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [value, category]);

  const fetchCategories = () => {
    http_common.get("api/Categories").then((resp) => {
      setAllCategories(resp.data);
    });
    http_common
      .get(`api/Categories/getByParentName/${category}`)
      .then((resp) => {
        if (resp.data.length === 0) {
          http_common.get("api/Categories/getHead").then((resp) => {
            setHeadCategories(resp.data);
          });
        } else setHeadCategories(resp.data);
      });
  };

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

  const [subcategories, setSubcategories] = useState<{
    [parentId: number]: ICategory[];
  }>({});

  const [hoveredCategories, setHoveredCategories] = useState<number[]>([]);

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
      prevHoveredCategories.filter((categoryId) => categoryId !== id),
    );
  };

  const navigate = useNavigate();

  const handleSubcategoryClick = (name: string) => {
    if (value) navigate(`/${name}/${value}`);
    else navigate(`/${name}`);
  };

  const fetchSubcategories = (id: number) => {
    setSubcategories((prevSubcategories) => ({
      ...prevSubcategories,
      [id]: allCategories.filter((c) => c.parentId === id),
    }));
  };

  const renderSubcategories = (id: number) => {
    if (hoveredCategories.includes(id) && subcategories[id]?.length) {
      return (
        <div className="subcategory">
          {subcategories[id].map((subcategory: ICategory) => (
            <div
              key={subcategory.id}
              onMouseEnter={() => handleSubcategoryMouseEnter(subcategory.id)}
              onMouseLeave={() => handleSubcategoryMouseLeave(subcategory.id)}
            >
              <p onClick={() => handleSubcategoryClick(subcategory.name)}>
                {subcategory.name}
                {allCategories.some((c) => c.parentId === subcategory.id) ? (
                  <i className="bi bi-caret-right-fill"></i>
                ) : null}
              </p>
              {renderSubcategories(subcategory.id)}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="search">
        <div>
          <Header></Header>
          <ProfileContainer></ProfileContainer>
        </div>
        <SearchSection></SearchSection>
        <div className="filters">
          <div
            ref={selectRef}
            className={`select ${isDropdownOpen ? "open" : ""}`}
          >
            <p onClick={() => setIsDropdownOpen((prevState) => !prevState)}>
              {selectMessage}
              <i className="bi bi-caret-down-fill"></i>
            </p>
            {isDropdownOpen &&
              headCategories.map((category: ICategory) => {
                return (
                  <div
                    key={category.id}
                    onMouseEnter={() =>
                      handleSubcategoryMouseEnter(category.id)
                    }
                    onMouseLeave={() =>
                      handleSubcategoryMouseLeave(category.id)
                    }
                  >
                    <p onClick={() => handleSubcategoryClick(category.name)}>
                      {category.name}
                      {allCategories.some((c) => c.parentId === category.id) ? (
                        <i className="bi bi-caret-right-fill"></i>
                      ) : null}
                    </p>
                    {renderSubcategories(category.id)}
                  </div>
                );
              })}
          </div>
        </div>
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
          {advertisements.length === 0 && (
            <img className="no-items-found-img" src={no_items_found} alt="" />
          )}
        </div>
      </div>
    </>
  );
};
