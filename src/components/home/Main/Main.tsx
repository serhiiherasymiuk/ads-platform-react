import { Link } from "react-router-dom";
import "./Main.scss";

export const Main = () => {
  return (
    <>
      <div className="main">
        <h1>What are you looking for?</h1>
        <div className="search-group">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search for anything" />
          <button>Search</button>
        </div>
        <div>
          <p>Recent searches</p>
        </div>
      </div>
    </>
  );
};
