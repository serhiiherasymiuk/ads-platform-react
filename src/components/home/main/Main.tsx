import { useLocation, useNavigate } from "react-router-dom";
import "./Main.scss";
import { useState } from "react";
import { SearchSection } from "../../Search/searchSection/SearchSection";

export const Main = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/search/${value}`);
  };

  return (
    <>
      <div className="main">
        <h1>What are you looking for?</h1>
        <SearchSection></SearchSection>
        <div>
          <p>Recent searches</p>
        </div>
      </div>
    </>
  );
};
