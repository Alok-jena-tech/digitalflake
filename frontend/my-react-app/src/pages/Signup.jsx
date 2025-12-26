import UserHook from "../hooks/UserHook";
import styles from "./signup.module.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
const {setUser,SignUp,user}=UserHook();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
         <div className={styles.card}>
           <div className={styles.logoContainer}>
             <img src="digitalflake.png" alt="logo" className={styles.logo} />
             <h2 className={styles.title}>Welcome to Digitalflake admin</h2>
           </div>
   
           <div className={styles.formGroup}>
            <div>
               <label className={styles.label}>Name</label>
               <input
                 type="text"
                 name="name"
                 value={user.name}
                 onChange={(e) =>
                   setUser({ ...user, [e.target.name]: e.target.value })
                 }
                 className={styles.input}
               />
             </div>
             <div>
               <label className={styles.label}>Email-id</label>
               <input
                 type="email"
                 name="email"
                 value={user.email}
                 onChange={(e) =>
                   setUser({ ...user, [e.target.name]: e.target.value })
                 }
                 className={styles.input}
               />
             </div>
   
             <div className={styles.passwordWrapper}>
               <label className={styles.label}>Password</label>
               <input
                 type={showPassword ? "text" : "password"}
                 name="password"
                 value={user.password}
                 onChange={(e) =>
                   setUser({ ...user, [e.target.name]: e.target.value })
                 }
                 className={styles.input}
               />
                <span
               className={styles.icon}
               onClick={() => setShowPassword(!showPassword)}
             >
              {showPassword? <FaEye/>:<FaEyeSlash/>}
             </span>
             </div>
            
   
             <button onClick={SignUp} className={styles.submitBtn}>
               Sign Up
             </button>
             <div className={styles.forgotBtn}>
              <Link to={"/login"} class={styles.noUnderline}><div>Login ?</div></Link> 
             </div>
           </div>
         </div>
       </div>
  )
}

export default Signup
