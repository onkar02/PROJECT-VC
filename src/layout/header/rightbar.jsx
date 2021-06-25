import React, { Fragment, useState, useEffect } from "react";

import { FileText, LogIn, Mail, User, Bell, Minimize } from "react-feather";
import { useHistory } from "react-router-dom";
import { firebase_app } from "../../data/config";
import { useAuth0 } from "@auth0/auth0-react";
// import Bookmark from "../../layout/bookmark";
// import { Link } from "react-router-dom";
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  translate,
} from "react-switch-lang";

import {
  // English,
  // Deutsch,
  // Español,
  // Français,
  // Português,
  // 简体中文,
  Notification,
  DeliveryProcessing,
  OrderComplete,
  TicketsGenerated,
  DeliveryComplete,
  CheckAllNotification,
  Account,
  Inbox,
  Taskboard,
  LogOut,
} from "../../constant";

import en from "../../assets/i18n/en.json";
import es from "../../assets/i18n/es.json";
import pt from "../../assets/i18n/pt.json";
import fr from "../../assets/i18n/fr.json";
import du from "../../assets/i18n/du.json";
import cn from "../../assets/i18n/cn.json";
import ae from "../../assets/i18n/ae.json";

setTranslations({ en, es, pt, fr, du, cn, ae });
setDefaultLanguage("en");
setLanguageCookie();

const Rightbar = (props) => {
  const history = useHistory();

  const [moonlight, setMoonlight] = useState(false);

  const [notificationDropDown, setNotificationDropDown] = useState(false);

  const { logout } = useAuth0();

  const currentuser = firebase_app.auth()?.currentUser;
  const url = currentuser?.photoURL;
  console.log(currentuser);
  console.log(currentuser?.displayName);

  useEffect(() => {
    if (localStorage.getItem("layout_version") === "dark-only") {
      setMoonlight(true);
    }
  }, []);

  const Logout_From_Firebase = () => {
    // localStorage.removeItem("username");
    // localStorage.removeItem("password");
    firebase_app.auth().signOut();
    window.location.href = `${process.env.PUBLIC_URL}/login`;
  };

  const UserMenuRedirect = (redirect) => {
    history.push(redirect);
  };

  //full screen function
  function goFull() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light);
      document.body.className = "light";
      localStorage.setItem("layout_version", "light");
    } else {
      setMoonlight(!light);
      document.body.className = "dark-only";
      localStorage.setItem("layout_version", "dark-only");
    }
  };

  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          {/* <li className="onhover-dropdown">
            <div
              className="notification-box"
              onClick={() => setNotificationDropDown(!notificationDropDown)}
            >
              <Bell />
              <span className="badge badge-pill badge-secondary">2</span>
            </div>
            <ul
              className={`notification-dropdown onhover-show-div ${
                notificationDropDown ? "active" : ""
              }`}
            >
              <li>
                <Bell />
                <h6 className="f-18 mb-0">{Notification}</h6>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-primary"> </i>
                  {DeliveryProcessing}{" "}
                  <span className="pull-right">{"10 min."}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-success"></i>
                  {OrderComplete}
                  <span className="pull-right">{"1 hr"}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-info"></i>
                  {TicketsGenerated}
                  <span className="pull-right">{"3 hr"}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-danger"></i>
                  {DeliveryComplete}
                  <span className="pull-right">{"6 hr"}</span>
                </p>
              </li>
              <li>
                <button className="btn btn-primary">
                  {CheckAllNotification}
                </button>
              </li>
            </ul>
          </li> */}
          <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)}>
              <i
                className={`fa ${moonlight ? "fa-lightbulb-o" : "fa-moon-o"}`}
              ></i>
            </div>
          </li>

          <li className="maximize">
            <a className="text-dark" href="#javascript" onClick={goFull}>
              <Minimize />
            </a>
          </li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img
                className="b-r-10"
                src={currentuser && currentuser.photoURL}
                alt=""
              />
              <div className="media-body">
                <span>{currentuser && currentuser.displayName}</span>
                <p className="mb-0 font-roboto">
                  {currentuser?.email}
                  <i className="middle fa fa-angle-down"></i>
                </p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              {/* <li
                onClick={() =>
                  UserMenuRedirect(
                    `${process.env.PUBLIC_URL}/app/users/userProfile`
                  )
                }
              >
                <User />
                <span>{Account} </span>
              </li>
              <li
                onClick={() =>
                  UserMenuRedirect(`${process.env.PUBLIC_URL}/app/email-app`)
                }
              >
                <Mail />
                <span>{Inbox}</span>
              </li>
              <li
                onClick={() =>
                  UserMenuRedirect(
                    `${process.env.PUBLIC_URL}/app/todo-app/todo`
                  )
                }
              >
                <FileText />
                <span>{Taskboard}</span>
              </li> */}
              <li onClick={Logout_From_Firebase}>
                <LogIn />
                <span>{LogOut}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default translate(Rightbar);
