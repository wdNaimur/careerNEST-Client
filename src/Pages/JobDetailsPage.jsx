import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import { motion, useInView } from "framer-motion";

const JobDetailsPage = () => {
  const data = useLoaderData();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const {
    _id,
    company_logo,
    company,
    title,
    category,
    description,
    hr_email,
    hr_name,
    jobType,
    location,
    status,
    requirements,
  } = data;
  useEffect(() => {
    document.title = `careerNEST | ${title}`;
  }, [title]);
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
      className="container mx-auto px-4"
    >
      <div className=" px-8 py-10 bg-base-200 shadow-xl rounded-2xl mt-10 space-y-6 text-secondary">
        {/* Header Section */}
        <div className="flex items-center gap-6 border-b-2 border-dashed border-primary/40 pb-6">
          <img
            src={company_logo}
            alt={company}
            className="w-20 h-20 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg opacity-60">
              {company} • {location}
            </p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm rounded-full uppercase font-semibold
            ${
              status === "active"
                ? "text-green-100 bg-green-800"
                : "text-red-100 bg-red-800"
            }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Job Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold"> Job Description</h2>
            <p className=" leading-relaxed opacity-80">{description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold"> Requirements</h2>
            <ul className="list-disc list-inside space-y-1 opacity-80">
              {requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-semibold "> Category</h3>
              <p className="">{category}</p>
            </div>
            <div>
              <h3 className="font-semibold "> Job Type</h3>
              <p className="">{jobType}</p>
            </div>
            <div>
              <h3 className="font-semibold "> Location</h3>
              <p className="">{location}</p>
            </div>
            <div>
              <h3 className="font-semibold "> HR Contact</h3>
              <p>
                {hr_name} ({hr_email})
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="pt-6 border-t-2 border-dashed border-primary/40 flex justify-end">
          <Link
            to={`/jobApply/${_id}`}
            className="btn-primary btn text-white font-semibold px-6 py-3 rounded-lg shadow transition"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetailsPage;
