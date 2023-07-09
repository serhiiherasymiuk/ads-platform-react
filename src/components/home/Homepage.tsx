import { Link } from "react-router-dom";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Categories } from "./Categories/Categories";
import "./Homepage.scss";

export const Homepage = () => {
  return (
    <>
      <div className="homepage">
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
