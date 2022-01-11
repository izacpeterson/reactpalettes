import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/layout";
import Account from "./views/account";
import SignUp from "./views/signup";
import Home from "./views/home";
import Login from "./views/login";
import { Editor } from "./views/editor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/new" element={<Editor />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
