import { Outlet } from "react-router-dom";
import "./ProfileLayout.scss";
import { ProfileSidebar } from "../sidebar/ProfileSidebar";

export const ProfileLayout = () => {
  return (
    <>
      <div className="profile-layout">
        <ProfileSidebar />
        <main className="profile-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};
