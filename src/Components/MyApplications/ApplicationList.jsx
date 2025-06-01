import React, { use, useState } from "react";
import SIngleApplication from "./SIngleApplication";

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
        <tbody>
          {applications.map((application) => (
            <SIngleApplication
              key={application._id}
              application={application}
              setApplications={setApplications}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationList;
