import React from "react";
import { useLocation } from "react-router-dom";
import Form from "../Form";
import { useNavigate } from "react-router-dom";
import SubCategoryHook from "../../hooks/SubCategoryHook";
import styles from "../categotyUpdate/categoryupdate.module.css";
import { useAuthoContext } from "../../context/AuthoContext";
const SubCategoryUpdate = () => {

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const { allCategory } = useAuthoContext();
  const { SubmitUpdatesubCategory } = SubCategoryHook();

  const subCaterogyOption = allCategory.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const SubCategoryFields = [
    {
      name: "name",
      label: "Sub category",
      type: "text",
      required: true,
      placeholder: "Enter sub category name",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: subCaterogyOption || [],
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

  const updateSubCategory = (datas) => {
    SubmitUpdatesubCategory(datas, data.subcategory._id);
  };
  
  return (
    <div className={styles.container}>
      {" "}
      <Form
        title="SubCategory"
        fields={SubCategoryFields}
        initialData={data?.subcategory}
        onSubmit={updateSubCategory}
        onCancel={() => navigate(-1)}
        submitButtonText={data?.mode === "edit" ? "Update " : "Add "}
        mode={data?.mode}
      />
    </div>
  );
};

export default SubCategoryUpdate;
