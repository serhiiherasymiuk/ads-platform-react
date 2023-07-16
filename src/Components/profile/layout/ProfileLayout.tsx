import { Link, Outlet, useNavigate } from "react-router-dom";
import "./ProfileLayout.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../../interfaces/user";
import { ProfileSidebar } from "../sidebar/ProfileSidebar";

export const ProfileLayout = () => {
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);

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
