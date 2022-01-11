import { Button, Container, Header, Icon, Modal } from "semantic-ui-react";
import { Editor } from "./editor";

function Home() {
  return (
    <Container>
      <Header>My Color Palettes</Header>
      <Button color="green">
        <Icon name="add" />
        New Palette
      </Button>
    </Container>
  );
}

export default Home;
