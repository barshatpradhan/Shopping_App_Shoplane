import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import Endpoints from "../api/Endpoints";
import { FaHeart } from "react-icons/fa";
import {
  addToCart,
  addToWishlist,
  deleteFromCart,
} from "../redux/Slice/CartSlice"
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { BsFillCartFill } from "react-icons/bs";
import { RingLoader } from "react-spinners";
import Stars from "./Stars";


const ProductDetail = (props) => {
  const id = props.data;
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState({});

  const getData = () => {
    axios
      .get(Endpoints.PRODUCTS_URL + id)
      .then((response) => {
        setProduct(response.data);
        setRating(response.data.rating);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => {
    getData();
  }, [id]);

  let price = product.price;

  let roundPrice = (Math.floor(price * 100) / 100).toFixed(2);

  const priceString = String(roundPrice);
  const priceArr = priceString.split("");
  const mainPrice = priceArr.slice(0, priceArr.indexOf("."));
  const subPrice = priceArr.slice(priceArr.indexOf(".") + 1);

  const heart = useRef();
  const atcBtn = useRef();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let isItemInCart = cart.cartItems.find((item) => item.id === product.id);
  let isItemInWish = cart.wishListItems.find((item) => item.id === product.id);

  function handleHeartClick() {
    dispatch(addToWishlist(product));
  }

  function handleATCclick() {
    if (atcBtn.current.innerText === "Add to Cart") {
      dispatch(addToCart(product));
    } else {
      dispatch(deleteFromCart(product));
    }
  }

  return (
    <>
      {Object.keys(product).length > 0 ? (
        <div className="product-detail-div">
          <div className="card product-detail-image-div">
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top product-detail-img"
            />
          </div>

          <div className="product-detail-content-div">
            <div className="product-detail-brand">BRAND</div>
            <h2 className="product-detail-title">{product.title}</h2>
            <Stars stars={ rating.rate } reviews={rating.count} />
            <div className="product-detail-description">
              {product.description}
            </div>

            <hr />

            <div className="product-detail-content-2">
              <div className="product-detail-content-2-left">
                <p className="dollar-sign">$</p>
                <p className="main-price">{mainPrice}</p>
                <p className="sub-price">{subPrice}</p>
              </div>

              <div className="product-detail-content-2-right">
                <div>
                  <button
                    ref={atcBtn}
                    onClick={handleATCclick}
                    className={
                      isItemInCart
                        ? "btn red-btn add-to-cart-btn-in-all-products"
                        : "btn blue-btn add-to-cart-btn-in-all-products"
                    }
                  >
                    {isItemInCart ? (
                      <MdDeleteForever size={"20px"} />
                    ) : (
                      <BsFillCartFill size={"20px"} />
                    )}
                    {isItemInCart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                </div>
                <div ref={heart} onClick={handleHeartClick}>
                  <FaHeart
                    size={"1.5rem"}
                    className={isItemInWish ? "product-heart" : null}
                  />
                </div>
              </div>
            </div>
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
    </>
  );
}

export default ProductDetail
