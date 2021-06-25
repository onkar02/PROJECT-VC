import React, { Fragment, useState, useEffect } from "react";
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
  Input,
  Media,
} from "reactstrap";

import { db, storage } from "../../data/config";
import { firebase_app } from "../../data/config";
import Loader from "../../layout/loader";
import { toast, ToastContainer } from "react-toastify";

const Services = () => {
  const [inputFields, setInputFields] = useState([
    { service_name: "", description: "", upload_image: "" },
  ]);
  const [show, setShow] = useState(false);
  const uid = String(firebase_app.auth().currentUser?.uid);
  const regex = /(<([^>]+)>)/gi;
  useEffect(() => {
    const fetchData = async () => {
      const response = await db
        .collection("users")
        .doc(uid)
        .collection("data")
        .doc("Services")
        .get();
      if (response.exists) {
        setInputFields(response.data().services);
      }
    };
    fetchData();
  }, []);

  const onHandleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "service_name") {
      values[index].service_name = event.target.value;
    }

    setInputFields(values);
  };

  const onChange = (evt, index) => {
    console.log("onChange fired with event info: ", evt);
    const values = [...inputFields];
    var newContent = evt.editor.getData();
    values[index].description = newContent;
    setInputFields(values);
  };

  const onUploadImage = async (event, index) => {
    console.log("onChange fired with event info:img ", event);
    const values = [...inputFields];
    const file = event.target.files[0];
    // const file = event.target.files[0];
    // values[index].upload_image = file;
    // setInputFields(values);

    if (file === "") {
      console.error(`not an image, the image file is a ${typeof file}`);
    } else {
      console.log("actual file is", file);
      // setProfileImage(e.target.files[0]);
      console.log("start of upload");
      await storage.ref(`/service_images/${file?.name}`).put(file);
      const downloadURL = storage
        .ref("service_images")
        .child(file.name)
        .getDownloadURL();
      values[index].upload_image = await downloadURL;
      setInputFields(await values);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("inputFields", inputFields);

    db.collection("users")
      .doc(String(firebase_app.auth().currentUser?.uid))
      .collection("data")
      .doc("Services")
      .set({ services: inputFields });
    toast.success("Changes added successfully to your profile");
    setShow(false);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ service_name: "", description: "", upload_image: null });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    if (index !== 0) {
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  let previewBlock = (
    <>
      <Breadcrumb parent="Editors" title="Services" />
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
        {inputFields.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <Container fluid={true}>
              <Col sm="12">
                <Card>
                  <div className="profile-img-style">
                    <Row>
                      <Col sm="8">
                        <div className="media">
                          <div className="media-body align-self-center">
                            <h5 style={{ margin: "10px" }}>
                              {inputField.service_name}
                            </h5>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col lg="12" xl="4">
                        <div id="aniimated-thumbnials-3">
                          <a href="#javascript">
                            <Media
                              body
                              style={{ margin: "10px" }}
                              src={inputField.upload_image}
                              alt="gallery"
                            />
                          </a>
                        </div>
                      </Col>
                      <Col xl="6">
                        <p> {inputField.description.replace(regex, "")}</p>
                      </Col>
                    </Row>
                  </div>
                </Card>
                {/* <Card>
                  <CardBody>
                    <div className="form-row">
                      <Col md="4 mb-3">
                        <Label htmlFor="validationCustom01">
                          <h4> title </h4>: {inputField.service_name}
                        </Label>
                      </Col>
                    </div>
                    <div className="form-row">
                      <Col md="4 mb-4">
                        <Label>
                          <h4> image </h4>:
                          <img
                            src={inputField.upload_image}
                            alt="Preview here"
                            style={{ width: "60px", height: "60px" }}
                          />
                        </Label>
                      </Col>
                    </div>
                    <div className="form-row">
                      <Col md="4 mb-3">
                        <Label>
                          <h4> description </h4>:{" "}
                          {inputField.description.replace(/<[^>]+>/g, "")}
                        </Label>
                      </Col>
                    </div>
                  </CardBody>
                </Card> */}
              </Col>
            </Container>
          </Fragment>
        ))}
      </Row>
    </>
  );

  if (show === true) {
    previewBlock = (
      <>
        <Breadcrumb parent="Editors" title="Services" />
        <ToastContainer autoClose={4000} />
        <Loader />
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            {inputFields.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <Col md="4 mb-3">
                  <Label htmlFor="validationCustom01">Service Name</Label>
                  <Input
                    className="form-control"
                    name="service_name"
                    type="text"
                    value={inputField.service_name}
                    onChange={(event) => onHandleInputChange(index, event)}
                  />
                </Col>

                <Container fluid={true}>
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardHeader>
                          <h5>Description</h5>
                        </CardHeader>
                        <CardBody>
                          <CKEditors
                            activeClass="p10"
                            content={inputField.description}
                            events={{
                              change: (event) => onChange(event, index),
                            }}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
                <Col md="5 mb-3">
                  <Label htmlFor="validationCustom05">Upload Image</Label>
                  <Input
                    className="form-control"
                    name="upload_image"
                    type="file"
                    placeholder="upload_image"
                    onChange={(event) => onUploadImage(event, index)}
                  />
                </Col>
                <Container>
                  <Row>
                    <Col md="1 mb-2">
                      {/* <div className="form-group col-sm-2"> */}
                      <Button
                        className="btn btn-primary mr-2"
                        type="button"
                        onClick={() => handleAddFields(index)}
                      >
                        +
                      </Button>
                      {/* </div> */}
                    </Col>
                    <Col md="1 mb-2">
                      {/* <div className="form-group col-sm-2"> */}
                      <Button
                        className="btn btn-primary mr-2"
                        type="button"
                        onClick={() => handleRemoveFields(index)}
                      >
                        -
                      </Button>
                      {/* </div> */}
                    </Col>
                  </Row>
                </Container>
              </Fragment>
            ))}
          </div>
          <div className="submit-button">
            <button className="btn btn-primary mr-2" type="submit">
              Save
            </button>
          </div>
          {/* <br />
        <pre>{JSON.stringify(inputFields, null, 2)}</pre> */}
        </form>
      </>
    );
  }
  return previewBlock;
};

export default Services;
