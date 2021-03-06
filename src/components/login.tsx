import React, { ChangeEvent, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Form, Header, Menu, MenuItem, Segment, Grid, Button, Divider } from "semantic-ui-react";

import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeApp(firebaseConfig);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Header>Login</Header>
      <Form onSubmit={submit}>
        <Form.Input type="email" label="Email" placeholder="Email" onChange={handleEmail} value={email}></Form.Input>
        <Form.Input type="password" label="Password" placeholder="Password" onChange={handlePassword} value={password}></Form.Input>
        <Form.Button color="green">Login</Form.Button>
      </Form>
    </Container>
  );

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function submit(e: React.SyntheticEvent) {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

export default Login;
