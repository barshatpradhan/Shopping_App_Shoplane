import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import WishlistItems from "./WishlistItems";

function Wishlist() {
  const wishlist = useSelector((state) => state.cart.wishListItems);

  let subTotal = 0;
  for (let each of wishlist) {
    subTotal += each.price;
  }

  let shippingEstimate = subTotal * 0.05;
  let taxEstimate = subTotal * 0.18;
  let orderTotal = subTotal + shippingEstimate + taxEstimate;

  return (
    <>
      {wishlist.length ? (
        <div className="main-cart-div">
          <div className=" card row cart-product-div">
            <Scrollbars style={{ height: "28rem", width: "100%" }}>
              {wishlist.map((product) => (
                <WishlistItems key={product.id} data={product} />
              ))}
            </Scrollbars>
          </div>

          <div className="card cart-summary-div">
            <div className="summary-div">
              <div className="text-center h4 order-summary">
                Wishlist Summary
              </div>
              <div className="row sub-total">
                <p className="col-lg-7 h6">Subtotal</p>
                <p className="col-lg-5">${subTotal.toFixed(2)}</p>
              </div>
              <div className="row shipping-estimate">
                <p className="col-lg-7 h6">Shipping Estimate</p>
                <p className="col-lg-5">${shippingEstimate.toFixed(2)}</p>
              </div>
              <div className="row tax-estimate">
                <p className="col-lg-7 h6">Tax Estimate</p>
                <p className="col-lg-5">${taxEstimate.toFixed(2)}</p>
              </div>
              <div className="row order-total">
                <p className="col-lg-7 h4">Wishlist Total</p>
                <p className="col-lg-5 h5">${orderTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "5rem 0rem 5rem",
          }}
        >
          <div className="card text-center" style={{ padding: "2rem" }}>
            <p>Your WishList is Empty!</p>
            <Link to={"/"}>
              <button className="btn blue-btn">Continue Shopping</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
export default Wishlist;
