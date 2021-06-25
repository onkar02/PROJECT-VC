import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import { db, storage } from "../../data/config";
import { firebase_app } from "../../data/config";
import Loader from "../../layout/loader";
import ImageUploader from "react-images-upload";
import Masonry from "react-masonry-css";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Media,
  Button,
  Label,
  Input,
} from "reactstrap";

import { Download } from "react-feather";

const Gallery = () => {
  // const [collection, setCollection] = useState({ data: [] });
  // const [show, setShow] = useState(false);

  //   const onHandleInputChange = async (index, event) => {
  //     console.log("onChange fired with event info:img ", event);
  //     const values = [...inputFields];
  //     const file = event.target.files[0];
  //     if (file === "") {
  //       console.error(`not an image, the image file is a ${typeof file}`);
  //     } else {
  //       console.log("actual file is", file);
  //       // setProfileImage(e.target.files[0]);
  //       console.log("start of upload");
  //       await storage.ref(`/Gallary/${file?.name}`).put(file);
  //       const downloadURL = storage
  //         .ref("Gallary")
  //         .child(file.name)
  //         .getDownloadURL();
  //       values[index].upload_image = await downloadURL;
  //       setInputFields(values);
  //     }
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     await db
  //       .collection("users")
  //       .doc(String(firebase_app.auth().currentUser?.uid))
  //       .collection("data")
  //       .doc("Gallary")
  //       .set({ images: inputFields });
  //     toast.success("images uploaded successfully...!");
  //     setShow(false);
  //     // setInputFields([{ upload_image: "" }]);
  //   };

  //   const handleAddFields = () => {
  //     const values = [...inputFields];
  //     values.push({ upload_image: "" });
  //     setInputFields(values);
  //   };

  //   const handleRemoveFields = (index) => {
  //     const values = [...inputFields];
  //     values.splice(index, 1);
  //     setInputFields(values);
  //   };

  //   let preview = (
  //     <>
  //       <Breadcrumb parent="Editors" title="Gallery" />
  //       <Col md="4 mb-3">
  //         <Label htmlFor="validationCustom05">Preview of Image</Label>
  //       </Col>
  //       <Col>
  //         <Button
  //           className="pull-right"
  //           color="primary"
  //           onClick={() => {
  //             setShow(true);
  //           }}
  //         >
  //           Add
  //         </Button>
  //       </Col>
  //       <Row>
  //         {inputFields.map((image, index) => (
  //           <Fragment key={`${image}~${index}`}>
  //             <Container fluid={true}>
  //               <Col sm="12">
  //                 <Card>
  //                   <CardBody>
  //                     <div className="form-row">
  //                       <Col md="4 mb-3">
  //                         <Label>
  //                           <h4> image </h4>:
  //                           <img
  //                             src={image.upload_image}
  //                             alt="uploaded_images"
  //                             // key={index}
  //                             style={{
  //                               width: "160px",
  //                               height: "160px",
  //                               margin: "10px",
  //                             }}
  //                           />
  //                         </Label>
  //                       </Col>
  //                     </div>
  //                   </CardBody>
  //                 </Card>
  //               </Col>
  //             </Container>
  //           </Fragment>
  //         ))}
  //       </Row>
  //     </>
  //   );

  // if (show === true) {
  //     preview = (
  //       <>
  //         <Breadcrumb parent="Editors" title="Gallary" />
  //         <Loader />
  //         <ToastContainer autoClose={4000} />
  //         <form onSubmit={handleSubmit}>
  //           <div className="form-row">
  //             {inputFields.map((inputField, index) => (
  //               <Fragment key={`${inputField}~${index}`}>
  //                 <Col md="5 mb-3">
  //                   <Label htmlFor="validationCustom05">Upload Image</Label>
  //                   <Input
  //                     className="form-control"
  //                     name="upload_image"
  //                     type="file"
  //                     placeholder="upload_image"
  //                     onChange={(event) => onHandleInputChange(index, event)}
  //                   />
  //                 </Col>
  //                 <Container>
  //                   <Row>
  //                     <Col md="1 mb-2">
  //                       <div className="form-group col-sm-2">
  //                         <Button
  //                           className="btn btn-link"
  //                           type="button"
  //                           onClick={() => handleAddFields(index)}
  //                         >
  //                           +
  //                         </Button>
  //                       </div>
  //                     </Col>
  //                     <Col md="1 mb-2">
  //                       <div className="form-group col-sm-2">
  //                         <Button
  //                           className="btn btn-link"
  //                           type="button"
  //                           onClick={() => handleRemoveFields(index)}
  //                         >
  //                           -
  //                         </Button>
  //                       </div>
  //                     </Col>
  //                   </Row>
  //                 </Container>
  //               </Fragment>
  //             ))}
  //           </div>
  //           <div className="submit-button">
  //             <button className="btn btn-primary mr-2" type="submit">
  //               Save
  //             </button>
  //           </div>
  //           {/* <br />
  //           <pre>{JSON.stringify(inputFields, null, 2)}</pre> */}
  //         </form>
  //       </>
  //     );
  // }

  //   return preview;
  const [image, setimage] = useState({ pictures: [] });
  const [download, setDownload] = useState({ image: [] });
  const [show, setShow] = useState(false);
  const [inputFields, setInputFields] = useState({ image: [] });
  const user_id = String(firebase_app.auth().currentUser?.uid);
  console.log(download);
  useEffect(() => {
    // let imgdata = [];
    const fetchData = async () => {
      const response = await db
        .collection("users")
        .doc(user_id)
        .collection("data")
        .doc("Gallary")
        .get();

      if (response.exists) {
        console.log(response.data().images);
        setDownload({ image: response.data().images });
        setInputFields({ image: response.data().images });
      }
      // querySnapshot.data().images.forEach(function (doc) {
      //   imgdata.push({
      //     data: doc,
      //   });
      // });
      // setCollection({ data: imgdata });
    };
    fetchData();
  }, []);

  const onDrop = (pictureFiles, e) => {
    // e.preventDefault();
    const newArray = download.image;
    console.log("onDrop", pictureFiles);
    setimage({
      pictureFiles,
    });
    const promises = [];

    pictureFiles.forEach((file) => {
      console.log("image file is", file);
      const uploadTask = storage.ref("Gallery").child(`${file.name}`).put(file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === "running") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          newArray.push(downloadURL);
          setDownload({ image: newArray });
        }
      );
    });
    Promise.all(promises)
      .then(() => alert("All files uploaded"))
      .catch((err) => console.log(err.code));
  };
  const onUploadSubmission = async (e) => {
    e.preventDefault(); // prevent page refreshing
    await db
      .collection("users")
      .doc(String(firebase_app.auth().currentUser?.uid))
      .collection("data")
      .doc("Gallary")
      .set({ images: download.image });
    toast.success("file uploaded successfully");
    setShow(false);
  };

  const deleteImg = (index) => {
    const values = [...download.image];
    if (index !== -1) {
      values.splice(index, 1);
      setDownload({ image: values });
    }
    // db.collection("users")
    //   .doc(String(firebase_app.auth().currentUser?.uid))
    //   .collection("data")
    //   .doc("Gallary")
    //   .update({ images: download.image });
  };

  let preview = (
    <Fragment>
      <Breadcrumb parent="Gallery" title="Masonry Gallery" />

      <Container fluid={true}>
        <Row>
          <Col>
            <Button
              className="pull-right"
              color="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              Add / Delete
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Gallery</h5>
              </CardHeader>
              <CardBody className="photoswipe-pb-responsive">
                <Masonry
                  breakpointCols={4}
                  className="my-gallery row grid gallery"
                  columnClassName="col-md-3 col-6 grid-item"
                >
                  {download.image.map((element, index) => (
                    <div key={index}>
                      <Media src={element} style={{ width: "100%" }} alt="" />
                    </div>
                  ))}
                </Masonry>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );

  if (show === true) {
    preview = (
      <Fragment>
        <Breadcrumb parent="Bouns Ui" title="Uploads" />
        <ToastContainer autoClose={2000} />
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>MultipleImageUpload</h5>
                </CardHeader>
                <CardBody>
                  <ImageUploader
                    withIcon={false}
                    withPreview={true}
                    label=""
                    buttonText="Upload Images"
                    onChange={(e) => onDrop(e)}
                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                    maxFileSize={1048576}
                    fileSizeError=" file size is too big"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <div className="submit-button">
                <button
                  className="btn btn-primary mr-2"
                  type="submit"
                  onClick={onUploadSubmission}
                >
                  Save
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <CardHeader>
                    <h5>Gallery</h5>
                  </CardHeader>
                  {download.image.map((element, index) => (
                    <>
                      <div key={index}>
                        <img
                          src={element}
                          style={{ width: "100px", height: "100px" }}
                          alt=""
                        />
                      </div>
                      <div>
                        <Button
                          className="btn btn-primary mr-2"
                          type="button"
                          onClick={() => deleteImg(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }

  return preview;
};

export default Gallery;
