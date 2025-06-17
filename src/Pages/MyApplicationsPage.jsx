import React, { Suspense, use } from "react";
import { motion, useInView } from "framer-motion";
import ApplicationStats from "../Components/MyApplications/ApplicationStats";
import ApplicationList from "../Components/MyApplications/ApplicationList";
import LoaderDataFetch from "../UI/LoaderDataFetch";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import { myApplicationsPromise } from "../Api/myApplicationsApi";

const MyApplicationsPage = () => {
  const { user } = use(AuthContext);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  console.log(user.email);
  return (
    <motion.section
      ref={ref}
      className="container mx-auto w-full px-4 py-10 space-y-10"
      initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <ApplicationStats />
      <Suspense fallback={<LoaderDataFetch />}>
        <ApplicationList
          myApplicationsPromise={myApplicationsPromise(user.email)}
        />
      </Suspense>
    </motion.section>
  );
};

export default MyApplicationsPage;
