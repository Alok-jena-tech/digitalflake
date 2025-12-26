import { useState } from "react";
import { userLogin } from "../services/authServices";
import { useAuthoContext } from "../context/AuthoContext";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { userSignUp } from "../services/authServices";
import toast from "react-hot-toast";

const UserHook = () => {
  const { setUserData } = useAuthoContext();
  const [loading,setLoading]=useState(false);

  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const Login = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!user.email) {
        return toast.error("Email is required");
      }
      if (!emailRegex.test(user.email)) {
        return toast.error("Invalid Email Format");
      }
      if (user.password.length < 6) {
        return toast.error("Password must be at least 6 characters");
      }
      const response = await userLogin(user);
      // console.log("login response", response);

      if (!response || response.success !== true) {
      toast.error(response?.message || "Invalid credentials");
      return;
    }
      toast.success("Login Successful!");

      Cookies.set("token", response?.token);
      Cookies.set("user", JSON.stringify(response?.user));

      setUserData(response?.user);

      setUser({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      console.log(("login error", error));
      toast.error("Invalid Credential!");
    }finally{
      setLoading(false)
    }
  };

  const SignUp = async () => {
    try {
      if (!user.email) {
        return toast.error("Email is required");
      }
      if (!emailRegex.test(user.email)) {
        return toast.error("Invalid Email Format");
      }
      if (!user.name.trim()) {
        return toast.error("Name is required");
      }
      if (user.password.length < 6) {
        return toast.error("Password must be at least 6 characters");
      }
      const response = await userSignUp(user);
      // console.log("signup response", response);

      if (response?.success) {
        navigate("/login");
      }
      toast.success("SignUp Successful!");

      setUser({
        email: "",
        password: "",
        name: "",
      });
    } catch (error) {
      console.log("signup error", error);
      toast.error("Signup failed");
    }
  };
  return { Login, user, setUser, SignUp,loading,setLoading };
};
export default UserHook;
