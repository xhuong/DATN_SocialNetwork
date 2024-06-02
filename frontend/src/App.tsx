import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { useSelector } from "react-redux";

import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import CartPage from "@/pages/CartPage";
import LoginPage from "@/pages/LoginPage";

// import Loading from "@/components/Loading";

function App() {
  // const isLoading = useSelector((state: any) => state.loading.isLoading);
  return (
    <div className="app">
      <div className="app_content">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            {/* need to be protect this router  */}
            <Route path="/my-cart" element={<CartPage />} />
            {/* need to be check auth before access this router  */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
        {/* {isLoading && <Loading />} */}
      </div>
    </div>
  );
}

export default App;
