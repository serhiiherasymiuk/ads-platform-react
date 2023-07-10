import { Link } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  return (
    <>
      <ul>
        <li>
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
