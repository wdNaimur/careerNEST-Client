import React from "react";
import { Link } from "react-router";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import toast from "react-hot-toast";

const SingleApplication = ({ application, setApplications }) => {
  const {
    company_logo,
    company,
    title,
    applicationDeadline,
    description,
    status,
  } = application;
  const deleteApplication = () => {
    fetch(`http://localhost:3000/applications/${application._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          setApplications((prev) =>
            prev.filter((item) => item._id !== application._id)
          );
          toast.success("Deleted Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to Delete");
      });
  };
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-10 h-10">
              <img src={company_logo} alt={company} />
            </div>
          </div>
          <div>
            <div className="font-bold">{company}</div>
            <div className="text-sm opacity-50">{title}</div>
          </div>
        </div>
      </td>
      <td className="hidden lg:table-cell max-w-xs truncate">{description}</td>
      <td className="hidden sm:table-cell text-center whitespace-nowrap">
        <div className="font-bold">{applicationDeadline}</div>
      </td>
      <td className="text-center">
        <span
          className={`inline-flex rounded-md px-2 py-1 text-xs font-medium text-base-200 ${
            status ? "bg-primary" : "bg-secondary"
          }`}
        >
          {status ? "ACTIVE" : "Expired"}
        </span>
      </td>
      <td className="text-center">
        <div className="inline-flex gap-2 items-center">
          <Link to={`/jobs/${application.jobId}`} className="link link-primary">
            view
          </Link>
          <button
            onClick={deleteApplication}
            className="text-2xl text-secondary bg-secondary/10 hover:bg-secondary/20 cursor-pointer p-2 rounded-full"
          >
            <MdOutlineDeleteOutline />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SingleApplication;
