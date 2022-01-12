import { useState } from "react";
import { Checkbox, Container, Header } from "semantic-ui-react";
import Palette from "../myTypes";
import { Color } from "./color";

import { initializeApp } from "firebase/app";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getFirestore, onSnapshot } from "firebase/firestore";

import firebaseConfig from "../firebase";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export function PublicPalette(props) {
  const pal: Palette = props.palette;
  const [isPublic, setIsPublic] = useState(pal.public);
  const colors = pal.colors.map((color) => {
    return <Color key={color} hex={color}></Color>;
  });

  return (
    <div className="palettePublic">
      <div className="userInfo">
        <h2>{pal.name}</h2>
        <h3>{pal.displayname}</h3>
      </div>
      <ul className="colorList">{colors}</ul>
    </div>
  );

  function handlePublicChange() {
    setIsPublic(!isPublic);

    const docRef = doc(db, "users", pal.uid);
    updateDoc(docRef, { palettes: arrayRemove(pal) });

    pal.public = !isPublic;

    updateDoc(docRef, { palettes: arrayUnion(pal) });

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
