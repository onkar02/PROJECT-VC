import React from "react";
import "./assets/css/prettyPhoto.css";
import "./assets/css/flaticon.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/slicknav.css";
import "./assets/css/normalize.min.css";
import "./assets/css/device.css";
function AboutUS(props) {
  console.log(props);
  return (
    <div id="about" className="aboutWrap">
      <div className="container">
        <div className="row bgWhite">
          <div className="col-lg-5 col-md-6 p-0">
            <div className="imgWrap">
              <img
                src="assets/img/img-about.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-7 col-md-6 p-0">
            <div className="dataWrap commonDiv">
              <h5 className="blurTitle">About</h5>
              <h6>Welcome to Lorem ipsum</h6>
              <h2>{props?.details?.content}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
                neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium,
                ligula sollicitudin laoreet viverra, tortor libero sodales leo,
                eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo.
                Suspendisse potenti.
              </p>
            </div>
            <div className="row serviceIcon">
              <div className="col-sm-6">
                <div className="iconWrap">
                  <span className="flaticon-contract"></span>
                </div>
                <div className="dataWrap">
                  <h2>Lorem ipsum dolor sit</h2>
                  <p>
                    Donec nec justo eget felis facilisis fermentum. Aliquam
                    porttitor mauris sit amet orci.{" "}
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="iconWrap">
                  <span className="flaticon-certificate"></span>
                </div>
                <div className="dataWrap">
                  <h2>Lorem ipsum dolor sit</h2>
                  <p>
                    Donec nec justo eget felis facilisis fermentum. Aliquam
                    porttitor mauris sit amet orci.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUS;
