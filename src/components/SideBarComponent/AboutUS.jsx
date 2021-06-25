import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import CKEditors from "react-ckeditor-component";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Label,
} from "reactstrap";

import { db } from "../../data/config";
import { firebase_app } from "../../data/config";
import firebase from "firebase";
import Loader from "../../layout/loader";
import { toast, ToastContainer } from "react-toastify";

const CkEditor = () => {
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const uid = String(firebase_app.auth().currentUser?.uid);
  const regex = /(<([^>]+)>)/gi;
  useEffect(() => {
    const fetchData = async () => {
      const response = await db
        .collection("users")
        .doc(uid)
        .collection("data")
        .doc("About_us")
        .get();
      if (response.exists) {
        console.log(response.data().content);
        setContent(response.data().content);
      }
    };
    fetchData();
  }, []);

  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };

  const saveDAta = () => {
    db.collection("users")
      .doc(String(firebase_app.auth().currentUser?.uid))
      .collection("data")
      .doc("About_us")
      .set({
        content: content,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    toast.success("information updated successfully");
    setShow(false);
  };

  let previewblock = (
    <>
      <Breadcrumb parent="Editors" title="About Us" />
      <Col>
        <Button
          className="pull-right"
          color="primary"
          onClick={() => {
            setShow(true);
          }}
        >
          Edit
        </Button>
      </Col>
      <Row>
        <Fragment>
          <Container fluid={true}>
            <Col sm="12">
              <Card>
                <CardBody>
                  <div className="form-row">
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {content.replace(regex, "")}
                      </Label>
                    </Col>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Container>
        </Fragment>
      </Row>
    </>
  );

  if (show === true) {
    previewblock = (
      <Fragment>
        <ToastContainer autoClose={2000} />
        <Breadcrumb parent="Editors" title="About Us" />
        <Loader />
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>Write About Your Company Here</h5>
                </CardHeader>
                <CardBody>
                  <CKEditors
                    activeclassName="p10"
                    content={content}
                    events={{
                      change: onChange,
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col sm="12">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button className="btn-pill" color="primary" onClick={saveDAta}>
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }

  return previewblock;
};

export default CkEditor;
