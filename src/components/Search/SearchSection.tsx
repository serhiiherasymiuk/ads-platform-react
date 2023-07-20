import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IAdvertisment } from "../../interfaces/advertisment";
import http_common from "../../http_common";

import { bool } from "yup";
import { Value } from "sass";

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
  function handleSearchClick(){
    if (value === ''||value===null) { return posts;}
    const filterBySearch = 
      posts.filter((item) => {
        if (item.name?.toLowerCase().includes(value?.toLowerCase())) { return item; }
    })
    setPost(filterBySearch);
    navigate(`/search/${value}`,{state:value,replace:true,});
    window.location.reload()
  }

    return (
      <>
        
        <div className="search-group">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search for anything" value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={handleSearchClick} >Search</button>
        </div>
        
      </>
    );
  };

  export default SearchSection;