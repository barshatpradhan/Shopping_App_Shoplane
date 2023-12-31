import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PageNotFound from "./pages/PageNotFound";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products/category/:categoryName"
            element={<ProtectedRoute Component={CategoryPage} />}
          />
          <Route
            path="/products/:id"
            element={<ProtectedRoute Component={ProductDetailPage} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/cartPage"
            element={<ProtectedRoute Component={CartPage} />}
          />
          <Route path="/favorites" element={<ProtectedRoute Component={FavoritesPage}/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
