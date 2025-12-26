import React from "react";
import styles from "./forgetpassword.module.css";
const ForgotPassword = ({onSubmit, show, setShow, type, setInput }) => {
  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.heading}>Did you forget password?</h2>
        <p className={styles.text}>
          Enter your email address and we’ll send you otp to restore password 
        </p>
        <div className={styles.middle}>
          {type === "email" && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                onChange={(e) => setInput(e.target.value)}
                className={styles.input}
              />
            </div>
          )}
           {type === "otp" && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Enter OTP</label>
              <input
                type="number"
                onChange={(e) => setInput(e.target.value)}
                className={styles.input}
              />
            </div>
          )}
           {type === "password" && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Enter Password</label>
              <input
                type="password"
              autoComplete="current-password"
                onChange={(e) => setInput(e.target.value)}
                className={styles.input}
              />
            </div>
          )}
          <button onClick={onSubmit} className={styles.submitBtn}>
           {type==="email"? "send for otp":type==="otp"?"send otp":"set password"}
          </button>
        </div>
        <div onClick={() => setShow(false)} className={styles.backBtn}>
          Back to log in
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
