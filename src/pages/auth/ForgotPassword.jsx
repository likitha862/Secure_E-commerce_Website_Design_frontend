import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const response = await axios.post(`${server}/api/user/forgot`, { email });
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your-email@example.com"
          />
          <button
            type="submit"
            disabled={btnLoading}
            className="common-btn"
          >
            {btnLoading ? "Please Wait..." : "Forgot Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
