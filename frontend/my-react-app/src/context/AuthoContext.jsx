import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { getAllCategory } from "../services/categoryServices";
import { getAllSubCategory } from "../services/subCategoryservices";
import { getAllProduct } from "../services/productServices";

const AuthoContext = createContext();

const AuthoProvider = ({ children }) => {
  const [token,setToken]=useState(Cookies.get("token"))

  const [userData, setUserData] = useState(() => {
    const saved = Cookies.get("user");

    try {
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      Cookies.remove("user");
      return null;
    }
  });

  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [allProduct, setAllProduct] = useState([]);

  const fetchCategory = async (q = "") => {

    try {
      const res = await getAllCategory(q);
      if (res?.success) {
        setAllCategory(res.data);
      }
    } catch (error) {
      console.log("category fetch error", error);
    }
  };
  const fetchSubCategory = async (q = "") => {
    try {
      const res = await getAllSubCategory(q);
      if (res?.success) {
        setAllSubCategory(res.data);
      }
    } catch (err) {
      console.log("subcategory error", err);
    }
  };

  const fetchProduct = async (q = "") => {
    try {
      const res = await getAllProduct(q);
      if (res.success) {
        setAllProduct(res.data);
      }
    } catch (err) {
      console.log("product fetch error", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategory();
      fetchSubCategory();
      fetchProduct();
    }
  }, [token]);

  return (
    <AuthoContext.Provider
      value={{
        userData,
        setUserData,
        allCategory,
        setAllCategory,
        fetchCategory,
        fetchSubCategory,
        allSubCategory,
        setAllSubCategory,
        allProduct,
        fetchProduct,
        setAllProduct,
      }}
    >
      {children}
    </AuthoContext.Provider>
  );
};
export default AuthoProvider;

export const useAuthoContext = () => {
  return useContext(AuthoContext);
};
