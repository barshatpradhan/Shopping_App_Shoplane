import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
} from "../redux/Slice/CartSlice"


const CartItems = (props) => {
  const { id, title, price, category, image } = props.data;
  const cart = useSelector((state) => state.cart);

  const theProduct = cart.cartItems.filter((eachItem) => eachItem.id === id);
  
  let productPrice = price;

  let roundPrice = (Math.floor(productPrice * 100) / 100).toFixed(2);

  const priceString = String(roundPrice);
  const priceArr = priceString.split("");
  const mainPrice = priceArr.slice(0, priceArr.indexOf("."));
  const subPrice = priceArr.slice(priceArr.indexOf(".") + 1);

  const dispatch = useDispatch();

  const handleDeleteItemFromCart = () => {
    dispatch(deleteFromCart(props.data));
  };


  return (
    <>
      <div className="card cart-div">
        <div className="title-price-img-div">
          <div className="image-div">
            <img src={image} alt={title} />
          </div>
          <div className="title-price-div">
            <div className="title-div">
              <h6 style={{ display: "flex", gap: "0.2rem" }}>{ category }</h6>
              <p style={{ color: "grey" }}>{title}</p>
            </div>
            <div className="product-price-div">
              <p className="dollar-sign">$</p>
              <p className="main-price">{mainPrice}</p>
              <p className="sub-price">{subPrice}</p>
            </div>
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
    </>
  );
}

export default CartItems
