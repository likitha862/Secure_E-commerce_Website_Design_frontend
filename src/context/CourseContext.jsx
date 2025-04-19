import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [mycourse, setMyCourse] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${server}/api/course/all`);
      setCourses(response.data.courses);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  const fetchCourse = async (id) => {
    try {
      const res = await axios.get(`${server}/api/course/${id}`);
      setCourse(res.data.course);
    } catch (err) {
      console.error("Unable to fetch course:", err);
    }
  };

  const fetchMyCourse = async () => {
    try {
      const res = await axios.get(`${server}/api/mycourse`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMyCourse(res.data.courses);
    } catch (err) {
      console.error("Failed to fetch enrolled courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
