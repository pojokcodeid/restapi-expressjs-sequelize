import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function ForgotPasswordForm({
  handleSubmit,
  inputData,
  setInputData,
  forgotPasswordLoading,
}) {
  return (
    <div
      className="border d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Card className="col-md-3 bg-body-tertiary">
        <Card.Body>
          <Card.Title className="text-center mb-5">
            <h4>Forgot Password</h4>
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
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
            <Form.Group as={Row} className="mb-3" controlId="formSubmitButton">
              <Col sm={{ span: 9, offset: 3 }}>
                <Button variant="primary" type="submit">
                  {forgotPasswordLoading ? "Loading..." : "Submit"}
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1" controlId="formSubmitButton">
              <Col sm={{ span: 6 }}>
                <a href="/login">Login</a>
              </Col>
              <Col sm={{ span: 6 }} className="text-end">
                <a href="/register">Register</a>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  inputData: PropTypes.object.isRequired,
  setInputData: PropTypes.func.isRequired,
  forgotPasswordLoading: PropTypes.bool.isRequired,
};

export default ForgotPasswordForm;
