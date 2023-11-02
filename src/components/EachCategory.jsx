import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Endpoints from '../api/Endpoints';
import Product from './Product';
import { RingLoader } from "react-spinners";

const EachCategory = (props) => {
  const {categoryName}  = props.data
  const [catProducts, setCatProducts] = useState([]);

  const getData = () => {
    axios 
      .get(Endpoints.CATEGORY_URL + categoryName)
      .then((response) => {
        setCatProducts(response.data)
      })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    setCatProducts([]);
    getData(); 
  }, [categoryName])

  return (
    <>
      <div>
        {catProducts.length > 0 ? (
          <div>
            <div className="row row-cols-auto justify-content-around all-products-row">
              {catProducts.map((product) => (
                <Product key={product.id} data={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="loading-page">
            <div>
              <RingLoader color="rgb(41, 170, 255)" />
            </div>
            <div>
              <p>Loading, Please wait...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EachCategory
