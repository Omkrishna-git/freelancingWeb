import React from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaMoneyBillWave,
  FaUserFriends,
  FaCommentDots,
  FaBriefcase,
  FaHandshake,
  FaBlogger,
  FaUsers,
  FaRegStar,
  FaHtml5,
  FaJava,
  FaAngular,
  FaRobot,
  FaJsSquare,
  FaReact,
  FaMobileAlt,
  FaPython,
  FaDatabase,
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiPostgresql } from "react-icons/si";
import { motion } from "framer-motion";
import DemoImage from "../assets/demo.png";

const freelancers = [
  {
    name: "Gabriel Courtemanche",
    title: "SEO and digital marketing Expert. Google Certified PPC Consultant",
    expertise: ["Node JS", "React JS", "Next JS", "Postgress", "Networks"],
    company: "Shopify",
    img: DemoImage,
  },
  {
    name: "Justin Michela",
    title: "SEO and digital marketing Expert. Google Certified PPC Consultant",
    expertise: ["Node JS", "React JS", "Next JS", "Postgress", "Networks"],
    company: "Shopify",
    img: DemoImage,
  },
  {
    name: "Gabriel Courtemanche",
    title: "SEO and digital marketing Expert. Google Certified PPC Consultant",
    expertise: ["Node JS", "React JS", "Next JS", "Postgress", "Networks"],
    company: "Shopify",
    img: DemoImage,
  },
];
// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      ease: "easeInOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 1 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Category Data
const categoryData = [
  { name: "HTML", icon: <FaHtml5 className="text-green-700 w-6 h-6" /> },
  { name: "Java", icon: <FaJava className="text-green-700 w-6 h-6" /> },
  {
    name: "Angular JS",
    icon: <FaAngular className="text-green-700 w-6 h-6" />,
  },
  {
    name: "Machine Learning",
    icon: <FaRobot className="text-green-700 w-6 h-6" />,
  },
  {
    name: "JavaScript",
    icon: <FaJsSquare className="text-green-700 w-6 h-6" />,
  },
  { name: "React JS", icon: <FaReact className="text-green-700 w-6 h-6" /> },
  { name: "App Dev", icon: <FaMobileAlt className="text-green-700 w-6 h-6" /> },
  { name: "Python", icon: <FaPython className="text-green-700 w-6 h-6" /> },
  { name: "Next JS", icon: <SiNextdotjs className="text-green-700 w-6 h-6" /> },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-green-700 w-6 h-6" />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="text-green-700 w-6 h-6" />,
  },
  { name: "Database", icon: <FaDatabase className="text-green-700 w-6 h-6" /> },
];

