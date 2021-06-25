import React from "react";
import { Button } from "reactstrap";
import { firebase_app } from "./data/config";
function home() {
  const Logout_From_Firebase = () => {
    firebase_app.auth().signOut();
    window.location.href = `${process.env.PUBLIC_URL}/login`;
  };

  return (
    <div>
      <h1>HOME SWEET HOME</h1>
      <Button onClick={Logout_From_Firebase}>Logout</Button>
    </div>
  );
}

export default home;
