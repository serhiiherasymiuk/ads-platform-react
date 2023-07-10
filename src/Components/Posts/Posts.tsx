import React, { useEffect, useState } from 'react';

import Heart from '../assets/Heart';
import './Post.css';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { IAdvedismentItem } from './types';

function Posts() {
  const [posts, setPost] = useState<IAdvedismentItem[]>([]);
  useEffect(() => { (async () => await Load())(); }, []);
  async function Load() {
    const result = await axios.get("http://localhost:5004/api/Advertisments");
    setPost(result.data);
    console.log(result.data)

  }


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          <Link to='/view-post'>
            {posts.map((c) => {
              return (
                <div className="card" >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>

                  <div className="image">
                    <img src={c.image} alt="" />
                  </div>
                  <div className="content">
                    <p className="name">{c.name}</p>
                  </div>
                  <div className="date">
                    <span>{c.location}</span>
                  </div>
                </div>
              )
            })}
          </Link>
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        {posts.map((c) => {
              return (
                <div className="card" >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>

                  <div className="image">
                    <img src={c.image} alt="" />
                  </div>
                  <div className="content">
                    <p className="name">{c.name}</p>
                  </div>
                  <div className="date">
                    <span>{c.location}</span>
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  );
}

export default Posts;