import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const loginUser = async (email, password, navigate, fetchMyCourse) => {
    setBtnLoading(true);
    try {
      const response = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      setIsAuth(true);
      navigate("/");
      fetchMyCourse();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed.");
      setIsAuth(false);
    } finally {
      setBtnLoading(false);
    }
  };

  const registerUser = async (name, email, password, navigate) => {
    setBtnLoading(true);
    try {
      const res = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(res.data.message);
      localStorage.setItem("activationToken", res.data.activationToken);
      navigate("/verify");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed.");
    } finally {
      setBtnLoading(false);
    }
  };

  const verifyOtp = async (otp, navigate) => {
    setBtnLoading(true);
    const token = localStorage.getItem("activationToken");

    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken: token,
      });

      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed.");
    } finally {
      setBtnLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUser(res.data.user);
      setIsAuth(true);
    } catch (err) {
      console.warn("User fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
