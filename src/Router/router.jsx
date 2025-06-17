import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import HomePage from "../Pages/HomePage";
import SignUp from "../Pages/Authentication/SignUp";
import SignIn from "../Pages/Authentication/SignIn";
import JobDetailsPage from "../Pages/JobDetailsPage";
import Loader from "../UI/Loader";
import PrivateRoute from "./PrivateRoute";
import JobApplyPage from "../Pages/JobApplyPage";
import MyApplicationsPage from "../Pages/MyApplicationsPage";
import AddJobsPage from "../Pages/AddJobsPage";
import MyPostedJobPage from "../Pages/MyPostedJobPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetailsPage />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/jobs/${params.id}`),
        hydrateFallbackElement: <Loader />,
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApplyPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/myApplications",
        element: (
          <PrivateRoute>
            <MyApplicationsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/addJobs",
        element: (
          <PrivateRoute>
            <AddJobsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/myPostedJobs",
        element: (
          <PrivateRoute>
            <MyPostedJobPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
