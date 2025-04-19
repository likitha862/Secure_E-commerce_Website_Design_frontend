import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { server } from "../../main";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchCourse, course } = CourseData();
  const { fetchUser } = UserData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  const checkoutHandler = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: { token },
        }
      );
      window.location.href = response.data.url;
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to checkout.");
      setLoading(false);
    }
  };

  const isSubscribed = user?.subscription?.includes(course?._id);

  if (loading) return <Loading />;

  return (
    course && (
      <div className="course-description">
        <div className="course-header">
          <img
            src={`${server}/${course.image}`}
            alt={course.title}
            className="course-image"
          />
          <div className="course-info">
            <h2>{course.title}</h2>
            <p>Instructor: {course.createdBy}</p>
            <p>Duration: {course.duration} weeks</p>
          </div>
        </div>

        <p className="course-summary">{course.description}</p>

        <p className="course-price">
          Start learning now at just ${course.price}
        </p>

        {isSubscribed ? (
          <button
            onClick={() => navigate(`/course/study/${course._id}`)}
            className="common-btn"
          >
            Study
          </button>
        ) : (
          <button onClick={checkoutHandler} className="common-btn">
            Buy Now
          </button>
        )}
      </div>
    )
  );
};

export default CourseDescription;
