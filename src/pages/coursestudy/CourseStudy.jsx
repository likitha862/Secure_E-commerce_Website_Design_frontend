import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  return (
    <>
      {course && (
      <div className="course-study-page">
      <div className="course-card">
        <img src={`${server}/${course.image}`} alt={course.title} className="course-card__image" />
    
        <div className="course-card__body">
          <h2 className="course-card__title">{course.title}</h2>
          <p className="course-card__meta">By <strong>{course.createdBy}</strong> • Duration: <strong>{course.duration} weeks</strong></p>
          <p className="course-card__description">{course.description}</p>
          <Link to={`/lectures/${course._id}`} className="course-card__button">
            View Lectures
          </Link>
        </div>
      </div>
    </div>
    
     
      )}
    </>
  );
};

export default CourseStudy;
