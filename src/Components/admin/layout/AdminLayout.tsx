import { Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.scss";
import { AdminSidebar } from "../sidebar/AdminSidebar";

export const AdminLayout = () => {
  return (
    <>
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};
