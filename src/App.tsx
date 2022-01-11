import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Layout from "./views/layout";
import Account from "./views/account";
import SignUp from "./views/signup";
import Home from "./views/home";
import Login from "./views/login";
import { Editor } from "./views/editor";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import firebaseConfig from "./firebase";
import { useEffect, useState } from "react";
const app = initializeApp(firebaseConfig);

function App() {
  const [uid, setUid] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setLoggedin(true);
      } else {
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              loggedin ? (
                <Home loggedin={loggedin} uid={uid} />
              ) : (
                <Button as={Link} to="/account">
                  Create Account or Login
                </Button>
              )
            }
          ></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/new" element={<Editor uid={uid} />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
