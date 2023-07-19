import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IAdvertisment } from "../../interfaces/advertisment";
import http_common from "../../http_common";

import { bool } from "yup";

const SearchSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState<IAdvertisment[]>([]);
  const [post, setPost] = useState(posts);
  const [value, setValue] = useState(location.state?.value);
 
  useEffect(() => {

    http_common
      .get<IAdvertisment[]>(`api/Advertisments`)
      .then((resp) => {
        console.log("Advertisments", resp.data);
        setPosts(resp.data);
        setPost(resp.data);
      });
  }, []);
  const handleSearchClick = (isFirst:boolean) =>{
    if (value === ""||value===undefined) { setPost(posts); return; }
    const filterBySearch = posts.filter((item) => {
        if (item.name.toLowerCase().includes(value.toLowerCase())) { return item; }
    })
    setPost(filterBySearch);
    if(isFirst){navigate(`/search/${value}`);}
  }

    return (
      <>
        
        <div className="search-group">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search for anything" value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={()=>handleSearchClick(true)} >Search</button>
        </div>
        
      </>
    );
  };

  export default SearchSection;