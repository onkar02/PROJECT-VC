import React, { Fragment, useEffect, useState } from "react";

import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import { db } from "../../../data/config";
import { firebase_app } from "../../../data/config";
import Loader from "../../../layout/loader";
import Breadcrumb from "../../../layout/breadcrumb/index";

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Label,
  Input,
} from "reactstrap";

const Sample = (props) => {
  const [user_username, setUserUsername] = useState("");
  const [visitcount, setVisitCount] = useState(0);
  const [urlcount, setUrlCount] = useState(0);
  const uid = String(firebase_app.auth().currentUser?.uid);
  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .collection("data")
      .doc("Personal Details")
      .get()
      .then((snapshot) => {
        setVisitCount(snapshot.data().profileVisitCount);
        // setUrlCount(snapshot.data().profileSharedCount);
      });
  }, [visitcount, uid]);

  const findUrlAndUid = async () => {
    db.collection("users")
      .doc(uid)
      .collection("data")
      .doc("Personal Details")
      .get()
      .then((snapshot) => {
        const mixname = snapshot.data().username;
        if (mixname === user_username) {
          setUserUsername("");
          props.history.push(`${process.env.PUBLIC_URL}/user/${mixname}`);
        }
      });
  };

  return (
    <Fragment>
      <Loader />
      <Breadcrumb parent="Form" title="DashBoard" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="form-row">
                  <Col md="4 mb-3">
                    <Label htmlFor="validationCustom01">Username</Label>
                    <Input
                      type="text"
                      name="user_username"
                      value={user_username}
                      onChange={(e) => setUserUsername(e.target.value)}
                    />

                    <br />
                    <Button
                      color="primary"
                      type="submit"
                      onClick={findUrlAndUid}
                    >
                      ok
                    </Button>
                  </Col>
                </div>
                <div className="form-row">
                  <Col md="4 mb-3">
                    <Label htmlFor="validationCustom02">
                      <h1>Profile Visit Count:{visitcount}</h1>
                    </Label>
                  </Col>
                  <Col md="4 mb-3">
                    <Label htmlFor="validationCustom02">
                      <h1>Shared URL Count:{visitcount}</h1>
                    </Label>
                  </Col>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );

  //   return (
  //     <Fragment>
  //       <Loader />
  //       <div>
  //         <input
  //           type="text"
  //           name="user_username"
  //           value={user_username}
  //           onChange={(e) => setUserUsername(e.target.value)}
  //         />

  //         <br />
  //         <Button type="submit" onClick={findUrlAndUid}>
  //           ok
  //         </Button>
  //       </div>
  //       <div>{visitcount}</div>
  //     </Fragment>
  //   );
};

export default withRouter(Sample);
