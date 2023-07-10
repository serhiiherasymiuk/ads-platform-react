import { Link } from "react-router-dom";
import logo from "../../../logo.svg";
import "./Logo.scss";

export const Logo = () => {
  return (
    <>
      <div className="logo-container">
        <img className="logo" src={logo} alt="" />
      </div>
    </>
  );
};
