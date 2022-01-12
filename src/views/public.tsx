import { Container, Header } from "semantic-ui-react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PaletteList } from "../components/paletteList";

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export function Public() {
  const [palettes, setPalettes] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "public", "palettes"), (doc) => {
      console.log(doc.data());
      setPalettes(doc.data().palettes);
    });
  }, []);

  return (
    <Container>
      <Header>Public</Header>
      <PaletteList palettes={palettes}></PaletteList>
    </Container>
  );
}
