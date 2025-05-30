import React from "react";
import ApplicationStats from "../Components/MyApplications/ApplicationStats";
import ApplicationList from "../Components/MyApplications/ApplicationList";

const MyApplicationsPage = () => {
  return (
    <section className="container mx-auto px-4 py-10 space-y-10">
      <ApplicationStats />
      <ApplicationList />
    </section>
  );
};

export default MyApplicationsPage;
