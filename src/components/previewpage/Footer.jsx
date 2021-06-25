import React from "react";
import "./assets/css/style.css";
import "./assets/css/flaticon.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/slicknav.css";
// import "../../assets/css/slick.css";

import "./assets/css/normalize.min.css";
// import "../../assets/css/device.css";

function Footer() {
  return (
    <footer>
      {/* Footer Start */}
      <div className="footer-area footer-bg">
        <div className="container width100">
          <div className="footer-top footer-padding">
            {/* footer Heading */}
            <div className="footer-heading">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-sm-12">
                  <div className="footer-tittle2">
                    <h4>Let’s Get Social</h4>
                  </div>
                  {/* <!-- Footer Social --> */}
                  <div className="footer-social">
                    <a href="" target="_blank">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="" target="_blank">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="" target="_blank">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="" target="_blank">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="divider div-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
