import { Card, Container, Row } from "react-bootstrap";
import Menu from "./Menu.jsx";

function Home() {
  return (
    <>
      <Menu />
      <Container>
        <Row className="mt-3">
          <Card className="border-0">
            <Card.Body>
              <Card.Title>Home Page</Card.Title>
              <Card.Text>
                This is a simple hero unit, a simple jumbotron-style component
                for calling extra attention to featured content or information.
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default Home;
