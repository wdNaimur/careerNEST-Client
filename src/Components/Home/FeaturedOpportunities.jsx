import React from "react";
import { motion, useInView } from "framer-motion";
import JobCard from "./JobCard";

const JobCardAnimated = ({ job }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

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
    >
      <JobCard job={job} />
    </motion.div>
  );
};

const FeaturedOpportunities = ({ jobs }) => {
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
        {jobs.map((job) => (
          <JobCardAnimated key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedOpportunities;
