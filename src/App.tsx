import React from "react";

import { useContext } from "react";
import { Context } from "./contexts/global.context";

import "./App.css";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import Layout from "./views/layout";
import Account from "./views/account";
import Home from "./views/home";
import { Editor } from "./views/editor/editor";
import { Access } from "./views/access";
import { Public } from "./views/public";

function App() {
  const user = useContext(Context);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              user.loggedIn ? (
                <Home />
              ) : (
                // <Button as={Link} to="/access">
                //   Create Account or Login
                // </Button>
                <Public />
              )
            }
          ></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/access" element={<Access />}></Route>
          <Route path="/public" element={<Public />}></Route>
          <Route path="/new" element={<Editor uid={user.uid} displayName={user.displayName} />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
