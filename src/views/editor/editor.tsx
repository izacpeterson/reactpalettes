import "./editor.css";

import { useState } from "react";
import { Container, Header, Form, Input, Button, Label } from "semantic-ui-react";

import { initializeApp } from "firebase/app";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getFirestore } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import Palette from "../../myTypes";

import firebaseConfig from "../../firebase";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export function Editor(props) {
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#000000");
  const [color3, setColor3] = useState("#000000");
  const [color4, setColor4] = useState("#000000");
  const [color5, setColor5] = useState("#000000");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  return (
    <Container>
      <Header>New Palette</Header>
      <Form onSubmit={save}>
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
          </Form.Field>
        </div>

        <Button color="green">Save</Button>
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
}
