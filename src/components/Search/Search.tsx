import { Link, useParams } from "react-router-dom";
import "./Search.scss";
import { useEffect, useRef, useState } from "react";
import { Header } from "../home/header/Header";
import { SearchSection } from "./searchSection/SearchSection";
import { ProfileContainer } from "../home/profileContainer/ProfileContainer";
import { IAdvertisement } from "../../interfaces/advertisement";
import http_common from "../../http_common";
import { ICategory } from "../../interfaces/category";

export const Search = () => {
  const { value, category } = useParams();

  const [advertisements, setAdvertisements] = useState<IAdvertisement[]>([]);

  const [headCategories, setHeadCategories] = useState<ICategory[]>([]);

  const [allCategories, setAllCategories] = useState<ICategory[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    fetchCategories();

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
    if (headCategories) {
      http_common
        .get(`api/Categories/getByParentName/${category}`)
        .then((resp) => {
          setHeadCategories(resp.data);
        });
    }
    http_common.get("api/Categories").then((resp) => {
      setAllCategories(resp.data);
    });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return new Date(date).toLocaleString("en-US", options);
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
      prevHoveredCategories.filter((categoryId) => categoryId !== id)
    );
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
              <Link to={`/${subcategory.name}`}>
                <p>
                  {subcategory.name}
                  {allCategories.some((c) => c.parentId === subcategory.id) ? (
                    <i className="bi bi-caret-right-fill"></i>
                  ) : null}
                </p>
              </Link>
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
              Select a subcategory
              <i className="bi bi-caret-down-fill"></i>
            </p>
            {isDropdownOpen &&
              headCategories.map((category: ICategory) => {
                return (
                  <div
                    onClick={() => {
                      setIsDropdownOpen((prevState) => !prevState);
                      setHoveredCategories([]);
                    }}
                    key={category.id}
                    onMouseEnter={() =>
                      handleSubcategoryMouseEnter(category.id)
                    }
                    onMouseLeave={() =>
                      handleSubcategoryMouseLeave(category.id)
                    }
                  >
                    <Link to={`/${category.name}`}>
                      <p>
                        {category.name}
                        {allCategories.some(
                          (c) => c.parentId === category.id
                        ) ? (
                          <i className="bi bi-caret-right-fill"></i>
                        ) : null}
                      </p>
                    </Link>
                    {renderSubcategories(category.id)}
                  </div>
                );
              })}
          </div>
        </div>
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
