import React, { use } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";

const AddJobsPage = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const handleAddJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const rawJobData = Object.fromEntries(formData.entries());
    const { salaryMin, salaryMax, currency, ...rest } = rawJobData;
    const job = {
      salaryRange: {
        min: parseInt(salaryMin),
        max: parseInt(salaryMax),
        currency: currency,
      },
      ...rest,
    };

    job.requirements = job.requirements
      .split(",")
      .map((item) => (typeof item === "string" ? item.trim() : item));

    job.responsibilities = job.responsibilities
      .split(",")
      .map((item) => (item == "string" ? item.trim() : item));
    console.log(Object.keys(job).length, job);

    axios
      .post("http://localhost:3000/jobs", job)
      .then((res) => {
        if (res?.data?.insertedId) {
          toast.success("Job posted successfully");
          // form.reset();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to post job");
      });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="container mx-auto px-4 py-10 bg-base-20 font-poppins"
    >
      <div className="relative p-10 space-y-2 mb-10 rounded-box bg-base-200">
        <h1 className="text-center mb-2 text-3xl text-primary font-semibold">
          Post a New Job
        </h1>
        <p className="text-center opacity-80 mb-8 max-w-[80%] mx-auto">
          Provide job details to list a new opportunity.
        </p>
      </div>

      <form
        onSubmit={handleAddJob}
        className="bg-base-200 rounded-box p-4 space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Job Title</label>
            <input
              name="title"
              type="text"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Company */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Company Name</label>
            <input
              name="company"
              type="text"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Location */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Location</label>
            <input
              name="location"
              type="text"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Job Type */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Job Type</label>
            <input
              name="jobType"
              type="text"
              placeholder="e.g. Hybrid, Remote"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Category */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Category</label>
            <input
              name="category"
              type="text"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Deadline */}
          <div className="fieldset">
            <label className="font-medium text-secondary">
              Application Deadline
            </label>
            <input
              name="applicationDeadline"
              type="date"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Salary Min */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Min Salary</label>
            <input
              name="salaryMin"
              type="number"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Salary Max */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Max Salary</label>
            <input
              name="salaryMax"
              type="number"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* Currency */}
          <div className="fieldset">
            <label className="font-medium text-secondary">Currency</label>
            <select
              name="currency"
              defaultValue="bdt"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            >
              <option value="bdt">BDT (৳)</option>
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
              <option value="inr">INR (₹)</option>
            </select>
          </div>

          {/* HR Name */}
          <div className="fieldset">
            <label className="font-medium text-secondary">HR Name</label>
            <input
              name="hr_name"
              type="text"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>

          {/* HR Email */}
          <div className="fieldset">
            <label className="font-medium text-secondary">HR Email</label>
            <input
              name="hr_email"
              type="email"
              defaultValue={user.email}
              readOnly={true}
              required
              className="input w-full border-primary/40 focus:outline-primary/50 opacity-50"
            />
          </div>

          {/* Logo */}
          <div className="fieldset">
            <label className="font-medium text-secondary">
              Company Logo URL
            </label>
            <input
              name="logo"
              type="url"
              required
              className="input w-full border-primary/40 focus:outline-primary/50"
            />
          </div>
        </div>

        {/* Description */}
        <div className="fieldset">
          <label className="font-medium text-secondary">Job Description</label>
          <textarea
            name="description"
            required
            rows="4"
            className="textarea w-full border-primary/40 focus:outline-primary/50"
          />
        </div>

        {/* Requirements */}
        <div className="fieldset">
          <label className="font-medium text-secondary">Requirements</label>
          <textarea
            name="requirements"
            required
            rows="2"
            placeholder="Comma-separated (e.g. React, Node.js)"
            className="textarea w-full border-primary/40 focus:outline-primary/50"
          />
        </div>

        {/* Responsibilities */}
        <div className="fieldset">
          <label className="font-medium text-secondary">Responsibilities</label>
          <textarea
            name="responsibilities"
            required
            rows="2"
            placeholder="Comma-separated (e.g. Coding, Collaboration)"
            className="textarea w-full border-primary/40 focus:outline-primary/50"
          />
        </div>

        <button type="submit" className="btn btn-primary text-white mt-4">
          Submit Job
        </button>
      </form>
    </motion.div>
  );
};

export default AddJobsPage;
