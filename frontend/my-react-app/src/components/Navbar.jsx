import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import styles from "./navbar.module.css";
import Modal from "./modal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navimage from "../assets/navdigital.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleModalCancel = () => {
    setIsOpen(false);
  };

  const handleLogoutConfirm = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    toast.success("Logout successfull");
    navigate("/login");
  };
  
  return (
    <div className={styles.navbar}>
      <img src={Navimage} alt="navimage" className={styles.logoo} />
      <BsPersonCircle
        size={28}
        onClick={() => setIsOpen(true)}
        className={styles.personalicon}
      />
      <Modal
        isOpen={isOpen}
        onCancel={handleModalCancel}
        onConfirm={handleLogoutConfirm}
        type="logout"
      />
    </div>
  );
};

export default Navbar;
