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
  FormGroup,
  Label,
  Input,
  InputGroup,
} from "reactstrap";

import { db, storage } from "../../data/config";
import { firebase_app } from "../../data/config";
import firebase from "firebase";
import axios from "../../axios-orders";
import Loader from "../../layout/loader/index";
import { toast, ToastContainer } from "react-toastify";
const FormValidation = () => {
  const { register, errors } = useForm();
  const [current, setCurrent] = useState("");
  const [username, setUserName] = useState("");
  const [jobdiscription, setJobDiscription] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [mobile_no, setMobileNo] = useState("");
  const [whatsapp_no, setWhatsappNo] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [imageasurl, setImageAsURL] = useState("");
  const [allow, setAllow] = useState(false);
  const [loading, setLoading] = useState(false);

  const user_id = firebase_app.auth().currentUser?.uid;
  console.log(user_id);
  useEffect(() => {
    db.collection("users")
      .doc(user_id)
      .collection("data")
      .doc("Personal Details")
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
        setUserName(snapshot.data().username);
        setAddress(snapshot.data().address);
        setCompanyName(snapshot.data().companyname);
        setEmail(snapshot.data().email);
        setJobDiscription(snapshot.data().jobdiscription);
        setMobileNo(snapshot.data().mobile_no);
        setWhatsappNo(snapshot.data().whatsapp_no);
        setPhoneNo(snapshot.data().phone_no);
        setWebsite(snapshot.data().website);
        setImageAsURL(snapshot.data().imageasurl);
      });
  }, [user_id]);

  useEffect(() => {
    db.collection("users")
      .doc(String(firebase_app.auth().currentUser?.uid))
      .collection("data")
      .doc("Personal Details")
      .get()
      .then(async (snapshot) => {
        const cuser = await snapshot.data().username;
        setCurrent(cuser);
      });
  }, [user_id, username]);

  const allowSubmit = () => {
    // getCurrentUser();
    setAllow(!allow);
    console.log("current username", current);
  };

  const onProfileChange = async (e) => {
    const file = e.target.files[0];

    console.log("start of upload");
    await storage.ref(`/images/${file.name}`).put(file);
    const downloadURL = storage.ref("images").child(file.name).getDownloadURL();
    setImageAsURL(await downloadURL);
  };

  const SubmitFormDetails = async (e) => {
    e.preventDefault();
    await db
      .collection("users")
      .doc(String(firebase_app.auth().currentUser?.uid))
      .collection("data")
      .doc("Personal Details")
      .update({
        email: email,
        username: username,
        jobdiscription: jobdiscription ? jobdiscription : "",
        companyname: companyname ? companyname : "",
        phone_no: phone_no ? phone_no : "",
        mobile_no: mobile_no ? mobile_no : "",
        whatsapp_no: whatsapp_no ? whatsapp_no : "",
        website: website ? website : "",
        address: address ? address : "",
        imageasurl: imageasurl ? imageasurl : "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    const userdata = {
      [username]: String(firebase_app.auth().currentUser?.uid),
    };
    await axios
      .patch(`/users.json`, userdata)
      .then((response) => {
        console.log(response);
        console.log("current username 2", current);
        if (current !== username) {
          axios
            .delete(`/users/${current}.json`)
            .then((res) => {
              console.log("delete query", res);
            })
            .then(setCurrent(username));
        }
      })
      .catch((error) => console.log(error));
    firebase_app.auth().currentUser.updateProfile({
      photoURL: imageasurl,
    });

    // setUserName("");
    // setAddress("");
    // setCompanyName("");
    // setEmail("");
    // setJobDiscription("");
    // setMobileNo("");
    // setWhatsappNo("");
    // setPhoneNo("");
    // setWebsite("");
    // setImageAsURL("");
    toast.success("your form is submitted successfully");
  };

  return (
    <Fragment>
      <Loader />
      <ToastContainer autoClose={2000} />
      <Breadcrumb parent="Form" title="Personal Details" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Personal Details Form</h5>
              </CardHeader>
              <CardBody>
                <Form className="needs-validation" noValidate="">
                  <div className="form-row">
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">Username</Label>
                      <Input
                        className="form-control"
                        name="username"
                        type="text"
                        placeholder="username"
                        innerRef={register({ required: true })}
                        value={username || ""}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <span>{errors.firstName && "Full name is required"}</span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom02">
                        Title/Job Description
                      </Label>
                      <Input
                        className="form-control"
                        name="jobdescription"
                        type="text"
                        placeholder="Job Description"
                        innerRef={register({ required: true })}
                        value={jobdiscription || ""}
                        onChange={(e) => setJobDiscription(e.target.value)}
                      />
                      <span>{errors.lastName && "Last name is required"}</span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustomUsername">
                        Company Name
                      </Label>
                      <InputGroup>
                        <Input
                          className="form-control"
                          name="companyname"
                          type="text"
                          placeholder="Company Name"
                          innerRef={register({ required: true })}
                          value={companyname || ""}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <span>
                          {errors.lastName && "User name is required"}
                        </span>
                      </InputGroup>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom03">
                        Phone No./Landline
                      </Label>
                      <Input
                        className="form-control"
                        name="phone number"
                        type="text"
                        placeholder="enter phone No."
                        innerRef={register({ required: true })}
                        value={phone_no || ""}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />
                      <span>
                        {errors.city && "Please provide a valid city"}
                      </span>
                      <div className="invalid-feedback">
                        {"Please provide a valid city."}
                      </div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom04">Mobile No.</Label>
                      <Input
                        className="form-control"
                        id="validationCustom04"
                        name="mobile_no"
                        type="text"
                        placeholder="enter the mobile number"
                        innerRef={register({ required: true })}
                        value={mobile_no || ""}
                        onChange={(e) => setMobileNo(e.target.value)}
                      />
                      <span>
                        {errors.state && "Please provide a valid state."}
                      </span>
                      <div className="invalid-feedback">
                        {"Please provide a valid state."}
                      </div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom05">Whatsaap No.</Label>
                      <Input
                        className="form-control"
                        id="validationCustom05"
                        name="whatsapp_no"
                        type="text"
                        placeholder="enter the whatsapp no."
                        innerRef={register({ required: true })}
                        value={whatsapp_no || ""}
                        onChange={(e) => setWhatsappNo(e.target.value)}
                      />
                      <span>{errors.zip && "Please provide a valid zip."}</span>
                      <div className="invalid-feedback">
                        {"Please provide a valid zip."}
                      </div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom05">Email</Label>
                      <Input
                        className="form-control"
                        id="validationCustom05"
                        name="Email"
                        type="text"
                        disabled={true}
                        placeholder="enter your mail Id"
                        innerRef={register({ required: true })}
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span>{errors.zip && "Please provide a valid zip."}</span>
                      <div className="invalid-feedback">
                        {"Please provide a valid zip."}
                      </div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom05">Website</Label>
                      <Input
                        className="form-control"
                        id="validationCustom05"
                        name="website"
                        type="text"
                        placeholder="enter the websiter of your company"
                        // innerRef={register({ required: true })}
                        value={website || ""}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                      <span>{errors.zip && "Please provide a valid zip."}</span>
                      <div className="invalid-feedback">
                        {"Please provide a valid zip."}
                      </div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom05">Address</Label>
                      <Input
                        className="form-control"
                        id="validationCustom05"
                        name="address"
                        type="text"
                        placeholder="Enter your valid address"
                        innerRef={register({ required: true })}
                        value={address || ""}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <span>{errors.zip && "Please provide a valid zip."}</span>
                      <div className="invalid-feedback">
                        {"Please provide a valid zip."}
                      </div>
                    </Col>

                    <Col md="5 mb-3">
                      <Label htmlFor="validationCustom05">Upload Image</Label>
                      <Input
                        className="form-control"
                        id="validationCustom05"
                        type="file"
                        placeholder="profile image"
                        innerRef={register({ required: true })}
                        onChange={onProfileChange}
                      />
                      <span>{errors.zip && "Please provide a valid zip."}</span>
                      <div className="invalid-feedback">
                        {"Please provide a valid zip."}
                      </div>
                    </Col>
                    <Col md="5 mb-3">
                      <Label htmlFor="validationCustom05">Image Preview</Label>
                      <br />
                      <img
                        src={imageasurl}
                        alt="Preview here"
                        style={{ width: "60px", height: "60px" }}
                      />

                      <span>{errors.zip && "Please provide a valid zip."}</span>
                      <div className="invalid-feedback">
                        {"Please provide a valid zip."}
                      </div>
                    </Col>
                  </div>
                  {/* <FormGroup>
                    <div className="form-check">
                      <div className="checkbox p-0">
                        <Input
                          className="form-check-input"
                          id="invalidCheck"
                          type="checkbox"
                          onClick={allowSubmit}
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="invalidCheck"
                        >
                          {"Agree to terms and conditions"}
                        </Label>
                      </div>
                      <div className="invalid-feedback">
                        {"You must agree before submitting."}
                      </div>
                    </div>
                  </FormGroup> */}
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
};

export default FormValidation;
