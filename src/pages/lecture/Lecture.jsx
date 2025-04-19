import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import Loading from "../../components/loading/Loading";
import Compiler from "../../components/compiler/compiler";
import { server } from "../../main";

const Lecture = ({ user }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [completed, setCompleted] = useState(0);
  const [completedLec, setCompletedLec] = useState(0);
  const [lectLength, setLectLength] = useState(0);
  const [progress, setProgress] = useState([]);

  // Authorization check
  if (
    user &&
    user.role !== "admin" &&
    !user.subscription.includes(params.id)
  ) {
    navigate("/");
  }

  const fetchLectures = async () => {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLectures(data.lectures);
    } catch (error) {
      console.error("Failed to fetch lectures:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLecture = async (id) => {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
    } catch (error) {
      console.error("Failed to load lecture:", error);
    } finally {
      setLecLoading(false);
    }
  };

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        formData,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      toast.success(data.message);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo(null);
      setVideoPrev("");
      setShowForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (!confirm("Are you sure you want to delete this lecture?")) return;
    try {
      const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      toast.success(data.message);
      fetchLectures();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const fetchProgress = async () => {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.error("Progress fetch failed:", error);
    }
  };

  const addProgress = async (id) => {
    try {
      await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      fetchProgress();
    } catch (error) {
      console.error("Error adding progress:", error);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="progress">
        Completed: {completedLec}/{lectLength}
        <br />
        <progress value={completed} max={100}></progress> {completed}%
      </div>

      <div className="lecture-page">
        <div className="left">
          {lecLoading ? (
            <Loading />
          ) : lecture.video ? (
            <>
              <video
                src={`${server}/${lecture.video}`}
                controls
                autoPlay
                width="100%"
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                onEnded={() => addProgress(lecture._id)}
              />
              <h1>{lecture.title}</h1>
              <h3>{lecture.description}</h3>
              <div style={{ marginTop: "2rem" }}>
                <Compiler />
              </div>
            </>
          ) : (
            <h2>Select a lecture to begin</h2>
          )}
        </div>

        <div className="right">
          {user?.role === "admin" && (
            <button
              className="common-btn"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close" : "Add Lecture +"}
            </button>
          )}

          {showForm && (
            <div className="lecture-form">
              <h2>Upload New Lecture</h2>
              <form onSubmit={submitHandler}>
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <input
                  type="file"
                  accept="video/*"
                  onChange={changeVideoHandler}
                  required
                />

                {videoPrev && (
                  <video
                    src={videoPrev}
                    width={300}
                    controls
                    style={{ marginTop: "10px" }}
                  />
                )}

                <button
                  className="common-btn"
                  type="submit"
                  disabled={btnLoading}
                >
                  {btnLoading ? "Please Wait..." : "Add"}
                </button>
              </form>
            </div>
          )}

          {lectures.length > 0 ? (
            lectures.map((lec, i) => (
              <div key={lec._id}>
                <div
                  className={`lecture-number ${
                    lecture._id === lec._id ? "active" : ""
                  }`}
                  onClick={() => fetchLecture(lec._id)}
                >
                  {i + 1}. {lec.title}{" "}
                  {progress[0]?.completedLectures.includes(lec._id) && (
                    <span
                      style={{
                        background: "red",
                        padding: "2px",
                        borderRadius: "6px",
                        color: "greenyellow",
                      }}
                    >
                      <TiTick />
                    </span>
                  )}
                </div>
                {user?.role === "admin" && (
                  <button
                    className="common-btn"
                    style={{ background: "red", marginTop: "8px" }}
                    onClick={() => deleteHandler(lec._id)}
                  >
                    Delete {lec.title}
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No lectures have been uploaded yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Lecture;
