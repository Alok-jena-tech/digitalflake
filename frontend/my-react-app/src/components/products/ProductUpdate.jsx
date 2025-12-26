import React from "react";
import { useLocation } from "react-router-dom";
import Form from "../Form";
import { useNavigate } from "react-router-dom";
import ProductHook from "../../hooks/ProductHook";
import styles from "../categotyUpdate/categoryupdate.module.css";
import { useAuthoContext } from "../../context/AuthoContext";

const ProductUpdate = () => {

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const { allProduct, allCategory, allSubCategory } = useAuthoContext();

  const { SubmitUpdateProduct } = ProductHook();

  const subCategoryOption = allSubCategory.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const categoryOption = allCategory.map((item) => ({
    label: item.name,
    value: item._id,
  }));
  
  const productfields = [
    {
      name: "name",
      label: "Product Name",
      type: "text",
      required: true,
      placeholder: "Enter product name",
    },
    {
      name: "subcategory",
      label: "Sub Category",
      type: "select",
      required: true,
      options: subCategoryOption || [],
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: categoryOption || [],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,

      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      name: "image",
      label: "Update Image",
      type: "file",
      accept: "image/*",
      required: true,
    },
  ];

  const updateProduct = (datas) => {
    SubmitUpdateProduct(datas, data.product._id);
  };

  return (
    <div className={styles.container}>
      {" "}
      <Form
        title="Product"
        fields={productfields}
        initialData={data?.product}
        onSubmit={updateProduct}
        onCancel={() => navigate(-1)}
        submitButtonText={data?.mode === "edit" ? "Update " : "Add "}
        mode={data?.mode}
      />
    </div>
  );
};

export default ProductUpdate;
