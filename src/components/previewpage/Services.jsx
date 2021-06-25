import React from "react";
import "./assets/css/flaticon.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/slicknav.css";
import "./assets/css/normalize.min.css";
import "./assets/css/device.css";
import "./assets/css/prettyPhoto.css";
function Services(props) {
  console.log(props);
  const services = props?.details?.services;

  const preview = services.map((service, index) => (
    <div className="col-sm-4" key={`${service}~${index}`}>
      <div className="itemsWrap">
        <div className="imgWrap">
          <img src={service.upload_image} className="img-fluid" alt="" />
        </div>
        <div className="dataWrap">
          <h3>{service.service_name}</h3>
          <p>{service.description}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div id="services" className="serviceProductWrap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="dataWrap commonDiv">
              <h5 className="blurTitle">Services</h5>
              <h6>Our Services</h6>
              <h2>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.{" "}
              </h2>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          {preview}
          {/* <div className="col-sm-4">
            <div className="itemsWrap">
              <div className="imgWrap">
                <img src="assets/img/img-2.jpg" className="img-fluid" alt="" />
              </div>
              <div className="dataWrap">
                <h3>The five devices you need to work anytime</h3>
                <p>
                  Lorem ipsum dolor sit amet consectet adipisie cing elit sed
                  eiusmod tempor incididunt on labore et dolore.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="itemsWrap">
              <div className="imgWrap">
                <img src="assets/img/img-2.jpg" className="img-fluid" alt="" />
              </div>
              <div className="dataWrap">
                <h3>The five devices you need to work anytime</h3>
                <p>
                  Lorem ipsum dolor sit amet consectet adipisie cing elit sed
                  eiusmod tempor incididunt on labore et dolore.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Services;
