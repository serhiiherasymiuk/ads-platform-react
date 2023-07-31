import { Link } from "react-router-dom";
import "./Header.scss";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../../interfaces/user";

export const Header = () => {
  const { user } = useSelector((store: any) => store.auth as IAuthUser);

  return (
    <>
      <ul className="header-ul">
        <li>
          <Link to={"/"}>Home</Link>
          {user ? (
            <Link to={`/profile/${user?.userName}`}>Your items</Link>
          ) : (
            <Link to={`/login`}>Your items</Link>
          )}
        </li>
        <li>
          <Link to={"/create"}>Sell something</Link>
        </li>
      </ul>
    </>
  );
};
