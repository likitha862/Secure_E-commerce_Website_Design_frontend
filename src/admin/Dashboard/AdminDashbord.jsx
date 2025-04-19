import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Redirect non-admin users to home page
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [dashboardStats, setDashboardStats] = useState({});

  const loadStats = async () => {
    try {
      const response = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setDashboardStats(response.data.stats);
    } catch (err) {
      console.error("Error fetching admin stats:", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Layout>
      <div className="main-content">
        <div className="box">
          <p>Total Courses</p>
          <p>{dashboardStats.totalCoures}</p>
        </div>
        <div className="box">
          <p>Total Lectures</p>
          <p>{dashboardStats.totalLectures}</p>
        </div>
        <div className="box">
          <p>Total Users</p>
          <p>{dashboardStats.totalUsers}</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
