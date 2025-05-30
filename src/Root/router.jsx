import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import HomePage from "../Pages/HomePage";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import JobDetails from "../Pages/JobDetails/JobDetails";
import Loader from "../UI/Loader";
import JobApply from "../Components/JobApply";
import PrivateRoute from "../Routes/PrivateRoute";

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
        element: <JobDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/jobs/${params.id}`),
        hydrateFallbackElement: <Loader />,
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApply />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
