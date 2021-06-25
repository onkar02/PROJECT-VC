import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { SignIn } from "../../constant";
import { useState } from "react";
import { Link } from "react-router-dom";
import { firebase_app } from "../../data/config";
import { toast } from "react-toastify";

const Forgetpwd = (props) => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const ResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await firebase_app
        .auth()
        .sendPasswordResetEmail(email)
        .then(function (u) {
          console.log(u);

          setTimeout(() => {
            props.history.push(`${process.env.PUBLIC_URL}/login`);
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error("Oppss.. something went wrong.");
      }, 200);
    }
  };

  return (
    <Container fluid={true}>
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div></div>
              <div className="login-main">
                <Form className="theme-form">
                  <h4>ResetPassword</h4>
                  <FormGroup>
                    <Label className="col-form-label">Enter your email</Label>
                    <Row>
                      <Col md="9">
                        <Input
                          className="form-control mb-1"
                          type="tel"
                          placeholder="enter your email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </Col>
                      <Col xs="12">
                        <Button
                          color="primary"
                          className="btn-block m-t-10"
                          type="submit"
                          onClick={ResetPassword}
                        >
                          Reset Password
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>

                  <p className="mt-4 mb-0">
                    {"Already have an password?"}
                    <Link className="ml-2" to="/login">
                      {SignIn}
                    </Link>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Forgetpwd;
