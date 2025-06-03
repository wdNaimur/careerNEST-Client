import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import Loader from "../../UI/Loader";
import { motion, useInView } from "framer-motion";

const SignUp = () => {
  const { user, loading, setLoading, createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location in sign in page", location);
  const from = location.state || "/";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const passwordRules = [
    {
      test: (pw) => pw.length >= 8,
      message: "Password must be at least 8 characters",
    },
    {
      test: (pw) => /[A-Z]/.test(pw),
      message: "Password must contain an uppercase letter",
    },
    {
      test: (pw) => /[a-z]/.test(pw),
      message: "Password must contain a lowercase letter",
    },
    {
      test: (pw) => /[0-9]/.test(pw),
      message: "Password must contain a number",
    },
    {
      test: (pw) => /[^A-Za-z0-9]/.test(pw),
      message: "Password must contain a special character",
    },
  ];

  const firstUnmetRule = passwordRules.find((rule) => !rule.test(password));
  const allValid = !firstUnmetRule && password === confirmPassword;

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    createUser(email, password)
      .then((result) => {
        setLoading(false);
        toast.success(
          `Welcome ${
            result.user.auth.displayname ? result.user.auth.displayname : "User"
          }`
        );
        navigate(from);
        console.log({ result });
      })
      .catch((error) => {
        toast.error(`${error.code}`);
        setLoading(false);
      });
    // e.target.reset();
    // setPassword("");
    // setConfirmPassword("");
  };
  if (user) {
    return <div>Already Logged In</div>;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto flex items-center justify-center my-10"
    >
      <form
        onSubmit={handleSignUp}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 shadow-2xl"
      >
        <legend className="fieldset-legend text-2xl font-bold text-secondary">
          Sign Up
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
            className="absolute top-[50%] -translate-y-[50%] right-0 z-50 cursor-pointer p-4 text-primary"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        {/* Show first unmet rule */}
        {password && firstUnmetRule && (
          <p className="text-red-500 text-sm mt-1">{firstUnmetRule.message}</p>
        )}

        {/* Confirm Password */}
        <label className="label">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="input w-full"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {confirmPassword && (
          <p
            className={`text-sm mt-1 ${
              password === confirmPassword ? "text-green-600" : "text-red-500"
            }`}
          >
            {password === confirmPassword
              ? " Passwords match"
              : " Passwords do not match"}
          </p>
        )}
        <div className="flex gap-2">
          <p>Already have an account?</p>{" "}
          <Link className="link link-primary" state={from} to="/signIn">
            Sign In
          </Link>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary text-white mt-4 w-full"
          disabled={!allValid}
        >
          Sign Up
        </button>
      </form>
    </motion.div>
  );
};

export default SignUp;
