import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import Loader from "../UI/Loader";

const HomeLayout = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Toaster position="top-center" reverseOrder={false} />
      <nav>
        <Navbar />
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
