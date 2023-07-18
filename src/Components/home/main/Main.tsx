import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Main.scss";
import { useState } from "react";

export const Main = () => {
  const location = useLocation();
  const [value, setValue] = useState(location.state?.value);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="main">
        <h1>What are you looking for?</h1>
        <div className="search-group">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search for anything"
            value={value}
            onChange={handleChange}
          />
          <Link to={`list/${value}`}>
            <button>Search</button>
          </Link>
        </div>
        <div>
          <p>Recent searches</p>
        </div>
      </div>
    </>
  );
};
