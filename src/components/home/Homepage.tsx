import { Link } from "react-router-dom";
import "./Homepage.scss";
import { Header } from "./Header/Header";
import { Categories } from "./Categories/Categories";
import { Logo } from "./Logo/Logo";
import { Main } from "./Main/Main";

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
