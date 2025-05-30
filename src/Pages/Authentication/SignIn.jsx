import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import Loader from "../../UI/Loader";

const SignIn = () => {
  const { loading, setLoading, user, signInUser } = useContext(AuthContext);
  const location = useLocation();
  console.log("location in sign in page", location);
  const from = location.state || "/";
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    signInUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log(user.auth?.email);
        navigate(from);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(`${errorCode}`);
        setLoading(false);
      });
    // e.target.reset();
    // setPassword("");
  };
  useEffect(() => {
    document.title = `careerNEST | ${user ? "Log out" : "Sign In"}`;
  }, [user]);
  if (user) {
    return <div>Already Logged In</div>;
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="mx-auto flex items-center justify-center my-10">
      <form
        onSubmit={handleSignUp}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 shadow-2xl"
      >
        <legend className="fieldset-legend text-2xl font-bold text-secondary">
          Sign In
        </legend>
        {/* Email */}
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input w-full"
          placeholder="Email"
          required
        />
        {/* Password */}
        <label className="label">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[50%] -translate-y-[50%] right-3 z-50"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {/* show Error Message from Auth  */}
        <div className="flex gap-2">
          <p>Don't have an account?</p>{" "}
          <Link className="link link-primary" state={from} to="/signUp">
            Sign Up
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary text-white mt-4 w-full"
          //   disabled={!allValid}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
