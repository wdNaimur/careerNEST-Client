import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import { use } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

const JobApplyPage = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const application = Object.fromEntries(formData.entries());
    application.jobId = id;
    application.userEmail = user.email;
    console.log(application);
    toast.success("Job Applied Successfully");
    axios
      .post("http://localhost:3000/applications", application)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0.8, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="container mx-auto px-4 py-10 bg-base-20 font-poppins"
    >
      <div className="relative p-10 space-y-2 mb-10 rounded-box bg-base-200">
        <h1 className="text-center mb-2 text-3xl text-primary font-semibold">
          Apply for Job
        </h1>
        <p className="text-center opacity-80 mb-8 max-w-[80%] mx-auto">
          Fill in your details to apply for the job and stand out!
        </p>
        <Link
          to={`http://localhost:5173/jobs/${id}`}
          className="link link-primary absolute bottom-3 right-5"
        >
          View Job Details
        </Link>
      </div>

      <form
        onSubmit={handleApply}
        className="bg-base-200 rounded-box p-4 space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Full Name</label>
            <input
              name="applicantName"
              type="text"
              required
              placeholder="Enter your name"
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Phone Number */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Phone Number</label>
            <input
              name="phone"
              type="tel"
              required
              placeholder="Enter your phone number"
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* LinkedIn */}
          <div className="fieldset">
            <label className="font-medium text-secondary">
              LinkedIn Profile
            </label>
            <input
              name="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/yourname"
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Resume Link */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Resume URL</label>
            <input
              name="resume"
              type="url"
              required
              placeholder="Link to your resume (Google Drive, etc.)"
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Cover Letter */}
          <div className="fieldset col-span-full">
            <label className="font-medium text-secondary">Cover Letter</label>
            <textarea
              name="coverLetter"
              required
              placeholder="Write a short cover letter"
              className="textarea w-full border-primary/40 focus:outline-primary/50"
              rows={4}
            ></textarea>
          </div>

          {/* Email */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Your Email</label>
            <input
              name="userEmail"
              type="email"
              readOnly
              value={user?.email}
              className="input w-full border-primary/40 opacity-60 bg-base-100"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary text-white mt-4">
          Submit Application
        </button>
      </form>
    </motion.div>
  );
};

export default JobApplyPage;
