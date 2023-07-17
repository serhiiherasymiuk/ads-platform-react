import { Link } from "react-router-dom";
import "./Homepage.scss";
import Posts from "../Posts/Posts";
import { Categories } from "./categories/Categories";
import { Logo } from "./logo/Logo";
import { Header } from "./header/Header";
import { Main } from "./main/Main";

export const Homepage = () => {
  return (
    <>
      <div className="homepage">
        <div>
          <Logo></Logo>
        </div>
        <div>
          <Header></Header>
          <Main></Main>
        </div>
        <div>
          <Categories></Categories>
        </div>
      </div>
    </>
  );
};
