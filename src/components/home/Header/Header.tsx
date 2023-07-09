import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../../logo.svg";

export const Header = () => {
  return (
    <>
      <ul>
        <li>
          <img className="logo" src={logo} alt="" />
          <Link to={"/favorites"}>Favorites</Link>
          <Link to={"/items"}>Your items</Link>
          <Link to={"/messages"}>Messages</Link>
        </li>
        <li>
          <Link to={"/create"}>Sell something</Link>
        </li>
      </ul>
    </>
  );
};
