import { useLocation, useNavigate } from "react-router-dom";
import "./Main.scss";
import { useState } from "react";
import { SearchSection } from "../../Search/searchSection/SearchSection";

export const Main = () => {
  return (
    <>
      <div className="main">
        <h1>What are you looking for?</h1>
        <SearchSection></SearchSection>
      </div>
    </>
  );
};
