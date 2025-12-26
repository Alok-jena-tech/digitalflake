import React from 'react'
import styles from "./homepage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
        <img src="HomeMiddle.png" alt="homemiddlepage" className={styles.middlelogo} />
        <p>Welcome to Digitalflake admin</p>
    </div>
  )
}

export default HomePage
