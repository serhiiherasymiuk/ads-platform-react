import React, { useEffect, useState } from "react";

import Heart from "../assets/Heart";
import "./Post.css";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import { IAdvertisment } from "../../interfaces/advertisment";
import http_common from "../../http_common";

function Posts() {
  const [posts, setPost] = useState<IAdvertisment[]>([]);
  useEffect(() => {
    http_common.get<IAdvertisment[]>("api/Advertisments").then((resp) => {
      console.log("Advertisments", resp.data);
      setPost(resp.data);
    });
  }, []);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="card">
          <div className="favorite">
            <Heart></Heart>
          </div>
          {posts.map((c) => {
            return (
              <React.Fragment key={c.id}>
                <Link to={`/view-post/${c.id}`}>
                  <div className="image"></div>
                  <div className="content">
                    <p className="name">{c.name}</p>
                  </div>
                  <div className="date">
                    <span>{c.location}</span>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
