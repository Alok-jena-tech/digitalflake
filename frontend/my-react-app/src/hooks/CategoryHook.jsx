import React from "react";
import { useState } from "react";
import { categoryupdate } from "../services/categoryServices";
import { useAuthoContext } from "../context/AuthoContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CategoryHook = (initialData) => {

  const { fetchCategory } = useAuthoContext();

  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || "",
    image: initialData?.image || "",
    status: initialData?.status || "",
  }));

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const SubmitUpdateCategory = async (data, id) => {
    try {
      const response = await categoryupdate(data, id);
      // console.log("categfory update", response);
      
      if (response?.success) {
        fetchCategory();
        toast.success(response?.message);
        setTimeout(() => navigate("/category"), 100);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("category update error", error);
    }
  };
  return {
    formData,
    setFormData,
    errors,
    setErrors,
    SubmitUpdateCategory,
  };
};

export default CategoryHook;
