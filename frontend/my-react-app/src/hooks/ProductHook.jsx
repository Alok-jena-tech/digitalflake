import React from "react";
import { useState } from "react";
import { productupdate } from "../services/productServices";
import { useAuthoContext } from "../context/AuthoContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductHook = (initialData) => {

  const { fetchProduct } = useAuthoContext();
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || "",
    image: initialData?.image || "",
    status: initialData?.status || "",
    category: initialData?.category || "",
    subcategory:initialData?.subcategory||""
  }));

   const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const SubmitUpdateProduct = async (data, id) => {
    try {
      const response = await productupdate(data, id);
      
      if (response?.success) {
        fetchProduct();
        toast.success(response?.message);
        setTimeout(() => navigate("/products"), 100);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("subcategory update error", error);
    }
  };
  return {
    formData,
    setFormData,
    errors,
    setErrors,
    SubmitUpdateProduct,
  };
};

export default ProductHook;
