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
      </div>
    </>
  );
};
