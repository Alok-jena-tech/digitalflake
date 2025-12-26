import React from "react";
import styles from "./Sidebar.module.css";
import { FaHome, FaTh, FaListUl, FaCube, FaAngleRight } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", Icon: FaHome, path: "/", isHighlighted: true },
  { name: "Category", Icon: FaTh, path: "/category", isHighlighted: false },
  {
    name: "Subcategory",
    Icon: FaListUl,
    path: "/subcategory",
    isHighlighted: false,
  },
  { name: "Products", Icon: FaCube, path: "/products", isHighlighted: false },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState(null);

  return (
    <>
      {" "}
      <div className={styles.mobileMenuBtn} onClick={() => setIsOpen(!isOpen)}>
        <FaBars size={20} />
      </div>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={`${item.path}`}
            className={styles.link}
            onClick={() => {
              setIsOpen(false), setSection(item.name);
            }}
          >
            <div
              className={`${styles.navItem} ${
                section === item.name ? styles.highlighted : ""
              }`}
            >
              <item.Icon className={styles.leftIcon} />

              <span className={styles.itemName}>{item.name}</span>

              <FaAngleRight className={styles.rightIcon} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
