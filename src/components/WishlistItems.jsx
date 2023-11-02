import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteFromCart,
  removeFromWishlist,
} from "../redux/Slice/CartSlice";
import { useRef } from "react";
import { BsFillCartFill } from "react-icons/bs";

function WishlistItems(props) {
  const { id, title, price, category, image } = props.data;

  let productPrice = price;

  let roundPrice = (Math.floor(productPrice * 100) / 100).toFixed(2);

  const priceString = String(roundPrice);
  const priceArr = priceString.split("");
  const mainPrice = priceArr.slice(0, priceArr.indexOf("."));
  const subPrice = priceArr.slice(priceArr.indexOf(".") + 1);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  let isItemInCart = cart.cartItems.find((item) => item.id === id);
  const atcBtn = useRef();

  function handleATCclick() {
    if (atcBtn.current.innerText === "Add to Cart") {
      dispatch(addToCart(props.data));
    } else {
      dispatch(deleteFromCart(props.data));
    }
  }

  const handleRemoveItemFromWish = () => {
    dispatch(removeFromWishlist(props.data));
  };

  return (
    <>
      <div className="card cart-div">
        <div className="image-div">
          <img src={image} alt={title} />
        </div>
        <div className="content-div">
          <div>
            <h6>
              {category.toUpperCase()}
              <p style={{ color: "grey" }}>{title}</p>
            </h6>
          </div>
          <div className="price-div">
            <div className="product-priceDiv">
              <p className="dollar-sign">$</p>
              <p className="main-price">{mainPrice}</p>
              <p className="sub-price">{subPrice}</p>
            </div>
          </div>
          <div className="wish-page-btn-div-container">
            <button
              onClick={handleATCclick}
              ref={atcBtn}
              className={
                isItemInCart
                  ? "btn red-btn add-to-cart-btn-in-allProducts "
                  : "btn blue-btn add-to-cart-btn-in-allProducts"
              }
            >
              {isItemInCart ? (
                <MdDeleteForever size={"20px"} />
              ) : (
                <BsFillCartFill size={"20px"} />
              )}
              {isItemInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
            <div>
              <MdDeleteForever
                onClick={handleRemoveItemFromWish}
                style={{ cursor: "pointer" }}
                size={"1.8rem"}
                color="#cc0f00"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WishlistItems;
