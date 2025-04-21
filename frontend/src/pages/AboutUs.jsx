import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

// Local image imports
import DhanvantariImg from "../assets/demo.png";
import RutujaImg from "../assets/demo.png";
import RevatiImg from "../assets/demo.png";
import OmImg from "../assets/demo.png";

const teamMembers = [
  {
    name: "Revati Ranade",
    roll: "Roll No: 31163",
    img: RevatiImg,
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "revati@example.com",
    },
  },
  {
    name: "Dhanvantari Pawar",
    roll: "Roll No: 31160",
    img: DhanvantariImg,
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "#",
    },
  },
  {
    name: "Rutuja Uplenchwar",
    roll: "Roll No: 31161",
    img: RutujaImg,
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "r#",
    },
  },
  {
    name: "Onkar Patil",
    roll: "Roll No: 31157",
    img: OmImg,
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "#",
    },
  },
];

const AboutUs = () => {
  return (
    <div className="bg-white py-12 px-6 text-gray-800 mb-20">
      <h2 className="text-3xl font-bold text-center mb-13 text-green-600">Meet the Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition text-center"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-lg object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-green-700">{member.name}</h3>
            <p className="text-sm mt-1 text-gray-600">{member.roll}</p>
            <div className="flex justify-center space-x-4 mt-3 text-green-600 text-lg">
              {member.socials.instagram && (
                <a href={member.socials.instagram} target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>
              )}
              {member.socials.twitter && (
                <a href={member.socials.twitter} target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
              )}
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>
              )}
              {member.socials.github && (
                <a href={member.socials.github} target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
              )}
              {member.socials.email && (
                <a href={`mailto:${member.socials.email}`}>
                  <FaEnvelope />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