const CompanyDashboard = () => {
  return (
    <div className="bg-white text-black min-h-screen font-poppins px-4">
      <div className="max-w-6xl mx-auto py-6">
        <h1 className="text-5xl font-semibold mt-5 mb-10 text-center">
          Welcome Employer !!
        </h1>

        {/* What you'll get */}
        <div className="mt-12 px-6 py-10 bg-green-50 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-[#365649] text-center mb-10">
            What you will get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="flex flex-col items-center px-4">
              <FaStar className="w-10 h-10 text-green-700 mb-4" />
              <p className="text-xl font-semibold mb-2">
                Discover Quality Talent
              </p>
              <p className="text-gray-700">
                Get introduced to talented individuals across the globe
              </p>
            </div>
            <div className="flex flex-col items-center px-4">
              <FaMoneyBillWave className="w-10 h-10 text-green-700 mb-4" />
              <p className="text-xl font-semibold mb-2">
                Flexible Payment Options
              </p>
              <p className="text-gray-700">
                Choose your own convenient mode of payment.
              </p>
            </div>
            <div className="flex flex-col items-center px-4">
              <FaUserFriends className="w-10 h-10 text-green-700 mb-4" />
              <p className="text-xl font-semibold mb-2">
                Personalized Collaboration
              </p>
              <p className="text-gray-700">
                Get personalized connect with the freelancers.
              </p>
            </div>
            <div className="flex flex-col items-center px-4">
              <FaCommentDots className="w-10 h-10 text-green-700 mb-4" />
              <p className="text-xl font-semibold mb-2">Insightful Feedback</p>
              <p className="text-gray-700">
                Get to know the reviews of freelancers over the kind of work.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-20">
          <h2 className="text-3xl text-center mt-10 font-semibold mb-10">
            Categories
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm font-medium"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {categoryData.map(({ name, icon }) => (
              <motion.div
                key={name}
                className="py-4 px-2 bg-green-50 rounded shadow hover:-translate-y-1 transition-transform duration-200"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-2">{icon}</div>
                <p className="text-green-800 font-semibold">{name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Jobs */}
        <div className="mt-20 mb-20">
          <h2 className="text-3xl text-center font-semibold mb-20">Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="bg-green-50 p-6 rounded shadow text-center flex flex-col items-center">
              <FaBriefcase className="w-12 h-12 text-green-700 mb-3" />
              <p className="font-semibold mb-1">Post your job request</p>
              <p className="text-sm mb-4">
                Post the job details to hire freelancers and get connected to
                the talent.
              </p>
              <Link to="/post-project">
                <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                  Post a job 
                </button>
              </Link>
            </div>
            <div className="bg-green-50 p-6 rounded shadow text-center flex flex-col items-center">
              <FaHandshake className="w-12 h-12 text-green-700 mb-3" />
              <p className="font-semibold mb-1">Buy a Project</p>
              <p className="text-sm mb-4">
                Surf through all the projects and buy a ready-to-use project.
              </p>
              <Link to="/buy-project">
                <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                  Buy a project
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-30 flex flex-col items-center">
          <h2 className="text-3xl text-center font-semibold mb-6">
            My Projects Updates
          </h2>

          <button className="mt-4 bg-green-100 text-center hover:bg-green-200 text-green-700 font-semibold px-6 py-2 rounded-xl shadow-md transition duration-200">
            Accepted By Freelancer
          </button>

          <div className="mt-8 grid grid-cols-3 gap-6 justify-items-center px-4">
            {freelancers.map((freelancer, index) => (
              <div
                key={index}
                className="bg-green-100 p-6 rounded-lg shadow-md text-center"
              >
                <img
                  src={freelancer.img}
                  alt={freelancer.name}
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <h3 className="mt-4 text-lg font-semibold">
                  {freelancer.name}
                </h3>
                <p className="text-sm text-[#3e704c]">{freelancer.title}</p>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {freelancer.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-[#aec6bb] text-[#215f40] text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-[#1c3f2f]">
                    Previously at
                  </h4>
                  <p className="text-gray-900 font-semibold">
                    {freelancer.company}
                  </p>
                </div>
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full shadow-md transition duration-200">
                  Connect with Discord
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Freelancer Connect */}
        <div className="mt-30">
          {/* <h2 className="text-3xl text-center font-semibold mb-15">
            Freelancer Connect
          </h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm mb-20">
            <div className="bg-green-50 p-6 rounded shadow text-center hover:-translate-y-1 transition-transform duration-200">
              <FaBlogger className="mx-auto w-10 h-10 mb-3 text-green-600" />
              <p className="font-semibold mb-1">Blogs</p>
              <p className="mb-7">
                View the project documentation for past volunteers.
              </p>
              <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                View Blogs
              </button>
            </div>
            <div className="bg-green-50 p-6 rounded shadow text-center hover:-translate-y-1 transition-transform duration-200">
              <FaUsers className="mx-auto w-10 h-10 mb-3 text-green-600" />
              <p className="font-semibold mb-1">Connect with Freelancers</p>
              <p className="mb-7">
                Build a community of freelancers suggesting for improvisation in
                the project.
              </p>
              <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                Suggestions
              </button>
            </div>
            <div className="bg-green-50 p-6 rounded shadow text-center hover:-translate-y-1 transition-transform duration-400">
              <FaRegStar className="mx-auto w-10 h-10 mb-3 text-green-600" />
              <p className="font-semibold mb-1">Post a Review</p>
              <p className="mb-7">
                Write a review about the freelancers you worked with.
              </p>
              <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                Post Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
