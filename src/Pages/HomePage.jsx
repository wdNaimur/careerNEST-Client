import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Banner from "../Components/Home/Banner";
import LoaderDataFetch from "../UI/LoaderDataFetch";
import FeaturedOpportunities from "../Components/Home/FeaturedOpportunities";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.title = "careerNEST | Home";
  }, []);

  return (
    <>
      {/* iOS-style blur animation container */}
      <motion.section
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Banner />
      </motion.section>

      <section className="my-10 container mx-auto px-4">
        {loading ? <LoaderDataFetch /> : <FeaturedOpportunities jobs={jobs} />}
      </section>
    </>
  );
};

export default HomePage;
