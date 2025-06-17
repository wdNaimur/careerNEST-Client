import React from "react";
import { Link } from "react-router";
import { MdOutlineDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SinglePostedJob = ({ job, setJobs, index }) => {
  const {
    _id,
    company_logo,
    company,
    title,
    applicationDeadline,
    description,
    status,
  } = job;
  console.log(job);

  const deleteApplication = () => {
    fetch(`http://localhost:3000/jobs/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          setJobs((prev) => prev.filter((item) => item._id !== _id));
          toast.success("Deleted Successfully");
        }
      })
      .catch(() => toast.error("Failed to Delete"));
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 30, filter: "blur(5px)" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
    >
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
          <Link to={`/jobs/${_id}`} className="link link-primary">
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
    </motion.tr>
  );
};

export default SinglePostedJob;
