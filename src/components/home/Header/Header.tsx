import { Link } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  return (
    <>
      <ul>
        <li>
          <Link to={"/favorites"} className={"btn btn-success"}>
            Favorites
          </Link>
          <Link to={"/items"} className={"btn btn-success"}>
            Your items
          </Link>
          <Link to={"/messages"} className={"btn btn-success"}>
            Messages
          </Link>
        </li>
        <li>
          <Link to={"/create"} className={"btn btn-success"}>
            Sell something
          </Link>
        </li>
      </ul>
    </>
  );
};
