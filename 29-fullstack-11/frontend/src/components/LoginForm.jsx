import PropTypes from "prop-types";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
function LoginForm({
  handleSubmit,
  inputData,
  setInputData,
  setLoginUserLoading,
}) {
  return (
    <div
      className="border d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Card className="col-md-3 bg-body-tertiary">
        <Card.Body>
          <Card.Title className="text-center mb-5">
            <h4>Login</h4>
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formLoginEmail">
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="email"
                  onChange={(e) =>
                    setInputData({ ...inputData, email: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="3">
                Password
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="password"
                  onChange={(e) =>
                    setInputData({ ...inputData, password: e.target.value })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formSubmitButton">
              <Col sm={{ span: 9, offset: 3 }}>
                <Button variant="primary" type="submit">
                  {setLoginUserLoading ? "Loading..." : "Submit"}
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1" controlId="formSubmitButton">
              <Col sm={{ span: 6 }}>
                <a href="/register">Register</a>
              </Col>
              <Col sm={{ span: 6 }} className="text-end">
                <a href="/forgot-password">Forgot Password</a>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  inputData: PropTypes.object.isRequired,
  setInputData: PropTypes.func.isRequired,
  setLoginUserLoading: PropTypes.bool.isRequired,
};

export default LoginForm;
