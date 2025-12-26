import { React } from "react";
import { useAuthoContext } from "../context/AuthoContext";
import Table from "../components/Table";
import styles from "./category.module.css";
import { useNavigate } from "react-router-dom";
import ListHeader from "../components/ListHeader";
import { FaTh } from "react-icons/fa";
import { useEffect, useState } from "react";
import { deleteCategory } from "../services/categoryServices";
import toast from "react-hot-toast";
import Modal from "../components/modal";

const Category = () => {
  const { allCategory, fetchCategory } = useAuthoContext();

  const [isOpen, setIsOpen] = useState(false);
  const [deletCategor, setDeleteCategory] = useState();
  const navigate = useNavigate();

  const categoryHeaders = [
    { key: "id", label: "ID", render: (item, rowIndex) => rowIndex + 1 },
    { key: "name", label: "Category name" },
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

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategory(searchTerm || "");
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleEditCategory = (category) => {
    const data = { category, mode: "edit" };
    navigate(`/category/update?id=${category._id}`, { state: data });
  };

  const handleDeleteCategory = async (category) => {
    try {
      const res = await deleteCategory(category._id);
      if (res.success) {
        toast.success(res.message);
        fetchCategory();
      }
    } catch (err) {
      toast.error(err.message);
      console.log("category delete error", err);
    } finally {
      setDeleteCategory(null);
      setIsOpen(false);
    }
  };
  return (
    <div className={styles.category}>
      <ListHeader
        title="Category"
        icon={<FaTh />}
        onSearchChange={(searTerm) => {
          setSearchTerm(searTerm);
        }}
        onAddNewClick={() => {
          navigate("/category/add");
        }}
      />
      <Table
        headers={categoryHeaders}
        data={allCategory}
        onEdit={handleEditCategory}
        onDelete={(category) => {
          setIsOpen(true), setDeleteCategory(category);
        }}
      />
      <Modal
        isOpen={isOpen}
        onCancel={() => {setIsOpen(false), setDeleteCategory()}}
        onConfirm={() => handleDeleteCategory(deletCategor)}
        type="delete"
      />
    </div>
  );
};

export default Category;
