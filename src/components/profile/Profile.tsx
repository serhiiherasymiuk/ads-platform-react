import { Link, useNavigate, useParams } from "react-router-dom";
import "./Profile.scss";
import { useEffect, useState } from "react";
import { IAuthUser, IUser } from "../../interfaces/user";
import http_common from "../../http_common";
import { useSelector } from "react-redux";
export const Profile = () => {
  const navigate = useNavigate();

  const { user, isAuth, isGoogle } = useSelector(
    (store: any) => store.auth as IAuthUser
  );

  const { username } = useParams();

  const [owner, setOwner] = useState<IUser>();

  useEffect(() => {
    http_common.get(`api/Users/getByUserName/${username}`).then((resp) => {
      setOwner(resp.data);
    });
  });

  return (
    <>
      <div className="profile">
        {!isAuth ? (
          <h1>Profile</h1>
        ) : user?.id === owner?.id ? (
          <h1>My Profile</h1>
        ) : (
          <h1>Profile</h1>
        )}
        <div>
          <div>
            {owner?.profilePicture ? (
              <img
                src={`https://adsplatformstorage.blob.core.windows.net/user-images/${owner?.profilePicture}`}
                alt=""
              />
            ) : (
              <i className="bi bi-person-circle"></i>
            )}
            <h2>{owner?.userName}</h2>
          </div>
          {isAuth && user?.id === owner?.id && (
            <Link to="edit">
              <button>
                Edit <i className="bi bi-pencil"></i>
              </button>
            </Link>
          )}
        </div>
        <div className="personal-info">
          <div>
            <h3>Personal Information</h3>
            {isAuth && user?.id === owner?.id && (
              <Link to="edit">
                <button>
                  Edit <i className="bi bi-pencil"></i>
                </button>
              </Link>
            )}
          </div>
          <div>
            <div>
              <h5>Email</h5>
              <p>{owner?.email}</p>
            </div>
            <div>
              <h5>Phone Number</h5>
              <p>{owner?.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
