import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";

import LoaderDataFetch from "../UI/LoaderDataFetch";
import FeaturedOpportunities from "../Components/FeaturedOpportunities";

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
      <section>
        <Banner />
      </section>
      <section className="my-10 container mx-auto px-4">
        {loading ? <LoaderDataFetch /> : <FeaturedOpportunities jobs={jobs} />}
      </section>
    </>
  );
};

export default HomePage;
