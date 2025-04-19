import React from "react";
import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Dashbord = () => {
  const { mycourse } = CourseData();

  return (
    <div className="student-dashboard">
      <h2 className="dashboard-heading">All Enrolled Courses</h2>

      <div className="dashboard-content">
        {Array.isArray(mycourse) && mycourse.length > 0 ? (
          mycourse.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p className="no-course-msg">You haven’t enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
