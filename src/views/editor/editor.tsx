import "./editor.css";

import { useEffect, useState } from "react";
import { Container, Header, Form, Input, Button, Label, Icon } from "semantic-ui-react";

import { initializeApp } from "firebase/app";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getFirestore } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import Palette from "../../myTypes";

import firebaseConfig from "../../firebase";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export function Editor(props) {
  const [color1, setColor1] = useState(randomColor());
  const [color2, setColor2] = useState(randomColor());
  const [color3, setColor3] = useState(randomColor());
  const [color4, setColor4] = useState(randomColor());
  const [color5, setColor5] = useState(randomColor());
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    titleGen();
  }, []);

  return (
    <Container>
      <Header>New Palette</Header>
      <Form>
        <Form.Field>
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          ></Input>
        </Form.Field>
        <div className="colorFieldList">
          <Form.Field className="colorField">
            <Label>Color 1</Label>
            <div style={{ background: color1 }}>
              <input
                type="color"
                value={color1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setColor1(e.target.value);
                }}
              />
            </div>
            <Input
              value={color1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setColor1(e.target.value);
              }}
            />
            <Button onClick={() => setColor1(randomColor())}>
              <Icon name="random" />
            </Button>
          </Form.Field>
          <Form.Field className="colorField">
            <Label>Color 2</Label>
            <div style={{ background: color2 }}>
              <input
                type="color"
                value={color2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setColor2(e.target.value);
                }}
              />
            </div>
            <Input
              value={color2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setColor2(e.target.value);
              }}
            />
            <Button onClick={() => setColor2(randomColor())}>
              <Icon name="random" />
            </Button>
          </Form.Field>
          <Form.Field className="colorField">
            <Label>Color 3</Label>
            <div style={{ background: color3 }}>
              <input
                type="color"
                value={color3}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setColor3(e.target.value);
                }}
              />
            </div>
            <Input
              value={color3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setColor3(e.target.value);
              }}
            />
            <Button onClick={() => setColor3(randomColor())}>
              <Icon name="random" />
            </Button>
          </Form.Field>
          <Form.Field className="colorField">
            <Label>Color 4</Label>
            <div style={{ background: color4 }}>
              <input
                type="color"
                value={color4}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setColor4(e.target.value);
                }}
              />
            </div>
            <Input
              value={color4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setColor4(e.target.value);
              }}
            />
            <Button onClick={() => setColor4(randomColor())}>
              <Icon name="random" />
            </Button>
          </Form.Field>
          <Form.Field className="colorField">
            <Label>Color 5</Label>
            <div style={{ background: color5 }}>
              <input
                type="color"
                value={color5}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setColor5(e.target.value);
                }}
              />
            </div>
            <Input
              value={color5}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setColor5(e.target.value);
              }}
            />
            <Button onClick={() => setColor5(randomColor())}>
              <Icon name="random" />
            </Button>
          </Form.Field>
        </div>

        <Button color="green" onClick={save}>
          Save
        </Button>
      </Form>
    </Container>
  );
  function save() {
    const newPalette: Palette = {
      name: name,
      colors: [color1, color2, color3, color4, color5],
      public: false,
      uid: props.uid,
      displayname: props.displayName,
    };
    console.log(newPalette, props.uid);

    const docRef = doc(db, "users", props.uid);
    setDoc(docRef, { palettes: arrayUnion(newPalette) }, { merge: true }).then(() => {
      navigate("/");
    });
  }
  function randomColor() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  async function titleGen() {
    const nouns = ["Strawberry", "Apple", "Raspberry"];

    const nounAPI = "https://api.datamuse.com/words?max=100&rel_jjb=";
    const adjAPI = "https://api.datamuse.com/words?max=100&rel_jja=";

    let rawData = await fetch(nounAPI + nouns[Math.floor(Math.random() * nouns.length)]);
    let jsonData = await rawData.json();

    let adjective = jsonData[Math.floor(Math.random() * jsonData.length)];

    console.log(adjective);

    let newRawData = await fetch(adjAPI + adjective.word);
    let newJsonData = await newRawData.json();

    let noun = newJsonData[Math.floor(Math.random() * newJsonData.length)];

    setName(adjective.word + " " + noun.word);
  }
}
