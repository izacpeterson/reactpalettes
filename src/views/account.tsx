import React, { ChangeEvent, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button, Container, Form, Header, Menu, MenuItem, Modal } from "semantic-ui-react";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import firebaseConfig from "../firebase";
const app = initializeApp(firebaseConfig);

function Account() {
  const [loggedin, setLoggedin] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedin(true);

        setEmail(user.email || "");
        setDisplayName(user.displayName || "");
      }
    });
  }, []);

  return (
    <Container>
      <Header>My Account</Header>

      <Form>
        <Form.Input label="Email" value={email} />
        <Form.Input label="Display Name" value={displayName} onChange={handleDisplayName} />
        {/* <Form.Button type="submit">Save Changes</Form.Button> */}
        <Modal
          basic
          trigger={<Form.Button color="green">Save Changes</Form.Button>}
          onClose={() => setModalOpen(false)}
          onOpen={() => {
            setModalOpen(true);
          }}
          open={modalOpen}
        >
          <Header>Save Changes?</Header>
          <Modal.Content>Are you sure you want to save these changes?</Modal.Content>
          <Modal.Actions>
            <Button basic color="red" onClick={() => setModalOpen(false)}>
              No
            </Button>
            <Button basic color="green" onClick={update}>
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <Button onClick={signOutUser} color="red">
          Sign Out
        </Button>
      </Form>
      {/* <Button as={Link} to="/signup">
        Sign Up
      </Button> */}
    </Container>
  );
  function handleDisplayName(e: ChangeEvent<HTMLInputElement>) {
    setDisplayName(e.target.value);
  }
  function update() {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: displayName,
    }).then(() => {
      console.log("updated");
      setModalOpen(false);
      window.location.reload();
    });
  }
  function signOutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.location.href = "/";
      })
      .catch((error) => {
        // An error happened.
      });
  }
}

export default Account;
