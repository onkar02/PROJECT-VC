import { db } from "../../data/config";
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios-orders";

import Header from "./Header";
import Footer from "./Footer";
import Gallery from "./Gallery";
import AboutUS from "./AboutUS";
import Services from "./Services";
import Products from "./Product";

function Previewpage(props) {
  const [aboutus, setAboutUS] = useState(null);
  const [product, setProduct] = useState(null);
  const [services, setServices] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [personal, setPersonal] = useState(null);
  const [bank, setBank] = useState(null);
  const [urls, setUrls] = useState(null);
  // const [personal, setPresonal] = useState("");
  // const [website, setWebsite] = useState("");
  // const [address, setAddress] = useState("");
  // const [imageasurl, setImageAsURL] = useState("");
  // const [username, setUserName] = useState("");
  const [profileVisitCount, setProfileVisitCount] = useState(0);
  const username_id = props.match.params?.id;
  console.log(props);
  const url = window.location.href;
  console.log(url);
  useEffect(() => {
    axios
      .get(
        `https://project-vc-1f8d2-default-rtdb.firebaseio.com/users/${username_id}.json`
      )
      .then((response) => {
        const dd = response.data;
        db.collection("users")
          .doc(dd)
          .collection("data")
          .doc("Personal Details")
          .get()
          .then((snspshot) => {
            db.collection("users")
              .doc(dd)
              .collection("data")
              .doc("Personal Details")
              .update({
                profileVisitCount: snspshot.data().profileVisitCount + 1,
              });
          });

        db.collection("users")
          .doc(dd)
          .collection("data")
          .get()
          .then(async (snapshot) => {
            snapshot.docs.forEach((data) => {
              if (data.id === "About_us") {
                setAboutUS(data.data());
              }
              if (data.id === "Bank Details") {
                setBank(data.data());
              }
              if (data.id === "Gallary") {
                setGallery(data.data());
              }
              if (data.id === "Personal Details") {
                setPersonal(data.data());
              }
              if (data.id === "Products") {
                setProduct(data.data());
              }
              if (data.id === "Services") {
                setServices(data.data());
              }
              if (data.id === "Social URL'S") {
                setUrls(data.data());
              }
              // console.log(data.id);
              // console.log(data.data());
            });
          });
      });
  }, []);

  let id = useParams();
  const gotusername = id.id;
  return (
    <Fragment>
      <Header />
      <main>
        <div id="home" className="bannerWrap">
          <div className="container-fluid">
            <div className="row gradientClr align-items-center justify-content-center">
              <div className="col-md-8 p-0">
                <div className="leftPannel">
                  <div className="dataWrap">
                    <div className="fortopTBBorder">
                      <h2>
                        Lorem ipsum dolor sit amet, <br /> consectetuer
                        adipiscing elit.{" "}
                      </h2>
                      <p>
                        Morbi in sem quis dui placerat ornare. Pellentesque odio
                        nisi, euismod in, pharetra a, ultricies in, diam. Sed
                        arcu. Cras consequat.
                      </p>
                      <button className="btn">
                        <span className="gradienntTxt">Call</span>
                      </button>
                      <button className="btn">
                        <span className="gradienntTxt">What's App</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {aboutus && <AboutUS details={aboutus} userId={username_id} />}
        {services && <Services details={services} userId={username_id} />}
        {product && <Products details={product} userId={username_id} />}
        {gallery && <Gallery details={gallery} userId={username_id} />}

        <Footer />
        <script src="assets/js/jquery-1.12.4.min.js"></script>
        <script src="assets/js/popper.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/main.js"></script>
        <script src="assets/js/camera.min.js"></script>
        {/* <script>
         jQuery(function(){
                 jQuery('#camera_wrap_1').camera({
                 transPeriod: 500,
                 time: 3000,
                 height: '490px',
                 thumbnails: false,
                 pagination: true,
                 playPause: false,
                 loader: false,
                 navigation: false,
                 hover: false
             });
         });
      </script>
      <script src="assets/js/jquery.prettyPhoto.js"></script>
      <script>
         jQuery(document).ready(function(){
         	jQuery(".pretty a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false, social_tools: ''});		
         });
               
      </script>
      <script>
          jQuery(document).ready(function($){
            function scrollToSection(event) {
                event.preventDefault();
                var $section = $($(this).attr('href')); 
                $('html, body').animate({
                scrollTop: $section.offset().top
                }, 500);
            }
            $('[data-scroll]').on('click', scrollToSection);
        }(jQuery));
      </script> */}
      </main>
    </Fragment>
  );
}

export default Previewpage;
