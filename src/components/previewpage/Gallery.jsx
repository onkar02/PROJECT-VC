import React, { useEffect, useState } from "react";
import "./assets/css/flaticon.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/slicknav.css";

import "./assets/css/device.css";
import "./assets/css/prettyPhoto.css";
import axios from "axios";
import { db } from "../../data/config";

const Gallery = (props) => {
  //   const [inputFields, setInputFields] = useState([{ upload_image: "" }]);
  const images = props?.details?.images;
  //   setInputFields(images);
  console.log(images);
  const preview = images.map((image, index) => (
    <div className="col-md-3 col-sm-6 p-0" key={`${image}~${index}`}>
      <div className="imgWrap">
        <img src={image} alt="" className="img-fluid" />
        <div className="icon">
          <a
            href="assets/images/gallery/event-img-1.jpg"
            rel="prettyPhoto[gallery2]"
          >
            <span className="flaticon-image"></span>
          </a>
        </div>
      </div>
    </div>
  ));

  return (
    <div id="gallery" className="galleryWrap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="dataWrap commonDiv">
              <h5 className="blurTitle">Gallery</h5>
              <h6>Events Gallery</h6>
              <h2>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.{" "}
              </h2>
            </div>
          </div>
        </div>
        <div className="row galleryImg pretty">{preview}</div>
      </div>
    </div>
  );
};

export default Gallery;
