import { createGlobalStyle } from "styled-components";
import * as theme from "./Theme.styled";

export const GlobalStyles = createGlobalStyle`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    position: relative;
    display: flex;
    align-items: center;
    font-size: 20px;
    gap: 10px;
  }

  a::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.hover};
    bottom: 0;
    left: 0;
    top: 30px;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  a:hover::before {
    transform-origin: left;
    transform: scaleX(1);
    height: 4px;
  }

  .active {
    color: ${({ theme }) => theme.colors.hover};
  }

  body {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }

  .homepage {
    > div:last-child {
      background-color: ${({ theme }) => theme.colors.backgroundSecond};
    }
  }

  .search {
    > div:first-child {
      background-color: ${({ theme }) => theme.colors.background};
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  .select {
    border: 1px solid ${({ theme }) => theme.colors.border};

    > p:first-child:hover {
      background-color: ${({ theme }) => theme.colors.backgroundSecond};
    }

    p {
      background-color: ${({ theme }) => theme.colors.backgroundSecond};
    }

    p:hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }

    .subcategory {
      border: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  .search-group {
    background-color: ${({ theme }) => theme.colors.backgroundSecond};
    border: 1px solid ${({ theme }) => theme.colors.border};

    input {
      background-color: ${({ theme }) => theme.colors.backgroundSecond};
      color: ${({ theme }) => theme.colors.text};
    }

    button {
      background-color: ${({ theme }) => theme.colors.hover};
      color: ${({ theme }) => theme.colors.text};
    }
  }

  .profile-edit {
    button {
      background-color: ${({ theme }) => theme.colors.hover};
      color: ${({ theme }) => theme.colors.text};
    }

    input:focus {
      border-color: ${({ theme }) => theme.colors.hover};
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px ${({ theme }) =>
        theme.colors.hover};
    }
  }

  .profile-sidebar, .admin-sidebar {
    top: 0;
    display: flex;
    flex-direction: column;
    padding: 30px;
    gap: 30px;
    position: fixed;
    border-right: solid 1px ${({ theme }) => theme.colors.border};
  }

  .profile {
    > div:nth-child(2),
    .personal-info {
      border: 1px solid ${({ theme }) => theme.colors.border};
    }

    button {
      border: 1px solid ${({ theme }) => theme.colors.border};
    }

    button:hover {
      border: 1px solid ${({ theme }) => theme.colors.hover};
      color: ${({ theme }) => theme.colors.hover};
    }

    a::before {
      display: none;
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.hover};
  }

  .category-container {
    .categories {
      ul {
        border: 1px solid ${({ theme }) => theme.colors.border};
        background-color: ${({ theme }) => theme.colors.backgroundSecond};
      }
    }
  }

  .header {
    background-color: ${({ theme }) => theme.colors.background};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 120px;
    z-index: 5;
    display: flex;
    justify-content: space-between;

    .profile-container {
      padding: 0;

      a:before {
        display: none;
      }
    }

    .links-container {
      padding: 10px 0 10px 10px;
    }

    .header-ul {
      width: 100%;
    }
  }

  .advertisement-details {
    .user-info {
      border: 1px solid ${({ theme }) => theme.colors.border};
    }

    .advertisement-info {
      > div {
        border: 1px solid ${({ theme }) => theme.colors.border};
      }
    }
  }

  .carousel {
    .visually-hidden {
      color: ${({ theme }) => theme.colors.background};
    }

    .carousel-indicators button {
      background-color: ${({ theme }) => theme.colors.hover};
    }

    button.active {
      background-color: ${({ theme }) => theme.colors.background};
      border: solid 2px ${({ theme }) => theme.colors.hover};
    }

    .advertisement-info {
      > div {
        border: 1px solid ${({ theme }) => theme.colors.border};
      }
    }
  }

  .login-page, 
  .register-page, 
  .create, .edit, 
  .category-create-form, 
  .category-edit-form,
  .advertisement-create-form,
  .advertisement-edit-form,
  .profile-edit {
    input, textarea, select {
      color: ${({ theme }) => theme.colors.text};
      background-color: ${({ theme }) => theme.colors.background};
      border: solid 1px ${({ theme }) => theme.colors.border};
    }

    .form-floating > .form-control:focus ~ label::after,
    .form-floating > .form-control ~ label::after,
    .form-floating > .form-select ~ label::after {
      background-color: ${({ theme }) => theme.colors.background};
      color: ${({ theme }) => theme.colors.text};
    }

    .form-floating > .form-control:focus ~ label {
      color: ${({ theme }) => theme.colors.text};
    }

    .form-floating > .form-control:focus ~ label,
    .form-floating > .form-select ~ label,
    .form-floating > .form-control:not(:placeholder-shown) ~ label {
      color: ${({ theme }) => theme.colors.border};
    }

    input:focus, textarea:focus, select:focus {
      color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.hover};
      background-color: ${({ theme }) => theme.colors.background};
      box-shadow: rgba(0, 234, 255, 0.2) 0 0 0 4px;
    }
  }

  .advertisements {
    > div {
      border: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  .image-list {
    img:hover {
      border: 1px solid ${({ theme }) => theme.colors.hover};
      box-shadow: rgba(0, 234, 255, 0.2) 0 0 0 4px;
    }
  }

  .custom-file-upload {
    input[type="file"] {
      display: none;
    }

    cursor: pointer;
    width: 200px;
    height: 200px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    transition: 0.1s linear;
    background-color: rgba(0, 234, 255, 0.2);

    i {
      font-size: 100px;
      color: ${({ theme }) => theme.colors.hover};
      transition: 0.1s linear;
    }

    .exc {
      position: fixed;
      margin-left: 150px;
      margin-bottom: 150px;
      color: red;
      font-size: 30px;
      cursor: pointer;
      display: none;
    }
  }

  .custom-file-upload:hover {
    background-color: rgba(0, 234, 255, 0.29);

    i {
      color: ${({ theme }) => theme.colors.hover};
    }

    .exc {
      color: red;
    }
  }

  .is-image-invalid {
    border: 1px solid red;

    .exc {
      display: block;
    }
  }

  .is-image-invalid:hover {
    box-shadow: rgba(255, 0, 0, 0.205) 0 0 0 4px;
  }

  .image-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;

    div,
    label {
      margin-bottom: 10px;
    }

    div {
      height: 200px;
      width: 200px;

      i {
        position: relative;
        left: 180px;
        bottom: 10px;
        color: red;
        font-size: 30px;
        cursor: pointer;
      }
    }

    img {
      height: 200px;
      width: 200px;
      margin-top: -40px;
      object-fit: scale-down;
      border-radius: 30px;
      transition: 0.1s linear;
      border: 1px solid ${({ theme }) => theme.colors.border};
    }
  }
  
  table {
    --bs-table-bg: ${({ theme }) => theme.colors.background} !important;
    --bs-table-color: ${({ theme }) => theme.colors.text} !important;
  }
  
  .categories-admin, .advertisements-admin {
    a:before {
      display: none;
    }
  }

  .profile-head {
    label {
      background-color: ${({ theme }) => theme.colors.backgroundSecond};
      border: 1px solid ${({ theme }) => theme.colors.border};
    }
    input:checked ~ .slider {
      background-color: ${({ theme }) => theme.colors.border};
    }
    .slider::before {
      box-shadow: inset 16px -2px 0px 0px ${({ theme }) => theme.colors.text};
      background-color: ${({ theme }) => theme.colors.backgroundSecond};
    }
    input:checked ~ .slider::before {
      background-color: ${({ theme }) => theme.colors.backgroundSecond};
    }
  }
`;
