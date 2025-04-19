import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();

  const handleCaptcha = (value) => {
    console.log("Captcha completed:", value);
    setShow(true);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await verifyOtp(Number(otp), navigate);
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>

        <form onSubmit={submitHandler}>
          <label htmlFor="otp">OTP</label>
          <input
            id="otp"
            type="number"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleCaptcha}
          />

          {show && (
            <button
              type="submit"
              className="common-btn"
              disabled={btnLoading}
            >
              {btnLoading ? "Please Wait..." : "Verify"}
            </button>
          )}
        </form>

        <p>
          Go to the <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;
