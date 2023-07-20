import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Search.scss";
import { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import { IAdvertisment } from "../../interfaces/advertisment";
import http_common from "../../http_common";
import SearchSection from "./SearchSection";

import { Header } from "../home/header/Header";
import { replace } from "formik";

export const Search = () => {
  const [posts, setPosts] = useState<IAdvertisment[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [value,setValue] = useState(location.state);
  const [post, setPost] = useState(posts);


  // location?.state?.value
  useEffect(() => {
    http_common
      .get<IAdvertisment[]>(`api/Advertisments`)
      .then((resp) => {
        console.log("Advertisments", resp.data);
        setPosts(resp.data);
        setPost(resp.data);
        
      }).then(()=>handleSearchClick(false))
    },);

  const handleSearchClick = (isF:boolean) =>{
    if (value === ''||value===null) { setPost(posts); return; }
    const filterBySearch = posts.filter((item) => {
        if (item.name.toLowerCase()
            .includes(value?.toLowerCase())) { return item; }
    })
    setPost(filterBySearch);
   
  if(isF){navigate(`/search/${value}`,{state:value,replace:true});}
   
  }
 
  return (
    <>
      <Header/>
      <SearchSection></SearchSection>
      <div className="container">
        {post.map((post,index)=>( <Posts post={post} key={index} /> ) )}
      </div>

    </>
  );
};
