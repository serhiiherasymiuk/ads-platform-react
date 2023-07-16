import { Formik, Field, ErrorMessage, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { ILogin } from "../../../interfaces/auth";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import http_common from "../../../http_common";
import { IUser, AuthUserActionType } from "../../../interfaces/user";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const Login = () => {
  const dispatch = useDispatch();

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email")
      .test(
        "checkEmail",
        "Email does not exist or is not registered yet",
        async (value) => {
          if (isSubmit) {
            setIsSubmit(false);
            try {
              const result = await http_common.get(
                `api/Users/checkEmailExists/${value}`
              );
              const { data } = result;
              return data;
            } catch (error) {
              console.error("Error during email validation:", error);
              return false;
            }
          } else return true;
        }
      ),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleSubmit = async (values: ILogin) => {
    try {
      await loginSchema.validate(values);

      const result = await http_common.post("api/Users/login", values);

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
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          localStorage.access_token = codeResponse.access_token;
          if (res.data) {
            dispatch({
              type: AuthUserActionType.LOGIN_GOOGLE_USER,
              payload: {
                id: res.data.id,
                userName: res.data.name,
                email: res.data.email,
                profilePicture: res.data.picture,
                registrationDate: "",
                phoneNumber: "",
                roles: ["user"],
              },
            });
          }
          navigate("/");
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <>
      <div className="login-page">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
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

              <button
                type="submit"
                onClick={() => {
                  setIsSubmit(true);
                }}
              >
                Login
              </button>
              <button onClick={() => login()}>Sign in with Google</button>
              <p>
                Don't have an account?
                <span>
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
