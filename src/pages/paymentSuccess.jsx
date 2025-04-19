// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Loading from "../../components/loading/Loading";
// import { UserData, CourseData } from "../../context";

// export default function PaymentSuccess() {
//   const navigate = useNavigate();
//   const { search } = useLocation();
//   const [loading, setLoading] = useState(true);
//   const { fetchUser } = UserData();
//   const { fetchCourses, fetchMyCourse } = CourseData();

//   useEffect(() => {
//     const params = new URLSearchParams(search);
//     const session_id = params.get("session_id");
//     const courseId = params.get("courseId");
//     const token = localStorage.getItem("token");

//     axios.post(`${server}/api/stripe/verify`, { session_id, courseId }, {
//       headers: { token },
//     })
//     .then(({ data }) => {
//       toast.success(data.message);
//       return Promise.all([fetchUser(), fetchCourses(), fetchMyCourse()]);
//     })
//     .then(() => navigate(`/course/study/${courseId}`))
//     .catch(err => toast.error(err.response?.data?.message))
//     .finally(() => setLoading(false));
//   }, []);

//   return loading ? <Loading /> : null;
// }


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";
import { server } from "../../main";

const PaymentSuccess = ({ user }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id");
    const courseId = params.get("courseId");
    const token = localStorage.getItem("token");

    axios.post(
      `${server}/api/stripe/verify`,
      { session_id, courseId },
      { headers: { token } }
    )
    .then(({ data }) => {
      toast.success(data.message);
      navigate(`/${user._id}/dashboard`);
    })
    .catch(err => toast.error(err.response?.data?.message || "Verification failed"))
    .finally(() => setLoading(false));
  }, [search]);

  return loading ? <Loading /> : null;
};

export default PaymentSuccess;
