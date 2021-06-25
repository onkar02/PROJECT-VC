import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { firebase_app, auth0 } from "./data/config";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./store";
import App from "./components/app";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { routes } from "./route";
import ConfigDB from "./data/customizer/config";
import { configureFakeBackend } from "./services/fack.backend";

// Signin page
import SignIn from "./components/signin/SignIn";

// Authentication
// import Login from "./pages/authentication/login";

import Register from "./pages/authentication/register";

import UnlockUser from "./pages/authentication/unlockUser";
import Forgetpwd from "./pages/authentication/forgetpwd";
import Resetpwd from "./pages/authentication/resetpwd";
import Previewpage from "./components/previewpage/Previewpage";

// setup fake backend
configureFakeBackend();

const Root = (props) => {
  const [anim, setAnim] = useState("");
  const animation =
    localStorage.getItem("animation") ||
    ConfigDB.data.router_animation ||
    "fade";

  // const abortController = new AbortController();
  const [currentuser, setCurrentUser] = useState();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // const requestOptions = { method: "GET", headers: authHeader() };
    // fetch("/users", requestOptions).then(handleResponse);
    setAnim(animation);
    firebase_app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;

    // return function cleanup() {
    //   abortController.abort();
    // };

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Auth0Provider
        domain={auth0.domain}
        clientId={auth0.clientId}
        redirectUri={auth0.redirectUri}
      >
        <Provider store={store}>
          <BrowserRouter basename={`/`}>
            <Switch>
              <Route
                path={`${process.env.PUBLIC_URL}/login`}
                component={SignIn}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/auth/login`}
                component={SignIn}
              ></Route>

              <Route
                path={`${process.env.PUBLIC_URL}/pages/auth/signup`}
                component={Register}
              ></Route>

              <Route
                path={`${process.env.PUBLIC_URL}/pages/auth/forgetPwd`}
                component={Forgetpwd}
              ></Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/auth/unlockUser`}
                component={UnlockUser}
              ></Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/auth/resetPwd`}
                component={Resetpwd}
              ></Route>
              <Route
                path={`${process.env.PUBLIC_URL}/user/:id`}
                component={Previewpage}
              ></Route>
              {/* 
              <Route
                path={`${process.env.PUBLIC_URL}/callback`}
                render={() => <Callback />}
              /> */}

              {currentuser !== null || authenticated ? (
                <App>
                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/`}
                    render={() => {
                      return (
                        <Redirect
                          to={`${process.env.PUBLIC_URL}/dashboard/userDashboard`} //home page should be here
                        />
                      );
                    }}
                  />
                  <TransitionGroup>
                    {routes.map(({ path, Component }) => (
                      <Route
                        key={path}
                        exact
                        path={`${process.env.PUBLIC_URL}${path}`}
                      >
                        {({ match }) => (
                          <CSSTransition
                            in={match != null}
                            timeout={100}
                            classNames={anim}
                            unmountOnExit
                          >
                            <div>
                              <Component />
                            </div>
                          </CSSTransition>
                        )}
                      </Route>
                    ))}
                  </TransitionGroup>
                </App>
              ) : (
                <Redirect to={`${process.env.PUBLIC_URL}/login`} />
              )}
            </Switch>
          </BrowserRouter>
        </Provider>
      </Auth0Provider>
    </Fragment>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
