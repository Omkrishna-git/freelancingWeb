import React from "react";
import DemoImage from "../assets/demo.png"; 
 
const freelancers = [
  {
    name: "Gabriel Courtemanche",
    title: "SEO and digital marketing Expert. Google Certified PPC Consultant",
    expertise: ["Node JS", "Node JS", "Node JS", "Node JS", "Node JS"],
    company: "Google",
    img: DemoImage,
  },
  {
    name: "Justin Michela",
    title: "SEO and digital marketing Expert. Google Certified PPC Consultant",
    expertise: ["Node JS", "Node JS", "Node JS", "Node JS", "Node JS"],
    company: "Shopify",
    img: DemoImage,
  },
  {
    name: "Gabriel Courtemanche",
    title: "SEO and digital marketing Expert. Google Certified PPC Consultant",
    expertise: ["Node JS", "Node JS", "Node JS", "Node JS", "Node JS"],
    company: "ExxonMobil",
    img: DemoImage,
  },
  {
    name: "Gabriel Courtemanche",
    title: "SEO and digital marketing Expert. Google Certified PPC Consultant",
    expertise: ["Node JS", "Node JS", "Node JS", "Node JS", "Node JS"],
    company: "Shopify",
    img: DemoImage,
  },
];

const Freelancers = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-900">Expert freelancers</h2>
        <p className="text-gray-600">Search and contact freelancers directly with no obligation</p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {freelancers.map((freelancer, index) => (
          <div key={index} className="bg-green-100 p-6 rounded-lg shadow-md text-center">
            <img src={freelancer.img} alt={freelancer.name} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="mt-4 text-lg font-semibold">{freelancer.name}</h3>
            <p className="text-sm text-gray-600">{freelancer.title}</p>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700">Expertise</h4>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {freelancer.expertise.map((skill, idx) => (
                  <span key={idx} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700">Previously at</h4>
              <p className="text-gray-900 font-semibold">{freelancer.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Freelancers;
