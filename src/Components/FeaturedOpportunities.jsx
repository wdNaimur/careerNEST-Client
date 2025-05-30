import React from "react";
import JobCard from "./JobCard";

const FeaturedOpportunities = (jobs) => {
  //   console.log(jobs.jobs);
  const allJobs = jobs.jobs;

  return (
    <div>
      <div>
        <p className="text-center mb-2 text-3xl text-primary font-semibold">
          Featured Opportunities
        </p>
        <p className="text-center opacity-80 mb-8 max-w-[80%] mx-auto">
          Explore the most in-demand roles handpicked for ambitious
          professionals.
        </p>
      </div>
      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 gap-5 justify-center items-center">
        {allJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedOpportunities;
