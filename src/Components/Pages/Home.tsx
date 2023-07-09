import React from 'react';

import Header from '../Header/Header';
import Banner from '../Baner/Banner';


import Posts from '../Posts/Posts';
import Footer from '../Footer/Footer';

function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;