import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

function ProfileForm({
  handleSubmit,
  inputData,
  setInputData,
  updateProfileLoading,
}) {
  return (
    <Container>
      <Row className="mt-3">
        <Card className="border-0">
          <Card.Body>
            <Card.Title>
              <h4>Profile</h4>
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="formName">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="name"
                    value={inputData.name}
                    onChange={(e) =>
                      setInputData({ ...inputData, name: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    type="email"
                    name="email"
                    value={inputData.email}
                    onChange={(e) =>
                      setInputData({ ...inputData, email: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={(e) =>
                      setInputData({ ...inputData, password: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formConfirmPassword"
              >
                <Form.Label column sm="2">
                  Confirm Password
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formSubmitButton"
              >
                <Col sm={{ span: 9, offset: 2 }}>
                  <Button variant="primary" type="submit">
                    {updateProfileLoading ? "Loading ..." : "Submit"}
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  inputData: PropTypes.object.isRequired,
  setInputData: PropTypes.func.isRequired,
  updateProfileLoading: PropTypes.bool.isRequired,
};

export default ProfileForm;
