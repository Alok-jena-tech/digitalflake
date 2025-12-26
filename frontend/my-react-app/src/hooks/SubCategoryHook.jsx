import React from "react";
import { useState } from "react";
import { subCategoryupdate } from "../services/subCategoryservices";
import { useAuthoContext } from "../context/AuthoContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SubCategoryHook = (initialData) => {
  const { fetchSubCategory } = useAuthoContext();
  
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || "",
    image: initialData?.image || "",
    status: initialData?.status || "",
    category:initialData?.category || ""
  }));

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const SubmitUpdatesubCategory = async (data, id) => {
    try {
      const response = await subCategoryupdate(data, id);

      if (response?.success) {
        fetchSubCategory();
        toast.success(response?.message);
        setTimeout(() => navigate("/subCategory"), 100);
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
    SubmitUpdatesubCategory,
  };
};

export default SubCategoryHook;
