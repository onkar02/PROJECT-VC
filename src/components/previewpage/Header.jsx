import React from "react";
import "./assets/css/style.css";
function Header() {
  return (
    <header>
      {/* Header Start  */}
      <div className="header-area">
        <div className="main-header ">
          <div className="header-bottom header-sticky">
            <div className="container-fluid">
              <div className="col-xs-12">
                <div className="row d-flex justify-content-between align-items-center">
                  {/* Logo  */}
                  <div className="logo d-none d-lg-block">
                    <a href="index.html" className="gradienntTxt">
                      Logo
                      {/* <img src="assets/img/logo.png" alt="LOGO" class="img-fluid" />  */}
                    </a>
                  </div>
                  <div className="menu-wrapper">
                    {/* Logo  */}
                    <div className="logo logo2 d-block d-lg-none">
                      <a href="index.html" className="gradienntTxt">
                        Logo
                        {/* <img src="assets/img/logo.png" alt="LOGO" class="img-fluid" />  */}
                      </a>
                    </div>
                    {/* Main-menu */}
                    <div className="main-menu d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <a data-scroll href="#home">
                              Home
                            </a>
                          </li>
                          <li>
                            <a data-scroll href="#about">
                              About
                            </a>
                          </li>
                          <li>
                            <a data-scroll href="#services">
                              Services
                            </a>
                          </li>
                          <li>
                            <a data-scroll href="#products">
                              Products
                            </a>
                          </li>
                          <li>
                            <a data-scroll href="#gallery">
                              Gallery
                            </a>
                          </li>
                          <li>
                            <a data-scroll href="#contact">
                              Contact Us
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
