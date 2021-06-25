import React from "react";
import "./assets/css/flaticon.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/slicknav.css";
import "./assets/css/normalize.min.css";
import "./assets/css/device.css";
import "./assets/css/prettyPhoto.css";
function Product(props) {
  const products = props?.details?.Products;
  // console.log(products.Products);

  const preview = products.map((product, index) => (
    <div className="col-sm-4" key={`${product}~${index}`}>
      <div className="itemsWrap">
        <div className="imgWrap">
          <img src={product.upload_image} className="img-fluid" alt="" />
        </div>
        <div className="dataWrap">
          <h3>{product.product_name}</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div id="products" className="serviceProductWrap productsWrap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="dataWrap commonDiv">
              <h5 className="blurTitle">Products</h5>
              <h6>Our Products</h6>
              <h2>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.{" "}
              </h2>
            </div>
          </div>
        </div>
        <div className="row pt-5">{preview}</div>
      </div>
    </div>
  );
}

export default Product;
