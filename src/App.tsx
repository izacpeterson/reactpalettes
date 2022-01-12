import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Layout from "./views/layout";
import Account from "./views/account";
import Home from "./views/home";
import { Editor } from "./views/editor";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import firebaseConfig from "./firebase";
import { useEffect, useState } from "react";
import { Access } from "./views/access";
import { Public } from "./views/public";
const app = initializeApp(firebaseConfig);

function App() {
  const [uid, setUid] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setLoggedin(true);
        setDisplayName(user.displayName);
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
                <Button as={Link} to="/access">
                  Create Account or Login
                </Button>
              )
            }
          ></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/access" element={<Access />}></Route>
          <Route path="/public" element={<Public />}></Route>
          <Route path="/new" element={<Editor uid={uid} displayName={displayName} />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
