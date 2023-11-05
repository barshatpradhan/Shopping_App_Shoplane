import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
} from "../redux/Slice/CartSlice";

import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";

import { toast } from "react-toastify";

function CartItems(props) {
  const { id, title, price, category, image } = props.data;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users[state.user.uid]);

  let productPrice = price;
  let roundPrice = (Math.floor(productPrice * 100) / 100).toFixed(2);

  const priceString = String(roundPrice);
  const priceArr = priceString.split("");
  const mainPrice = priceArr.slice(0, priceArr.indexOf("."));
  const subPrice = priceArr.slice(priceArr.indexOf(".") + 1);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const theProduct = cartItems.find((eachItem) => eachItem.id === id);
  const quantity = theProduct ? theProduct.itemQuantity : 0;

  const handleMinusClick = () => {
    if (quantity > 0) {
      dispatch(removeFromCart(props.data));
      if (quantity === 1) {
        toast.error(`${title} removed from the cart`, {
          position: "bottom-right",
          autoClose: 600,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  const handlePlusCLick = () => {
    dispatch(addToCart(props.data));
  };

  const handleDeleteItemFromCart = () => {
    dispatch(deleteFromCart(props.data));
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
              {category}
              <p style={{ color: "grey" }}>{title}</p>
            </h6>
          </div>

          <div className="quantity-change-div">
            <div className="card quantity-change-inside-div">
              <button onClick={handleMinusClick} className="minus-icon">
                <HiMinusCircle />
              </button>
              <div className="quantity-num">{quantity}</div>
              <button onClick={handlePlusCLick} className="plus-icon">
                <HiPlusCircle />
              </button>
            </div>
          </div>
          <div className="product-price-div-in-cart">
            <div className="product-price-div">
              <p className="dollar-sign">$</p>
              <p className="main-price">{mainPrice}</p>
              <p className="sub-price">{subPrice}</p>
            </div>
            <div className="quantity-to-multiply">
              x{quantity} {""}= ${(productPrice * quantity).toFixed(2)}
            </div>
          </div>

          <div className="delete-btn-div-container">
            <div>
              <MdDeleteForever
                onClick={handleDeleteItemFromCart}
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
export default CartItems;
