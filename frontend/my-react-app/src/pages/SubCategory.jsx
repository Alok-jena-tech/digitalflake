import React from "react";
import { useAuthoContext } from "../context/AuthoContext";
import Table from "../components/Table";
import styles from "./category.module.css";
import { useNavigate } from "react-router-dom";
import ListHeader from "../components/ListHeader";
import { FaListUl } from "react-icons/fa";
import { deleteSubCategory } from "../services/subCategoryservices";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../components/modal";

const SubCategory = () => {
  const {fetchSubCategory,  allSubCategory } = useAuthoContext();
  const [searchTerm, setSearchTerm] = useState("");
 const [isOpen, setIsOpen] = useState(false);
  const[deletSubCategor,setDeleteSubCategory]=useState()

  const navigate = useNavigate();
  const subCategoryHeaders = [
    { key: "id", label: "ID", render: (item, rowIndex) => rowIndex + 1 },
    { key: "name", label: "Sub Category Name" },
    { key: "category", label: "Category",render:(item)=>{return(item.category.name)} },
    {
      key: "image",
      label: "Image",
      render: (item) => {
        return (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
            alt="item.name"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          style={{
            color: item.status === "active" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {item.status === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

   useEffect(() => {
    const timer = setTimeout(() => {
      fetchSubCategory(searchTerm || "");
    }, 300);
  
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  
  const handleEditCategory = (subcategory) => {
    const data = { subcategory, mode: "edit" };
    // include category id in query so update page can recover state on reload
    navigate(`/subCategory/update?id=${subcategory._id}`, { state: data });
  };

  const handleDeleteSubCategory = async(subcategory) => {
    try {
      const res = await deleteSubCategory(subcategory._id);
      console.log("subcategory delete",res)
      if (res.success) {
        toast.success(res.message);
        fetchSubCategory();
      }
    } catch (err) {
      toast.error(err.message);
      console.log("subcategory delete error", err);
    }
    finally{
      setDeleteSubCategory(null);
      setIsOpen(false);
    }
  };
  return (
    <div className={styles.category}>
      <ListHeader
        title="Sub Category"
        icon={<FaListUl />}
        onSearchChange={(searTerm) => {
          setSearchTerm(searTerm);
        }}
        onAddNewClick={() => {
          navigate("/subCategory/add");
        }}
      />
      <Table
        headers={subCategoryHeaders}
        data={allSubCategory}
        onEdit={handleEditCategory}
        onDelete={(subcategory)=>{setIsOpen(true),setDeleteSubCategory(subcategory)}}
      />{" "}
      <Modal
        isOpen={isOpen}
        onCancel={()=>setIsOpen(false)}
        onConfirm={()=>handleDeleteSubCategory(deletSubCategor)}
        type="delete"
      />
    </div>
  );
};

export default SubCategory;
