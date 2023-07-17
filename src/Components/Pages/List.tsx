import React from 'react';

import { Header } from '../home/Header/Header';

import Posts from '../Posts/Posts';
import { Main } from '../home/Main/Main';

function List() {
  return (
    <div>
        <div>
        <Header/>
        <Main/>   
        </div>
      <Posts />
    </div>
  );
}

export default List;