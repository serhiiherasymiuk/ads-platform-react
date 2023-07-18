import React from "react";
import Posts from "../Posts/Posts";
import { Header } from "../home/Header/Header";
import { Main } from "../home/Main/Main";

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
