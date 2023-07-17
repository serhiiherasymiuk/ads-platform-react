import React from "react";
import Posts from "../Posts/Posts";
import { Main } from "../home/main/Main";
import { Header } from "../home/header/Header";

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
