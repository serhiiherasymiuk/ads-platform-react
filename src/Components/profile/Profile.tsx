import { Link, useNavigate } from "react-router-dom";
import "./Profile.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../interfaces/user";
export const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);

  useEffect(() => {
    if (!isAuth) navigate("/register");
  }, []);

  return (
    <>
      <div className="profile">
        <h1>My Profile</h1>
        <div>
          <div>
            {user?.profilePicture ? (
              <p>{user?.profilePicture}</p>
            ) : (
              <i className="bi bi-person-circle"></i>
            )}
            <h2>{user?.userName}</h2>
          </div>
          <Link to="edit">
            <button>
              Edit<i className="bi bi-pencil"></i>
            </button>
          </Link>
        </div>
        <div>
          <div>
            <h3>Personal Information</h3>
            <Link to="edit">
              <button>
                Edit<i className="bi bi-pencil"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
