import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  TabPane,
} from "reactstrap";
import { firebase_app } from "../../data/config";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

const Logins = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("checkbox") == "true") {
      setEmail(localStorage.getItem("username"));
      setPassword(localStorage.getItem("password"));
      setChecked(true);
    }
    return () => {
      setEmail("");
      setPassword("");
      setChecked(false);
    };
  }, []);

  const loginAuth = async (e) => {
    e.preventDefault();
    console.log(checked);

    try {
      await firebase_app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (u) {
          console.log(u);
          console.log(checked);
          if (checked == true && email !== "") {
            localStorage.setItem("username", email);
            localStorage.setItem("password", password);
            localStorage.setItem("checkbox", "true");
          }
          setTimeout(() => {
            props.history.push(
              `${process.env.PUBLIC_URL}/dashboard/userDashboard`
            );
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };

  return (
    <Container fluid={true} className="p-0">
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="index.html"></a>
              </div>
              <div className="login-main login-tab">
                <TabPane className="fade show">
                  <Form className="theme-form">
                    <h4>Sign In</h4>
                    <p>{"Enter your email & password to login"}</p>
                    <FormGroup>
                      <Label className="col-form-label">EmailAddress</Label>
                      <Input
                        className="form-control"
                        type="email"
                        name="email"
                        required=""
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">Password</Label>
                      <Input
                        className="form-control"
                        name="password"
                        type={togglePassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required=""
                      />
                      <div
                        className="show-hide"
                        onClick={() => setTogglePassword(!togglePassword)}
                      >
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </FormGroup>
                    <div className="form-group mb-0">
                      <div className="checkbox ml-3">
                        <Input
                          id="checkbox1"
                          type="checkbox"
                          checked={checked}
                          onChange={() => setChecked(!checked)}
                        />
                        <Label className="text-muted" for="checkbox1">
                          RememberPassword
                        </Label>
                      </div>
                      <Link className="link" to="/pages/auth/forgetPwd">
                        ForgotPassword
                      </Link>
                      {
                        <Button
                          color="primary"
                          className="btn-block"
                          disabled={loading ? loading : loading}
                          onClick={(e) => loginAuth(e)}
                        >
                          {loading ? "LOADING..." : "Sign In"}
                        </Button>
                      }
                    </div>
                    <p className="mt-4 mb-0">
                      {"Don't have account?"}
                      <Link className="ml-2" to="/pages/auth/signup">
                        CreateAccount
                      </Link>
                    </p>
                  </Form>
                </TabPane>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Logins);
