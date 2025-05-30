import React from "react";
import { motion } from "framer-motion";
import "./Loader.css";

const letters = ["L", "O", "A", "D", "I", "N", "G"];

const LoaderDataFetch = () => {
  return (
    <div className="loader-data-fetch-container bg-base-100">
      <div className="loader-text">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="loader-letter"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.2,
              duration: 0.4,
              ease: "easeInOut",
              type: "spring",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default LoaderDataFetch;
