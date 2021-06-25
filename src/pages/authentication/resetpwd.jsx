import React, { useState } from "react";
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
import {
  NewPassword,
  RetypePassword,
  Done,
  RememberPassword,
  CreateAccount,
} from "../../constant";

const Resetpwd = (props) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  return (
    <Container fluid={true}>
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div className="login-main">
                <Form className="theme-form">
                  <h4>{"Create Your Password"}</h4>
                  <FormGroup>
                    <Label className="col-form-label">{NewPassword}</Label>
                    <Input
                      className="form-control"
                      type={togglePassword ? "text" : "password"}
                      name="login[password]"
                      value={password}
                      onChange={(e) => handleChange(e)}
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
                  <FormGroup>
                    <Label className="col-form-label">{RetypePassword}</Label>
                    <Input
                      className="form-control"
                      type="password"
                      name="login[password]"
                      required=""
                      placeholder="*********"
                    />
                  </FormGroup>
                  <FormGroup className="mb-0">
                    <div className="checkbox ml-3">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <Button color="primary" className="btn-block" type="submit">
                      {" "}
                      //reset function
                      {Done}
                    </Button>
                  </FormGroup>
                  <p className="mt-4 mb-0">
                    {"Don't have account?"}
                    <a className="ml-2" href="#javascript">
                      {CreateAccount}
                    </a>
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

export default Resetpwd;
