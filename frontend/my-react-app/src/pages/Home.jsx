import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import styles from "./home.module.css";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.homepage}>
      <Sidebar />
      <Outlet/>
      </div>
    </div>
  );
};

export default Home;
