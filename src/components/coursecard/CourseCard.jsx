import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm("Do you want to remove this course?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${server}/api/course/${courseId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(res.data.message);
      fetchCourses();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete course.");
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isSubscribed = user?.subscription?.includes(course._id);
  const isAdmin = user?.role === "admin";

  return (
    <div className="course-card">
      <img
        src={`${server}/${course.image}`}
        alt={`${course.title} cover`}
        className="course-image"
      />
      <h3>{course.title}</h3>
      <p>Instructor - {course.createdBy}</p>
      <p>Duration - {course.duration} weeks</p>
      <p>Price - ${course.price}</p>

      {isAuth ? (
        user && !isAdmin ? (
          isSubscribed ? (
            <button
              onClick={() => handleNavigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study
            </button>
          ) : (
            <button
              onClick={() => handleNavigate(`/course/${course._id}`)}
              className="common-btn"
            >
              Get Started
            </button>
          )
        ) : (
          <button
            onClick={() => handleNavigate(`/course/study/${course._id}`)}
            className="common-btn"
          >
            Study
          </button>
        )
      ) : (
        <button
          onClick={() => handleNavigate("/login")}
          className="common-btn"
        >
          Get Started
        </button>
      )}

      <br />

      {isAdmin && (
        <button
          onClick={() => handleDelete(course._id)}
          className="common-btn"
          style={{ background: "red" }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;
