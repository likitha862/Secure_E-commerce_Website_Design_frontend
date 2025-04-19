import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./account.css";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { setUser, setIsAuth } = UserData();

  const handleLogout = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("You have successfully logged out.");
    navigate("/login");
  };

  return (
    <>
      {user && (
        <div className="profile">
          <h2 className="profile-title">Welcome, {user.name}</h2>
          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <button
              className="common-btn"
              onClick={() => navigate(`/${user._id}/dashboard`)}
            >
              <MdDashboard />
              &nbsp;Go to Dashboard
            </button>

            {user.role === "admin" && (
              <button
                className="common-btn admin-btn"
                onClick={() => navigate("/admin/dashboard")}
              >
                <MdDashboard />
                &nbsp;Admin Dashboard
              </button>
            )}

            <button
              className="common-btn logout-btn"
              onClick={handleLogout}
            >
              <IoMdLogOut />
              &nbsp;Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
