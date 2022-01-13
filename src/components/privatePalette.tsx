import { useState } from "react";
import { Checkbox, Container, Header } from "semantic-ui-react";
import Palette from "../myTypes";
import { Color } from "./color";

import { initializeApp } from "firebase/app";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getFirestore, onSnapshot, getDoc } from "firebase/firestore";

import firebaseConfig from "../firebase";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export function PrivatePalette(props) {
  const pal: Palette = props.palette;
  const [isPublic, setIsPublic] = useState(pal.public);
  const colors = pal.colors.map((color) => {
    return <Color key={color} hex={color}></Color>;
  });

  return (
    <div className="paletteSmall">
      <div>
        <h2>{pal.name}</h2>
        <Checkbox checked={isPublic} onClick={handlePublicChange} toggle /> Public
      </div>
      <ul className="colorList">{colors}</ul>
    </div>
  );

  async function getPalettes(callback) {
    const docRef = doc(db, "users", pal.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      console.log("NO DATA");
    }
  }

  function handlePublicChange() {
    getPalettes((data) => {
      const docRef = doc(db, "users", pal.uid);
      data.palettes[props.index].public = !data.palettes[props.index].public;
      updateDoc(docRef, data);
    });

    setIsPublic(!isPublic);

    pal.public = !isPublic;

    if (pal.public) {
      const pubDocRef = doc(db, "public", "palettes");
      setDoc(pubDocRef, { palettes: arrayUnion(pal) }, { merge: true });
    } else if (!pal.public) {
      let tempPal = pal;
      pal.public = true;
      const pubDocRef = doc(db, "public", "palettes");
      updateDoc(pubDocRef, { palettes: arrayRemove(pal) });
    }
  }
}
