import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-96 lg:min-h-[600px]"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1560250056-07ba64664864?q=80&w=2051&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-white text-center py-20">
          <motion.div
            initial={{ opacity: 0.8, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="max-w-md -mt-12 lg:-mt-40"
          >
            <h1 className="mb-5 text-5xl font-bold">
              Build Your Future with CareerNest
            </h1>
            <p className="mb-5">
              Discover jobs, connect with employers, and take the next step in
              your career journey.
            </p>
            <button className="btn btn-primary text-white">Get Started</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
