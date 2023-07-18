import { Outlet, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../sidebar/AdminSidebar";
import "./AdminLayout.scss";

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
