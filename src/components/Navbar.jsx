import React from "react";
import { Link } from "react-router-dom";
import { TbLogin } from "react-icons/tb";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  
  let totalCartQuantity = 0;
  cart.cartItems.map(
    (eachItem) => (totalCartQuantity += eachItem.itemQuantity)
  );

  return (
    <div className="navbar-component">
      <Link to="/" className="shop-word">
        SHOP<span className="lane-word">LANE</span>
      </Link>

      <div className="navbar-right">
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle drop-down-btn"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="drop-down-btn-content">
              <RiAccountCircleLine size={"40px"} />
              <div className="login-signup">
                <span>Login</span>
                <span className="or-signup">or Sign Up</span>
              </div>
            </div>
          </button>

          <div className="dropdown-menu">
            <Link to={"/login"} className="dropdown-item">
              <TbLogin size={"20px"} />
              Login
            </Link>
            <Link to={"/signup"} className="dropdown-item">
              <FaRegAddressCard size={"18px"} />
              Sign Up
            </Link>

            <hr />

            <Link to={"/cartPage"} className="dropdown-item">
              <AiOutlineShoppingCart size={"20px"} />
              Cart
            </Link>

            <Link to={"/favorites"} className="dropdown-item">
              <MdOutlineFavoriteBorder size={"20px"} />
              Favourites
            </Link>
          </div>
        </div>

        <div>
          <Link to={"/CartPage"} className="navbar-cart-div">
            <div>
              <AiOutlineShoppingCart color="black" size={"2.5rem"} />
            </div>
            <div className={cart.cartItems.length > 0 ? "cart-length-div" : null}>
              <span className="cart-length-span">
                {cart.cartItems.length > 0 ? totalCartQuantity : null}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
