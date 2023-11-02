import React, { useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  addToWishlist,
  deleteFromCart,
} from "../redux/Slice/CartSlice";
import { MdDeleteForever } from "react-icons/md";
import { BsFillCartFill } from "react-icons/bs";
import Stars from "./Stars";

const Product = ({ data }) => {
  const { id, title, price, image, rating } = data;

  let productPrice = price;

  let roundPrice = (Math.floor(productPrice * 100) / 100).toFixed(2);

  const priceString = String(roundPrice);
  const priceArr = priceString.split("");
  const mainPrice = priceArr.slice(0, priceArr.indexOf("."));
  const subPrice = priceArr.slice(priceArr.indexOf(".") + 1);

  const heart = useRef();
  const atcBtn = useRef();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let isItemInCart = cart.cartItems.find((item) => item.id === id);
  let isItemInWish = cart.wishListItems.find((item) => item.id === id);

  function handleHeartClick() {
    dispatch(addToWishlist(data));
  }

  function handleATCclick() {
    if (atcBtn.current.innerText === "Add to Cart") {
      dispatch(addToCart(data));
    } else {
      dispatch(deleteFromCart(data));
    }
  }

  return (
    <>
      <div className="col-xs-auto" style={{ margin: "1rem" }}>
        <div className="card h-100" style={{ width: "14.7rem" }}>
          <div className="product-heart-div-container">
            <div
              className="product-heart-div"
              ref={heart}
              onClick={handleHeartClick}
            >
              <FaHeart
                size={"1.3rem"}
                className={isItemInWish ? "product-heart" : null}
              />
            </div>
          </div>
          <div className="image-containing-div">
            <Link to={"/products/" + id}>
              <img
                src={image}
                alt={title}
                className="card-img-top product-img-main"
              />
            </Link>
          </div>
          <div className="card-body">
            <h6 style={{ display: "flex", gap: "0.2rem" }}>
              Brand,
              <p className="card-title all-products-title">{title}</p>
            </h6>
            <Stars stars={rating.rate} reviews={rating.count} />
            <div className="product-price-div">
              <div className="dollar-sign">$</div>
              <div className="main-price">{mainPrice}</div>
              <div className="sub-price">{subPrice}</div>{" "}
            </div>
            <button
              onClick={handleATCclick}
              ref={atcBtn}
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
        </div>
      </div>
    </>
  );
};

export default Product;
