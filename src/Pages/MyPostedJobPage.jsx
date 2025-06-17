import React, { Suspense, use } from "react";
import { motion, useInView } from "framer-motion";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import { myPostedJobsPromise } from "../Api/myPostedJobsApi";
import MyPostedJobList from "../Components/MyPostedJobs/MyPostedJobList";
import LoaderDataFetch from "../UI/LoaderDataFetch";

const MyPostedJobPage = () => {
  const { user } = use(AuthContext);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      className="container mx-auto w-full px-4 py-10"
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Suspense fallback={<LoaderDataFetch />}>
        <MyPostedJobList
          myPostedJobsPromise={myPostedJobsPromise(user.email)}
        />
      </Suspense>
    </motion.div>
  );
};

export default MyPostedJobPage;
