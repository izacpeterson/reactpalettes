import { Button, Container, Header, Icon, Modal } from "semantic-ui-react";
import { Editor } from "./editor";
import { Link, useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getFirestore, onSnapshot } from "firebase/firestore";

import Palette from "../myTypes";

import { PaletteList } from "../components/paletteList";

import firebaseConfig from "../firebase";
import { useEffect, useState } from "react";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

function Home(props) {
  const [palettes, setPalettes] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", props.uid), (doc) => {
      console.log("Current data: ", doc.data().palettes);
      setPalettes(doc.data().palettes);
    });
  }, []);

  return (
    <Container>
      <Header>My Color Palettes</Header>
      <Button color="green" as={Link} to="/new">
        <Icon name="add" />
        New Palette
      </Button>
      <PaletteList palettes={palettes}></PaletteList>
    </Container>
  );
}

export default Home;
