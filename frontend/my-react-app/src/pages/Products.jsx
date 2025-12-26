import React, { useState } from "react";
import Table from "../components/Table";
import { useAuthoContext } from "../context/AuthoContext";
import styles from "./Category.module.css";
import { useNavigate } from "react-router-dom";
import ListHeader from "../components/ListHeader";
import { FaCube } from "react-icons/fa";
import { useEffect } from "react";
import { deleteProduct } from "../services/productServices";
import toast from "react-hot-toast";
import Modal from "../components/modal";

const ProductPage = () => {
  const { fetchProduct, allProduct } = useAuthoContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [deletproduct, setDeletproduct] = useState();

  const productHeaders = [
    { key: "id", label: "ID", render: (item, rowIndex) => rowIndex + 1 },
    { key: "name", label: "Product Name" },
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
      key: "subcategory",
      label: "Sub Categoty",
      render: (item) => {
        return item.subcategory.name;
      },
    },
    {
      key: "category",
      label: "Category",
      render: (item) => {
        return item.category.name;
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
      fetchProduct(searchTerm || "");
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleEditCategory = (product) => {
    const data = { product, mode: "edit" };
    // include category id in query so update page can recover state on reload
    navigate(`/products/update?id=${product._id}`, { state: data });
  };

  const handleDeleteProduct = async (product) => {
    try {
      console.log("products are ", product);
      const res = await deleteProduct(product._id);
      if (res.success) {
        toast.success(res.message);
        fetchProduct();
      }
    } catch (err) {
      toast.error(err.message);
      console.log("product delete error", err);
    } finally {
      setDeletproduct(null);
      setIsOpen(false);
    }
  };
  return (
    <div className={styles.category}>
      <ListHeader
        title="Product"
        icon={<FaCube />}
        onSearchChange={(searTerm) => {
          setSearchTerm(searTerm);
        }}
        onAddNewClick={() => {
          navigate("/products/add");
        }}
      />
      <Table
        title="Product"
        headers={productHeaders}
        data={allProduct}
        onEdit={handleEditCategory}
        onDelete={(product) => {
          setIsOpen(true), setDeletproduct(product);
        }}
      />
      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={() => handleDeleteProduct(deletproduct)}
        type="delete"
      />
    </div>
  );
};

export default ProductPage;
