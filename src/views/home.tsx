import { useContext } from "react";
import { Context } from "../contexts/global.context";

import { Button, Container, Header, Icon, Modal } from "semantic-ui-react";
import { Editor } from "./editor/editor";
import { Link, useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, getFirestore, onSnapshot } from "firebase/firestore";

import Palette from "../myTypes";

import { PaletteList } from "../components/paletteList";

import firebaseConfig from "../firebase";
import { useEffect, useState } from "react";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

function Home(props) {
  const [palettes, setPalettes] = useState([]);

  const user = useContext(Context);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
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
      <PaletteList palettes={palettes} private={true}></PaletteList>
    </Container>
  );
}

export default Home;
