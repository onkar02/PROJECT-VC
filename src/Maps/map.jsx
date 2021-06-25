import React, { Fragment, useState } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
  Polygon,
  Polyline,
} from "react-google-maps";
import {
  CurrentLocation,
  BasicDemo,
  MarkerMap,
  Polygons,
  Polylines,
} from "../../constant";


  
  const MarkupMap = withScriptjs(
    withGoogleMap((props) => {

        const [location, setlocation] = useState({
            address: false,
            mapPosition: {
              lat: 18.5204,
              lng: 73.8567,
            },
            markerPosition: {
              lat: 18.5204,
              lng: 73.8567,
            },
          });
        
          const showinfowindow = () => {
            setlocation({ ...location, address: true });
          };
        
      <GoogleMap
        google={props.google}
        defaultZoom={15}
        defaultCenter={{
          lat: location.mapPosition.lat,
          lng: location.mapPosition.lng,
        }}
      >
        <Marker
          google={props.google}
          name={"Dolores park"}
          draggable={true}
          onClick={showinfowindow}
          position={{
            lat: location.markerPosition.lat,
            lng: location.markerPosition.lng,
          }}
        />
        <Marker />
        {location.address ? (
          <InfoWindow
            position={{
              lat: location.markerPosition.lat + 0.0018,
              lng: location.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>CurrentLocation</span>
            </div>
          </InfoWindow>
        ) : (
          ""
        )}
      </GoogleMap>
    ))
  );

  return (
    <Fragment>
      <Breadcrumb parent="Maps" title="Google Maps" />
      <Container fluid={true}>
        <Row>
          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Enter the location here</h5>
              </CardHeader>
              <CardBody>
                <div className="map-js-height">
                  <div id="gmap-simple" className="map-block">
                    <MarkupMap
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCdXpLSJ3Ibdu-Phs9QOvpqb9d1DtPf7wQ&libraries=places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: "300px" }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default GoogleMaps;
