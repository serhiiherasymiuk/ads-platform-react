import { Link } from "react-router-dom";
import "./Homepage.scss";
import { Header } from "./header/Header";
import { Main } from "./main/Main";
import { Categories } from "./categories/Categories";
import { Logo } from "./logo/Logo";

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
