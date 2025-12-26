import React from "react";
import Form from "../Form";
import { useNavigate } from "react-router-dom";
import SubCategoryHook from "../../hooks/SubCategoryHook";
import { createSubCategory } from "../../services/subCategoryservices";
import { useAuthoContext } from "../../context/AuthoContext";
import styles from "../categotyUpdate/addCategoty.module.css";
import toast from "react-hot-toast";

const SubcategoryAdd = () => {
  const { fetchSubCategory, allCategory } = useAuthoContext();
  const navigate = useNavigate();

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
      name: "image",
      label: "Update Image",
      type: "file",
      accept: "image/*",
      required: true,
    },
  ];

  const addData = async (data) => {
    try {
      const respo = await createSubCategory(data);

      if (respo?.success) {
        fetchSubCategory();
        navigate("/subcategory");
        toast.success(respo?.message);
      } else {
        toast.error(respo?.message);
      }
    } catch (err) {
      console.error("Error adding subcategory:", err);
    }
  };
  
  return (
    <div className={styles.container}>
      <Form
        title="SubCategory"
        fields={SubCategoryFields}
        onSubmit={addData}
        onCancel={() => navigate(-1)}
        submitButtonText="Add"
        mode="add"
      />
    </div>
  );
};

export default SubcategoryAdd;
