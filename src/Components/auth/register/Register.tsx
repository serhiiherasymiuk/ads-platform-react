import { Formik, Field, ErrorMessage, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { ILogin, IRegister } from "../../../interfaces/auth";
import * as Yup from "yup";
import http_common from "../../../http_common";
import { useDispatch } from "react-redux";
import YupPassword from "yup-password";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { IUser, AuthUserActionType } from "../../../interfaces/user";
YupPassword(Yup);

export const Register = () => {
  const dispatch = useDispatch();

  const initialValues: IRegister = {
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
  };

  const registerSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(16, "Name must be at most 16 characters")
      .test("checkUsername", "Name already exists", async (value) => {
        if (isSubmit) {
          setIsSubmit(false);
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
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .minLowercase(1, "password must contain at least 1 lower case letter")
      .minUppercase(1, "password must contain at least 1 upper case letter")
      .minNumbers(1, "password must contain at least 1 number")
      .minSymbols(1, "password must contain at least 1 special character"),
    passwordConfirmation: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleSubmit = async (values: IRegister) => {
    try {
      await registerSchema.validate(values);
      await http_common.post("api/Users/register", values).then(async () => {
        const result = await http_common.post("api/Users/login", {
          email: values.email,
          password: values.password,
        });

        const { data } = result;
        const token = data.token;
        localStorage.token = token;
        var user = jwtDecode(token) as IUser;
        dispatch({
          type: AuthUserActionType.LOGIN_USER,
          payload: {
            id: user.id,
            userName: user.userName,
            email: user.email,
            profilePicture: user.profilePicture,
            registrationDate: user.registrationDate,
            phoneNumber: user.phoneNumber,
            roles: user.roles,
          },
        });
        navigate("/");
      });
    } catch (error) {
      console.error("Error during register: ", error);
    }
  };

  return (
    <>
      <div className="register-page">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <h1>Welcome</h1>

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

              <div className="form-floating">
                <Field
                  type="password"
                  className={`form-control ${
                    errors.password && touched.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
                  name="password"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
                <label htmlFor="floatingInput">Password</label>
              </div>

              <div className="form-floating">
                <Field
                  type="password"
                  className={`form-control ${
                    errors.passwordConfirmation && touched.passwordConfirmation
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Password confirmation"
                  name="passwordConfirmation"
                  aria-label="Password confirmation"
                  aria-describedby="basic-addon2"
                />
                <ErrorMessage
                  name="passwordConfirmation"
                  component="div"
                  className="invalid-feedback"
                />
                <label htmlFor="floatingInput">Password</label>
              </div>

              <button
                type="submit"
                onClick={() => {
                  setIsSubmit(true);
                }}
              >
                Register
              </button>
              <p>
                Already have an account?
                <span>
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
