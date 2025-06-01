import React, { Suspense, use } from "react";
import ApplicationStats from "../Components/MyApplications/ApplicationStats";
import ApplicationList from "../Components/MyApplications/ApplicationList";
import LoaderDataFetch from "../UI/LoaderDataFetch";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import { myApplicationsPromise } from "../Api/myApplicationsApi";

const MyApplicationsPage = () => {
  const { user } = use(AuthContext);
  console.log(user.email);
  return (
    <section className="container mx-auto w-full px-4 py-10 space-y-10">
      <ApplicationStats />
      <Suspense fallback={<LoaderDataFetch />}>
        <ApplicationList
          myApplicationsPromise={myApplicationsPromise(user.email)}
        />
      </Suspense>
    </section>
  );
};

export default MyApplicationsPage;
