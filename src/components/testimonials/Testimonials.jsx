import React from "react";
import "./testimonials.css";

const Testimonials = () => {
  const feedbackList = [
    {
      id: 1,
      name: "Likitha",
      position: "Student",
      message:
        "This platform provided a fantastic learning journey. Courses were easy to follow, and instructors were incredibly skilled. I now feel more confident applying what I’ve learned.",
      image:
        "https://cdn.pixabay.com/photo/2015/06/12/21/55/child-807536_1280.jpg",
    },
    {
      id: 2,
      name: "Rachana",
      position: "Student",
      message:
        "I’m truly impressed! The topics are taught in a simplified way, and every course adds real value. It’s definitely helped me grow academically and professionally.",
      image:
        "https://cdn.pixabay.com/photo/2017/03/24/22/11/girl-2172318_1280.jpg",
    },
    {
      id: 3,
      name: "Sai Teja",
      position: "Student",
      message:
        "From the very beginning, I felt engaged. The teaching style is practical and focused, making it easy to apply concepts directly to real-world challenges.",
      image:
        "https://cdn.pixabay.com/photo/2017/11/02/14/27/model-2911332_1280.jpg",
    },
    {
      id: 4,
      name: "Sivaji",
      position: "Student",
      message:
        "After exploring several learning platforms, this one stands out. The content is clear, hands-on, and led by professionals who know how to teach effectively.",
      image:
        "https://cdn.pixabay.com/photo/2022/08/21/03/48/smile-7400381_1280.jpg",
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Students Say</h2>
      <div className="testmonials-cards">
        {feedbackList.map((item) => (
          <div className="testimonial-card" key={item.id}>
            <div className="student-image">
              <img src={item.image} alt={`${item.name}'s profile`} />
            </div>
            <p className="message">{item.message}</p>
            <div className="info">
              <p className="name">{item.name}</p>
              <p className="position">{item.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
