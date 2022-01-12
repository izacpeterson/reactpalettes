import { Container, Segment, Grid, Divider } from "semantic-ui-react";
import SignUp from "../components/signup";
import Login from "../components/login";

export function Access() {
  return (
    <Container>
      <Segment>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Login></Login>
          </Grid.Column>
          <Grid.Column>
            <SignUp></SignUp>
          </Grid.Column>
        </Grid>

        <Divider vertical>OR</Divider>
      </Segment>
    </Container>
  );
}
