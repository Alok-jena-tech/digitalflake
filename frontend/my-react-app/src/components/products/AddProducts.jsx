import React from "react";
import Form from "../Form";
import { useNavigate } from "react-router-dom";
import ProductHook from "../../hooks/ProductHook";
import { createProduct } from "../../services/productServices";
import { useAuthoContext } from "../../context/AuthoContext";
import styles from "../categotyUpdate/addCategoty.module.css";
import toast from "react-hot-toast";
import { useState } from "react";
import { Placeholder } from "react-select/animated";
import { getAllSubCategories } from "../../services/productServices";

const AddProducts = () => {

  const { fetchProduct, allCategory } = useAuthoContext();

  const navigate = useNavigate();

  const [subCatOpt, setSubCatOpt] = useState([]);

  const categoryOption = allCategory?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const subCaterogyOption = subCatOpt?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const productField = [
    {
      name: "name",
      label: "Product Name",
      type: "text",
      required: true,
      Placeholder: "Enter Product name",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: categoryOption || [],
    },
    {
      name: "subcategory",
      label: "Sub Category",
      type: "select",
      required: true,
      options: subCaterogyOption || [],
    },
    {
      name: "image",
      label: "Update Image",
      type: "file",
      accept: "image/*",
      required: true,
    },
  ];

  const addData = async (data) => {
    try {
      const respo = await createProduct(data);

      if (respo?.success) {
        fetchProduct();
        navigate("/products");
        toast.success(respo?.message);

      } else {
        toast.error(respo?.message);
      }
    } catch (err) {
      console.error("Error product add:", err);
    }
  };

  const getSubCategorybyCat = async (id) => {

    const res = await getAllSubCategories(id);
    setSubCatOpt(res.data);

  };
  return (
    <div className={styles.container}>
      <Form
        title="Product"
        getSubCategorybyCat={getSubCategorybyCat}
        fields={productField}
        onSubmit={addData}
        onCancel={() => navigate(-1)}
        submitButtonText="Add"
        mode="add"
      />
    </div>
  );
};

export default AddProducts;
