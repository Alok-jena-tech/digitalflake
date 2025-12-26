import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthoProvider from "./context/AuthoContext";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Products from "./pages/Products";
import AddCategory from "./components/categotyUpdate/AddCategory";
import CategoryUpdate from "./components/categotyUpdate/CategoryUpdate";
import SubCategoryUpdate from "./components/subCategoryupdate/SubCategoryUpdate";
import SubcategoryAdd from "./components/subCategoryupdate/SubcategoryAdd";
import AddProducts from "./components/products/AddProducts";
import ProductUpdate from "./components/products/ProductUpdate";

const App = () => {
  return (
    <>
      {" "}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <AuthoProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />}>
                <Route index element={<HomePage />} />

                {/* categoty */}

                <Route path="/category" element={<Category />} />
                <Route path="/category/update" element={<CategoryUpdate />} />
                <Route path="/category/add" element={<AddCategory />} />

                {/* subcategory */}
                
                <Route path="/subcategory" element={<SubCategory />} />
                <Route
                  path="/subCategory/update"
                  element={<SubCategoryUpdate />}
                />
                <Route path="subcategory/add" element={<SubcategoryAdd />} />

                {/* product */}

                <Route path="/products" element={<Products />} />
                <Route path="/products/add" element={<AddProducts />} />
                <Route path="/products/update" element={<ProductUpdate />} />
              </Route>
            </Route>
          </Routes>
        </AuthoProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
