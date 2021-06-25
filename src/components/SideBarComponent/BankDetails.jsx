import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Label,
  Input,
  InputGroup,
} from "reactstrap";

import { db } from "../../data/config";
import { firebase_app } from "../../data/config";
import firebase from "firebase";
import Loader from "../../layout/loader";
import { toast, ToastContainer } from "react-toastify";

function BankDetails() {
  const { register, errors } = useForm();
  const [bankname, setBankName] = useState("");
  const [customarname, setCustomarName] = useState("");
  const [branchname, setBranchName] = useState("");
  const [ifsc, setIFSC] = useState("");
  const [accountNo, setAccountNo] = useState("");

  const user_id = String(firebase_app.auth().currentUser?.uid);
  useEffect(() => {
    db.collection("users")
      .doc(user_id)
      .collection("data")
      .doc("Bank Details")
      .get()
      .then((snspshot) => {
        setBankName(snspshot.data().bankname);
        setBranchName(snspshot.data().branchname);
        setCustomarName(snspshot.data().customarname);
        setIFSC(snspshot.data()?.ifsc);
        setAccountNo(snspshot.data().accountNo);
      });
  }, [user_id]);

  const SubmitFormDetails = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(String(firebase_app.auth().currentUser?.uid))
      .collection("data")
      .doc("Bank Details")
      .set({
        user: String(firebase_app.auth().currentUser.uid),
        email: String(firebase_app.auth().currentUser.email),
        bankname: bankname,
        ifsc: ifsc,
        accountNo: accountNo,
        branchname: branchname,
        customarname: customarname,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    // setBankName("");
    // setIFSC("");
    // setAccountNo("");
    // setBranchName("");
    // setCustomarName("");
    toast.success("bank details updated successfully");
  };

  return (
    <Fragment>
      <Loader />
      <ToastContainer autoClose={2000} />
      <Breadcrumb parent="Form" title="Bank Details" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Bank Details Form</h5>
              </CardHeader>
              <CardBody>
                <Form className="needs-validation" noValidate="">
                  <div className="form-row">
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">Customar Name</Label>
                      <Input
                        className="form-control"
                        name="customarname"
                        type="text"
                        innerRef={register({ required: true })}
                        value={customarname}
                        onChange={(e) => setCustomarName(e.target.value)}
                      />
                      <span>{errors.firstName && "Full name is required"}</span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom02">
                        Name of the Bank
                      </Label>
                      <Input
                        className="form-control"
                        name="bankname"
                        type="text"
                        innerRef={register({ required: true })}
                        value={bankname}
                        onChange={(e) => setBankName(e.target.value)}
                      />
                      <span>{errors.lastName && "Last name is required"}</span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustomUsername">
                        Branch Name
                      </Label>
                      <InputGroup>
                        <Input
                          className="form-control"
                          name="branchname"
                          type="text"
                          innerRef={register({ required: true })}
                          value={branchname}
                          onChange={(e) => setBranchName(e.target.value)}
                        />
                        <span>
                          {errors.lastName && "User name is required"}
                        </span>
                      </InputGroup>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom03">IFSC Code</Label>
                      <Input
                        className="form-control"
                        name="ifsc"
                        type="text"
                        innerRef={register({ required: true })}
                        value={ifsc}
                        onChange={(e) => setIFSC(e.target.value)}
                      />
                      <span>
                        {errors.city && "Please provide a valid city"}
                      </span>
                      <div className="invalid-feedback">
                        {"Please provide a valid city."}
                      </div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom04">Account No.</Label>
                      <Input
                        className="form-control"
                        id="validationCustom04"
                        name="accountNo"
                        type="text"
                        innerRef={register({ required: true })}
                        value={accountNo}
                        onChange={(e) => setAccountNo(e.target.value)}
                      />
                      <span>
                        {errors.state && "Please provide a valid state."}
                      </span>
                      <div className="invalid-feedback">
                        {"Please provide a valid state."}
                      </div>
                    </Col>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    onClick={SubmitFormDetails}
                  >
                    Save
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default BankDetails;
