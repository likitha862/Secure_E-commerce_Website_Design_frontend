import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const { fetchUser } = UserData();
  const { fetchMyCourse } = CourseData();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");
    const courseId = query.get("courseId");
    const authToken = localStorage.getItem("token");

    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          `${server}/api/stripe/verify`,
          { session_id: sessionId, courseId },
          {
            headers: { token: authToken },
          }
        );

        toast.success(data.message);

        await Promise.all([fetchUser(), fetchMyCourse()]);

        navigate(`/course/study/${courseId}`);
      } catch (error) {
        toast.error(error.response?.data?.message || "Payment verification failed");
        navigate("/courses");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search]);

  return loading ? <Loading /> : null;
};

export default PaymentSuccess;
