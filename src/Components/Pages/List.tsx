import React from "react";
import Posts from "../Posts/Posts";
import { Header } from "../home/header/Header";
import { Main } from "../home/main/Main";

function List() {
  return (
    <div>
      <div>
        <Header />
        <Main />
      </div>
      <Posts />
    </div>
  );
}

export default List;
