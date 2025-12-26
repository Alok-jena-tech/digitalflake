import React from "react";
import { useLocation } from "react-router-dom";
import Form from "../Form";
import { useNavigate } from "react-router-dom";
import CategoryHook from "../../hooks/CategoryHook";
import styles from "./categoryupdate.module.css";

const CategoryUpdate = () => {

  const location = useLocation();

  const data = location.state;

  const navigate = useNavigate();

  const { SubmitUpdateCategory } = CategoryHook();
  
  const categoryFields = [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      required: true,
      placeholder: "Enter category name",
    },
    {
      name: "image",
      label: "Update Image",
      type: "file",
      accept: "image/*",
      required: true,
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
  ];

  const updateCategory = (datas) => {
    SubmitUpdateCategory(datas, data.category._id);
  };

  return (
    <div className={styles.container} >
    <Form
      title="Category"
      fields={categoryFields}
      initialData={data?.category}
      onSubmit={updateCategory}
      onCancel={() => navigate(-1)}
      submitButtonText={data?.mode === "edit" ? "Update " : "Add "}
      mode={data?.mode}
    />
    </div>
  );
};

export default CategoryUpdate;