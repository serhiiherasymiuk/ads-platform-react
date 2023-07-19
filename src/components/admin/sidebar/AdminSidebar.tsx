import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.scss";

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <>
      <div className="admin-sidebar">
        <Link
          className={location.pathname.includes("/category") ? "active" : ""}
          to="category"
        >
          <i className="bi bi-diagram-3"></i>
          Categories
        </Link>
        <Link
          className={
            location.pathname.includes("/advertisement") ? "active" : ""
          }
          to="advertisement"
        >
          <i className="bi bi-diagram-3"></i>
          Advertisements
        </Link>
      </div>
    </>
  );
};
