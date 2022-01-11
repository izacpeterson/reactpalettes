import { useState } from "react";
import { Container, Header, Form, Input } from "semantic-ui-react";

export function Editor(props) {
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#000000");
  const [color3, setColor3] = useState("#000000");
  const [color4, setColor4] = useState("#000000");
  const [color5, setColor5] = useState("#000000");

  return (
    <Container>
      <Header>New Palette</Header>
      <Form>
        <input
          type="color"
          value={color1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setColor1(e.target.value);
          }}
        />
        <input
          type="color"
          value={color2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setColor2(e.target.value);
          }}
        />
        <input
          type="color"
          value={color3}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setColor3(e.target.value);
          }}
        />
        <input
          type="color"
          value={color4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setColor4(e.target.value);
          }}
        />
        <input
          type="color"
          value={color5}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setColor5(e.target.value);
          }}
        />
      </Form>
    </Container>
  );
}
