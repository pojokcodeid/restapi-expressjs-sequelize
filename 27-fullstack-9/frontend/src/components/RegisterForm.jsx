import { FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

function RegisterForm({
  handleSubmit,
  inputData,
  setInputData,
  setRegisterUserLoading,
}) {
  return (
    <div
      className="border d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Card className="col-md-4 bg-body-tertiary">
        <Card.Body>
          <Card.Title className="text-center mb-5">
            <h4>Register</h4>
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formName">
              <Form.Label column sm="3">
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setInputData({ ...inputData, name: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formEmail">
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setInputData({ ...inputData, email: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPassword">
              <Form.Label column sm="3">
                Password
              </Form.Label>
              <Col sm="9">
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
              <Form.Label column sm="3">
                Confirm Password
              </Form.Label>
              <Col sm="9">
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

            <Form.Group as={Row} className="mb-3" controlId="formSubmitButton">
              <Col sm={{ span: 9, offset: 3 }}>
                <Button variant="primary" type="submit">
                  {setRegisterUserLoading ? "Loading ..." : "Submit"}
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1" controlId="formSubmitButton">
              <Col sm={{ span: 12 }}>
                <FormLabel>
                  <a href="/login">Login</a>
                </FormLabel>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  inputData: PropTypes.object.isRequired,
  setInputData: PropTypes.func.isRequired,
  setRegisterUserLoading: PropTypes.bool.isRequired,
};

export default RegisterForm;
