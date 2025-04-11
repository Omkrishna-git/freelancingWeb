import React from "react";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
  return (
    <div className="p-6 bg-white text-black min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-6">Welcome Employer !!</h1>

      {/* What you'll get */}
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">What you’ll get</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-center">
          <div>
            <img
              src="/assets/star.png"
              alt="icon"
              className="mx-auto w-6 h-6 mb-2"
            />
            <p className="font-semibold">Discover Quality Talent</p>
            <p>Get introduced to talented individuals across the globe.</p>
          </div>
          <div>
            <img
              src="/assets/payment.png"
              alt="icon"
              className="mx-auto w-6 h-6 mb-2"
            />
            <p className="font-semibold">Choice of Payment Mode</p>
            <p>Choose your own convenient mode of payment.</p>
          </div>
          <div>
            <img
              src="/assets/connect.png"
              alt="icon"
              className="mx-auto w-6 h-6 mb-2"
            />
            <p className="font-semibold">Establish Connect</p>
            <p>Get personalized connect with the freelancers.</p>
          </div>
          <div>
            <img
              src="/assets/suggestion.png"
              alt="icon"
              className="mx-auto w-6 h-6 mb-2"
            />
            <p className="font-semibold">Suggestions</p>
            <p>Get to know the reviews of freelancers over the kind of work.</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-10 border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-4 gap-4 text-center text-sm font-medium">
          {[
            "HTML",
            "Java",
            "Angular JS",
            "Machine Learning",
            "JavaScript",
            "React JS",
            "App Dev",
            "Computer Vision",
          ].map((item) => (
            <div key={item} className="py-2 bg-gray-100 rounded">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Jobs */}
      <div className="mt-10 border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 bg-green-50 p-4 rounded shadow">
            <img src="/assets/job.png" alt="job" className="w-12 h-12" />
            <div>
              <p className="font-semibold">Post your job request</p>
              <p className="text-sm">
                Post the job details to hire freelancers and get connected to
                the talent.
              </p>
              <Link to="/post-project">
                <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded">
                  Post a job
                </button>
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-green-50 p-4 rounded shadow">
            <img src="/assets/buy.png" alt="buy" className="w-12 h-12" />
            <div>
              <p className="font-semibold">Buy a Project</p>
              <p className="text-sm">
                Surf through all the projects and buy a ready-to-use project.
              </p>
              <Link to="/buy-project">
                <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded">
                  Buy a project
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Freelancer Connect */}
      <div className="mt-10 border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">Freelancer Connect</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="bg-gray-100 p-4 rounded shadow text-center">
            <img
              src="/assets/blogs.png"
              className="mx-auto w-8 h-8 mb-2"
              alt="Blogs"
            />
            <p className="font-semibold">Blogs</p>
            <p className="mb-2">
              View the project documentation for past volunteers.
            </p>
            <button className="bg-green-600 text-white px-4 py-1 rounded">
              View Blogs
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow text-center">
            <img
              src="/assets/connect-users.png"
              className="mx-auto w-8 h-8 mb-2"
              alt="Connect"
            />
            <p className="font-semibold">Connect with Freelancers</p>
            <p className="mb-2">
              Build a community of freelancers suggesting for improvisation in
              the project.
            </p>
            <button className="bg-green-600 text-white px-4 py-1 rounded">
              Suggestions
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow text-center">
            <img
              src="/assets/review.png"
              className="mx-auto w-8 h-8 mb-2"
              alt="Review"
            />
            <p className="font-semibold">Post a Review</p>
            <p className="mb-2">
              Write a review about the freelancers you worked with.
            </p>
            <button className="bg-green-600 text-white px-4 py-1 rounded">
              Post Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
