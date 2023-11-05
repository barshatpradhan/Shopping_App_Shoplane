import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Endpoints from '../api/Endpoints';
import Product from './Product';
import { RingLoader } from "react-spinners";
import { useDispatch } from 'react-redux';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const getData = () => {
    axios
      .get(Endpoints.PRODUCTS_URL)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        {products.length > 0 ? (
          <div className="row row-cols-auto justify-content-around all-products-row">
            {products.map((product) => (
              <Product key={product.id} data={product} />
            ))}
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

export default AllProducts;

