import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.scss";

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <>
      <div className="admin-sidebar">
        <Link
          className={
            location.pathname.includes("/subcategories") ? "active" : ""
          }
          to="subcategories"
        >
          <i className="bi bi-diagram-3"></i>
          Subcategories
        </Link>
      </div>
    </>
  );
};
