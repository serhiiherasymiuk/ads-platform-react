import React, { useEffect, useState } from "react";
import Heart from "../assets/Heart";
import "./Post.css";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import { IAdvertisement } from "../../interfaces/advertisement";
import http_common from "../../http_common";

function Posts({ post }: { post: any }) {
  const { name, price, image, location, id } = post;
  // const [posts, setPost] = useState<IAdvertisment[]>([]);
  // useEffect(() => {
  //   http_common
  //     .get<IAdvertisment[]>("api/Advertisments")
  //     .then((resp) => {
  //       console.log("Advertisments", resp.data);
  //       setPost(resp.data);
  //     });
  // }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="card">
          <div className="favorite">
            <Heart></Heart>
          </div>
          <React.Fragment key={id}>
            <Link to={`/view-post/${id}`}>
              <div className="image">
                <img src={image} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {price}</p>
                <p className="name">{name}</p>
              </div>
              <div className="date">
                <span>{location}</span>
              </div>
            </Link>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}

export default Posts;
