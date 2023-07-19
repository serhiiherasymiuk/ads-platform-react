import { useNavigate } from "react-router-dom";
import "./ProfileEdit.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthUserActionType,
  IAuthUser,
  IUser,
  IUserEdit,
} from "../../../interfaces/user";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import http_common from "../../../http_common";

export const ProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);

  const editSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(16, "Name must be at most 16 characters")
      .test("checkUsername", "Name already exists", async (value) => {
        if (isSubmit) {
          setIsSubmit(false);
          if (value.toLowerCase() == user?.userName.toLowerCase()) return true;
          try {
            const result = await http_common.get(
              `api/Users/checkUsernameExists/${value}`
            );
            const { data } = result;
            return !data;
          } catch (error) {
            console.error("Error during userName validation:", error);
            return false;
          }
        } else return true;
      }),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email")
      .test("checkEmail", "Email already registered", async (value) => {
        if (isSubmit) {
          setIsSubmit(false);
          if (value.toLowerCase() == user?.email.toLowerCase()) return true;
          try {
            const result = await http_common.get(
              `api/Users/checkEmailExists/${value}`
            );
            const { data } = result;
            return !data;
          } catch (error) {
            console.error("Error during email validation:", error);
            return false;
          }
        } else return true;
      }),
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const initialValues: IUserEdit = {
    userName: user?.userName ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    profilePicture: null,
  };

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleSubmit = async (values: IUserEdit) => {
    try {
      await editSchema.validate(values);

      await http_common.put(`api/Users/${user?.id}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await http_common
        .get(`api/Users/${user?.id}`)
        .then((resp) => {
          dispatch({
            type: AuthUserActionType.LOGIN_USER,
            payload: {
              id: resp.data.id,
              userName: values.userName,
              email: values.email,
              profilePicture: resp.data.profilePicture,
              registrationDate: resp.data.registrationDate,
              phoneNumber: values.phoneNumber,
              roles: resp.data.roles,
            },
          });
        });

      navigate("/profile");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="edit">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editSchema}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div>
                {values.profilePicture !== null ? (
                  <img
                    src={URL.createObjectURL(values.profilePicture)}
                    alt=""
                  />
                ) : (
                  <div>
                    {user?.profilePicture ? (
                      <img
                        src={`https://adsplatformstorage.blob.core.windows.net/user-images/${user?.profilePicture}`}
                        alt=""
                      />
                    ) : (
                      <i className="bi bi-person-circle"></i>
                    )}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className={`form-control ${
                    errors.profilePicture && touched.profilePicture
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Image file"
                  name="profilePicture"
                  aria-label="Image file"
                  aria-describedby="basic-addon2"
                  onChange={(event) => {
                    const file =
                      event.currentTarget.files && event.currentTarget.files[0];
                    if (file) {
                      setFieldValue("profilePicture", file);
                    }
                  }}
                />
                <ErrorMessage
                  name="profilePicture"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-floating">
                <Field
                  type="text"
                  className={`form-control ${
                    errors.userName && touched.userName ? "is-invalid" : ""
                  }`}
                  placeholder="Name"
                  name="userName"
                  aria-label="Name"
                  aria-describedby="basic-addon2"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="invalid-feedback"
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating">
                <Field
                  type="email"
                  className={`form-control ${
                    errors.email && touched.email ? "is-invalid" : ""
                  }`}
                  placeholder="Email"
                  name="email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <Field
                  type="text"
                  className={`form-control ${
                    errors.phoneNumber && touched.phoneNumber
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Phone number"
                  name="phoneNumber"
                  aria-label="Phone"
                  aria-describedby="basic-addon4"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="invalid-feedback"
                />
                <label htmlFor="floatingInput">Phone number</label>
              </div>
              <button
                type="submit"
                onClick={() => {
                  setIsSubmit(true);
                }}
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
