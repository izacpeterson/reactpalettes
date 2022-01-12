import { Button, Container, Header, Icon, Modal } from "semantic-ui-react";
import { Editor } from "./editor";
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

  async function getData() {
    const docRef = doc(db, "users", props.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data().palettes);
      setPalettes(docSnap.data().palettes);
    }
  }

  useEffect(() => {
    getData();
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
