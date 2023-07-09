import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';
import OlxLogo from '../assets/OlxLogo';
import Search from '../assets/Search';
import Arrow from '../assets/Arrow';
import SellButton from '../assets/SellButton';
import SellButtonPlus from '../assets/SellButtonPlus';
function Header() {
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/"> 
            <OlxLogo></OlxLogo>
            </Link>
        </div>
       
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <Link to="/login"><span>Login</span></Link>
          <hr />
        </div>

        <div className="sellMenu">
          
          <Link to="/create"><SellButton></SellButton>  </Link>
          <div className="sellMenuContent">
          <Link to="/create">  <SellButtonPlus></SellButtonPlus></Link>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;