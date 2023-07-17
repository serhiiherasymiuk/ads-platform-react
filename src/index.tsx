import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import jwtDecode from "jwt-decode";
import { IUser, AuthUserActionType } from "./interfaces/user";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (localStorage.token) {
  const token = localStorage.token;
  var user = jwtDecode(token) as IUser;
  store.dispatch({
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
}

if (localStorage.access_token) {
  const access_token = localStorage.access_token;
  axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      if (res.data) {
        store.dispatch({
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
    })
    .catch((err) => console.log(err));
}

root.render(
  <GoogleOAuthProvider clientId="200083464199-0h960k60j4f3v5bg0lvu7d2dob2cg93m.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
