import styles from "./LoginSkeleton.module.css";

const LoginSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo + Title */}
        <div className={styles.logoContainer}>
          <div className={styles.logoSkeleton}></div>
          <div className={styles.titleSkeleton}></div>
        </div>

        {/* Email */}
        <div className={styles.inputGroup}>
          <div className={styles.labelSkeleton}></div>
          <div className={styles.inputSkeleton}></div>
        </div>

        {/* Password */}
        <div className={styles.inputGroup}>
          <div className={styles.labelSkeleton}></div>
          <div className={styles.inputSkeleton}></div>
        </div>

        {/* Forgot password */}
        <div className={styles.linkSkeleton}></div>

        {/* Button */}
        <div className={styles.buttonSkeleton}></div>

        {/* Signup */}
        <div className={styles.linkSkeleton}></div>
      </div>
    </div>
  );
};

export default LoginSkeleton;
