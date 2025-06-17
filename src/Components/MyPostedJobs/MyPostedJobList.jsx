import React, { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SinglePostedJob from "./SinglePostedJob";

const MyPostedJobList = ({ myPostedJobsPromise }) => {
  const initialJobs = use(myPostedJobsPromise);
  const [jobs, setJobs] = useState(initialJobs);
  console.log(jobs);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full table-auto bg-base-100 text-sm">
        <thead className="bg-base-200 text-base-content">
          <tr>
            <th>Company</th>
            <th className="hidden lg:table-cell">Details</th>
            <th className="hidden sm:table-cell text-center">Date</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <motion.tbody
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <AnimatePresence>
            {jobs.map((job, index) => (
              <SinglePostedJob
                key={job._id}
                job={job}
                setJobs={setJobs}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.tbody>
      </table>
    </div>
  );
};

export default MyPostedJobList;
