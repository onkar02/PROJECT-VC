import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import {
  Password,
  SignIn,
  EmailAddress,
  CreateAccount,
  YourName,
  PrivacyPolicy,
} from "../../constant";
import { Link } from "react-router-dom";
import { firebase_app } from "../../data/config";
import { db } from "../../data/config";

import axios from "../../../src/axios-orders";
import Loader from "../../layout/loader/index";
import { toast, ToastContainer } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [show, setShow] = useState(false);
  const [random, setRandom] = useState({});
  const signup = (e) => {
    e.preventDefault();
    firebase_app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
      })
      .then(async (userCredentials) => {
        if (userCredentials.user) {
          setShow(true);
          await userCredentials.user.updateProfile({
            displayName: name + " " + lastname,
          });
          const usersname = firebase_app.auth().currentUser?.displayName;
          const uid = firebase_app.auth().currentUser?.uid;
          const userid = uid.slice(0, 4);
          const mixname = usersname + userid;
          if (mixname && userid) {
            const data = { [mixname]: uid };
            await db
              .collection("users")
              .doc(uid)
              .collection("data")
              .doc("Personal Details")
              .set({
                username: mixname,
                email: email,
                profileVisitCount: 0,
                profileSharedCount: 0,
              });
            await axios
              .patch(`/users.json`, data)
              .then((response) => {
                console.log(response);
              })
              .catch((error) => console.log("user already exist", error));
          }

          window.location.href = `${process.env.PUBLIC_URL}/login`;
        }
        // setShow(false);
      });
  };
  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  let previewBlog = (
    <Container fluid={true} className="p-0">
      <ToastContainer autoClose={2000} />
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div></div>
              <div className="login-main">
                <Form className="theme-form">
                  <h4>{"Create your account"}</h4>
                  <p>{"Enter your personal details to create account"}</p>
                  <FormGroup>
                    <Label className="col-form-label pt-0">{YourName}</Label>
                    <div className="form-row">
                      <Col xs="6">
                        <Input
                          className="form-control"
                          type="text"
                          required=""
                          placeholder="First name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Col>
                      <Col xs="6">
                        <Input
                          className="form-control"
                          type="text"
                          required=""
                          placeholder="Last name"
                          value={lastname}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Col>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      className="form-control"
                      type="email"
                      required=""
                      placeholder="enter your email id here"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <Input
                      className="form-control"
                      type={togglePassword ? "text" : "password"}
                      name="login[password]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required=""
                      placeholder="*********"
                    />
                    <div
                      className="show-hide"
                      onClick={() => HideShowPassword(togglePassword)}
                    >
                      <span className={togglePassword ? "" : "show"}></span>
                    </div>
                  </FormGroup>
                  <div className="form-group mb-0">
                    {/* <div className="checkbox ml-3">
                    <Input
                      id="checkbox1"
                      type="checkbox"
                      onClickCapture={allowregister}
                    />
                    <Label className="text-muted" for="checkbox1">
                      {"Agree with"}
                      <a className="ml-2" href="#javascript">
                        {PrivacyPolicy}
                      </a>
                    </Label>
                  </div> */}
                    <Button
                      color="primary"
                      className="btn-block"
                      type="submit"
                      onClick={signup}
                    >
                      {CreateAccount}
                    </Button>
                  </div>
                  <p className="mt-4 mb-0">
                    {"Already have an account?"}
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

  if (show == true) {
    previewBlog = <Loader />;
  }

  return previewBlog;
};

export default Register;
