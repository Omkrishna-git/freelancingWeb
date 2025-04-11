import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";
import DemoImage from "../assets/demo.png";

const reviews = [
  {
    name: "Alice Johnson",
    date: "March 5, 2025",
    title: "Fantastic Service!",
    body: "The experience was smooth and professional. Highly recommended!",
    rating: 5,
    img: DemoImage,
  },
  {
    name: "David Smith",
    date: "February 20, 2025",
    title: "Good but can improve",
    body: "Service was decent, but I expected better communication.",
    rating: 3,
    img: DemoImage,
  },
  {
    name: "Sophia Brown",
    date: "January 15, 2025",
    title: "Exceeded expectations",
    body: "The project was completed ahead of schedule with great quality.",
    rating: 4,
    img: DemoImage,
  },
  {
    name: "Michael Lee",
    date: "December 10, 2024",
    title: "Not satisfied",
    body: "Had some issues with the delivery timeline. Needs improvement.",
    rating: 2,
    img: DemoImage,
  },
  {
    name: "Riya Sharma",
    date: "April 2, 2025",
    title: "Truly Impressive",
    body: "Very happy with the output. The attention to detail was top-notch.",
    rating: 5,
    img: DemoImage,
  },
  {
    name: "Amit Verma",
    date: "March 22, 2025",
    title: "Great support!",
    body: "The team was always available for changes and queries. Thank you!",
    rating: 4,
    img: DemoImage,
  },
  {
    name: "Neha Kulkarni",
    date: "February 28, 2025",
    title: "Well done",
    body: "Good experience overall, though there was a slight delay in delivery.",
    rating: 3,
    img: DemoImage,
  },
  {
    name: "Arjun Patel",
    date: "January 12, 2025",
    title: "Could be better",
    body: "The design part was good but development had some bugs.",
    rating: 2,
    img: DemoImage,
  },
  {
    name: "Priya Nair",
    date: "December 5, 2024",
    title: "Smooth and Easy",
    body: "Very easy to work with. Everything was done as requested.",
    rating: 5,
    img: DemoImage,
  },
  {
    name: "Rahul Mehta",
    date: "November 17, 2024",
    title: "Professional experience",
    body: "Appreciated the professionalism and fast response times!",
    rating: 4,
    img: DemoImage,
  },
];

const ReviewCard = ({ name, date, title, body, rating, img, onHoverStart, onHoverEnd }) => {
  return (
    <motion.div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      whileHover={{ scale: 1.05 }}
      className="bg-green-100 rounded-xl p-6 shadow-md flex flex-col items-center text-center w-full sm:w-[300px] shrink-0"
    >
      <img src={img} alt={name} className="w-12 h-12 rounded-full mb-3" />
      <div className="text-gray-600 text-sm font-semibold">{name}</div>
      <div className="text-gray-400 text-xs">{date}</div>
      <h3 className="font-semibold text-lg mt-2">{title}</h3>
      <p className="text-gray-500 text-sm">{body}</p>
      <div className="flex justify-center mt-3 space-x-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-500">
            {i < rating ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Reviews = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-10 bg-gray-50 overflow-hidden">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Our Clients’ Satisfaction is Our Top Priority
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mt-2">
          We have a reputation for helping clients around the world find success on their most important projects.
        </p>
      </div>

      <div className="overflow-hidden mt-8">
        <motion.div
          className="flex gap-6 w-max"
          animate={!isPaused ? { x: ["0%", "-50%"] } : false}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
        >
          {[...reviews, ...reviews].map((review, index) => (
            <ReviewCard
              key={index}
              {...review}
              onHoverStart={() => setIsPaused(true)}
              onHoverEnd={() => setIsPaused(false)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
