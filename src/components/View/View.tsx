import React, { useEffect, useState } from 'react';

import './View.css';
import { useParams } from 'react-router';
import http_common from '../../http_common';


import { Link } from 'react-router-dom';

import { IAdvertisment } from '../../interfaces/advertisment';


const View = () => {
  const { id } = useParams();
  const [adv, setAdv] = useState<IAdvertisment>();



  useEffect(() => {
    http_common.get(`api/Advertisments/${id}`)
      .then(resp => {
        setAdv(resp.data)
        console.log(resp.data);
      }
      ).catch((err) => {
        console.log(err);
      });

  }, [id]);

  return (
    <>
   
      return (
          <div className="viewParentDiv"> 
            <div className="imageShowDiv" >
              <img src={adv?.image} alt="" />
            </div>
              <div className="rightSection">
                <div className="productDetails">
                  <p>&#x20B9;{adv?.price}</p>
                  <span>{adv?.name}</span>
                  <p>?</p>
                  <p>{adv?.description}</p>
                  <span>{adv?.location}</span>
                </div>
                <div className="contactDetails">
                  <p>Seller details</p>
                  <p>{adv?.contactPerson}</p>
                  <p>{adv?.contactPhoneNumber}</p>
                </div>
              </div>
          
    </div>
          )
      

    </>
  );
}
export default View;