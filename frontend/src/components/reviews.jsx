import { FaStar, FaRegStar } from "react-icons/fa";
import DemoImage from "../assets/demo.png"; // Importing the correct image

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
];

const ReviewCard = ({ name, date, title, body, rating, img }) => {
  return (
    <div className="bg-green-100 rounded-xl p-6 shadow-md flex flex-col items-center text-center w-full sm:w-[300px]">
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
    </div>
  );
};

const Reviews = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Our Clients’ Satisfaction is Our Top Priority
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mt-2">
          We have a reputation for helping clients around the world find success on their most important projects.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
