import React from "react";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  //   console.log(job);
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
  } = job;
  return (
    <div className="card bg-base-200 w-full shadow-sm h-full">
      <div className="card-body">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img
              className="h-12 bg-base-100 p-2 rounded-box"
              src={company_logo}
              alt={company}
            />
            <div>
              <h2 className="card-title text-secondary">{company}</h2>
              <span className="uppercase text-primary opacity-70 font-medium">
                {location}
              </span>
            </div>
          </div>
          <span className="uppercase badge badge-primary text-base-100">
            {category}
          </span>
        </div>

        <p className="opacity-90 text-secondary">{description}</p>
        <div className="card-actions justify-start mt-2">
          {requirements.map((skill, i) => (
            <span
              key={i}
              className="uppercase badge badge-secondary text-base-100 opacity-60"
            >
              {skill}
            </span>
          ))}
          <Link
            to={`/jobs/${_id}`}
            className="btn btn-primary w-full mt-2 text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
