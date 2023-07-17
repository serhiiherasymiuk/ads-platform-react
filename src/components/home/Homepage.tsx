import { Link } from "react-router-dom";
import "./Homepage.scss";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Categories } from "./Categories/Categories";
import { Logo } from "./Logo/Logo";
import Posts from "../Posts/Posts";



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
