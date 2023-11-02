import { Link } from "react-router-dom";

const CategoryNames = () => {
  const Electronics = "electronics";
  const Jewellery = "jewelery";
  const mensClothing = "men's%20clothing";
  const womensClothing = "women's%20clothing";

  return (
    <div className="category-names">
      <Link to={"/"} className="each-category-name">All</Link>
      <Link to={"/products/category/" + Electronics} className="each-category-name">Electronics</Link>
      <Link to={"/products/category/" + Jewellery} className="each-category-name">Jewellery</Link>
      <Link to={"/products/category/" + mensClothing} className="each-category-name">Men's Clothing </Link>
      <Link to={"/products/category/" + womensClothing} className="each-category-name">Women's Clothing </Link>
    </div>
  );
}

export default CategoryNames
