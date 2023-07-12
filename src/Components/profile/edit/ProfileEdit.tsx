import { Link, Outlet, useNavigate } from "react-router-dom";
import "./ProfileEdit.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../../interfaces/user";

export const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);

  useEffect(() => {
    if (!isAuth) navigate("/register");
  }, []);

  return <></>;
};
