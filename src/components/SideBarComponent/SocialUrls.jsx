import React, { Fragment, useEffect, useState } from "react";
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

function SocialUrls() {
  const { register, errors } = useForm();
  const [facebookUrl, setFaceBookUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const user_id = String(firebase_app.auth().currentUser?.uid);
  useEffect(() => {
    db.collection("users")
      .doc(user_id)
      .collection("data")
      .doc("Social URL'S")
      .get()
      .then((snapshot) => {
        setFaceBookUrl(snapshot.data().facebookUrl);
        setInstagramUrl(snapshot.data().instagramUrl);
        setLinkedinUrl(snapshot.data().linkedinUrl);
        setTelegramUrl(snapshot.data().telegramUrl);
        setTwitterUrl(snapshot.data().twitterUrl);
        setYoutubeUrl(snapshot.data().youtubeUrl);
      });
  }, [user_id]);

  const SubmitFormDetails = (e) => {
    e.preventDefault();

    db.collection("users")
      .doc(user_id)
      .collection("data")
      .doc("Social URL'S")
      .set({
        youtubeUrl: youtubeUrl,
        twitterUrl: twitterUrl,
        instagramUrl: instagramUrl,
        linkedinUrl: linkedinUrl,
        facebookUrl: facebookUrl,
        telegramUrl: telegramUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    // setFaceBookUrl("");
    // setTwitterUrl("");
    // setInstagramUrl("");
    // setYoutubeUrl("");
    // setLinkedinUrl("");
    // setTelegramUrl("");

    toast.success("Url's updated successfully");
  };

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Social URL'S " />
      <ToastContainer autoClose={2000} />
      <Loader />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Social URL'S</h5>
              </CardHeader>
              <CardBody>
                <Form className="needs-validation" noValidate="">
                  <div className="form-row">
                    <Col md="5 mb-3">
                      <Label htmlFor="validationCustom01">YOUTUBE URL</Label>
                      <Input
                        className="form-control"
                        name="youtubeUrl"
                        type="text"
                        // placeholder="full name"
                        innerRef={register({ required: true })}
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />
                      <span>{errors.firstName && "Full name is required"}</span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col md="5 mb-3">
                      <Label htmlFor="validationCustom02">INSTAGRAM URL</Label>
                      <Input
                        className="form-control"
                        name="instagramUrl"
                        type="text"
                        innerRef={register({ required: true })}
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                      />
                      <span>{errors.lastName && "Last name is required"}</span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col md="5 mb-3">
                      <Label htmlFor="validationCustomUsername">
                        FACEBOOK URL
                      </Label>
                      <InputGroup>
                        <Input
                          className="form-control"
                          name="facebookUrl"
                          type="text"
                          innerRef={register({ required: true })}
                          value={facebookUrl}
                          onChange={(e) => setFaceBookUrl(e.target.value)}
                        />
                        <span>
                          {errors.lastName && "User name is required"}
                        </span>
                      </InputGroup>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col md="5 mb-3">
                      <Label htmlFor="validationCustom03">LINKEDIN URL</Label>
                      <Input
                        className="form-control"
                        name="linkedinUrl"
                        type="text"
                        innerRef={register({ required: true })}
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                      />
                      <span>{errors.city && "Please provide a valid URL"}</span>
                      <div className="invalid-feedback">
                        {"Please provide a valid URL."}
                      </div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col md="5 mb-3">
                      <Label htmlFor="validationCustom04">TELEGRAM URL</Label>
                      <Input
                        className="form-control"
                        id="validationCustom04"
                        name="telegramUrl"
                        type="text"
                        innerRef={register({ required: true })}
                        value={telegramUrl}
                        onChange={(e) => setTelegramUrl(e.target.value)}
                      />
                      <span>
                        {errors.state && "Please provide a valid URL."}
                      </span>
                      <div className="invalid-feedback">
                        {"Please provide a valid URL."}
                      </div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col md="5 mb-3">
                      <Label htmlFor="validationCustom05">TWITTER URL</Label>
                      <Input
                        className="form-control"
                        id="validationCustom05"
                        name="twitterUrl"
                        type="text"
                        innerRef={register({ required: true })}
                        value={twitterUrl}
                        onChange={(e) => setTwitterUrl(e.target.value)}
                      />
                      <span>{errors.zip && "Please provide a valid URL."}</span>
                      <div className="invalid-feedback">
                        {"Please provide a valid zip."}
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

export default SocialUrls;
