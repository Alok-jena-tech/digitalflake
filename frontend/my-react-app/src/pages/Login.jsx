import UserHook from "../hooks/UserHook";
import styles from "./Login.module.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ForgotPassword from "../components/ForgetPassword";
import LoginSkeleton from "./LoginSkeleton";
import Cookies from "js-cookie";
import { sendOtp } from "../services/authServices";
import { verifyOtp } from "../services/authServices";
import toast from "react-hot-toast";
import { resetpassword } from "../services/authServices";

export default function Login() {
  const { setUser, user, Login, loading } = UserHook();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [openforotp, setOpenforotp] = useState(false);
  const [emailforotp, setEmailforotp] = useState("");
  const [otp, setOtp] = useState("");
  const [openforpassword, setOpenforpassword] = useState(false);
  const [forgetpass, setForgetpass] = useState();


  const sendemailtopt = async () => {
    try {
      const respons = await sendOtp({ email: emailforotp });
      if (respons.success) {
        toast.success("otp send successfully");
        setShowForgot(false);

        setOpenforotp(true);
      }
    } catch (err) {
      toast.error("otp send fail", err);
    }
  };

  const sendOpt = async () => {
    try {
      const response = await verifyOtp({ email: emailforotp, otp });
      if (response.success) {
        toast.success(response.message);
        setOpenforotp(false);
        setOpenforpassword(true);
      }
    } catch (err) {
      toast.error("send opt",err);
    }
  };

  const setforpassword = async () => {
    try {
      const response = await resetpassword({
        email: emailforotp,
        newPassword: forgetpass,
      });
      if (response.success) {
        toast.success(response.message);
        setOpenforpassword(false);
      }
    } catch (err) {
      toast.error("send password",err);
    }
  };

  if (loading) return <LoginSkeleton />;
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <img src="digitalflake.png" alt="logo" className={styles.logo} />
          <h2 className={styles.title}>Welcome to Digitalflake admin</h2>
        </div>

        <div className={styles.formGroup}>
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
              autoComplete="current-password"
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
              className={styles.input}
            />
            <span
              className={styles.icon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {/* for put email for otp */}
          <div className={styles.forgotBtn}>
            <div onClick={() => setShowForgot(true)}>Forgot Password?</div>
            <ForgotPassword
              type="email"
              onSubmit={sendemailtopt}
              setInput={setEmailforotp}
              show={showForgot}
              setShow={setShowForgot}
            />
          </div>

          {/* for put opt */}
          <div className={styles.forgotBtn}>
            <ForgotPassword
              type="otp"
              onSubmit={sendOpt}
              setInput={setOtp}
              show={openforotp}
              setShow={setOpenforotp}
            />
          </div>
          {/* for set password */}
          <div className={styles.forgotBtn}>
            <ForgotPassword
              type="password"
              onSubmit={setforpassword}
              setInput={setForgetpass}
              show={openforpassword}
              setShow={setOpenforpassword}
            />
          </div>
          <button type="button" onClick={Login}  className={styles.submitBtn}>
            Log In
          </button>

          <div className={styles.forgotBtn}>
            <Link to={"/signup"} className={styles.noUnderline}>
              <div>Sign Up ?</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
