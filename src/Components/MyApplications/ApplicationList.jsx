import React, { use, useState } from "react";
import SingleApplication from "./SingleApplication";
import { motion, AnimatePresence } from "framer-motion";

const ApplicationList = ({ myApplicationsPromise }) => {
  const initialApplications = use(myApplicationsPromise);
  const [applications, setApplications] = useState(initialApplications);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full table-auto bg-base-200 text-sm">
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
                staggerChildren: 0.1, // Delay between rows
              },
            },
          }}
        >
          <AnimatePresence>
            {applications.map((application, index) => (
              <SingleApplication
                key={application._id}
                application={application}
                setApplications={setApplications}
                index={index} // Pass index for delay
              />
            ))}
          </AnimatePresence>
        </motion.tbody>
      </table>
    </div>
  );
};

export default ApplicationList;
