import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Main.scss";
import {  useEffect, useState } from "react";
import { IAdvertisment } from "../../../interfaces/advertisment";
import http_common from "../../../http_common";
import {Search} from "../../Search/Search";
import SearchSection from "../../Search/SearchSection";

export const Main = () => {

  const location = useLocation();
  const[query,setQuery]=useState(location.state?.value);


  return (
    <>
      <div className="main">
        <h1>What are you looking for?</h1>
          <SearchSection/>
        <div>
          <p>Recent searches</p>
        </div>
      </div>
    </>
  );
};
