import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config.js";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  //create User with Email and Password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //Sign in user with email and password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //logout
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  // User exist or not check
  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const userData = { email: currentUser.email };
        axios
          .post("http://localhost:3000/jwt", userData)
          .then((res) => {
            console.log("token after JWT", res.data);
            const token = res.data.token;
            localStorage.setItem("token", token);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setLoading(false);
    });
    return () => {
      checkUser();
    };
  }, []);
  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signInUser,
    signOutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
