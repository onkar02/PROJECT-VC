import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MENUITEMS } from "./menu";
import { ArrowRight, ArrowLeft, Grid } from "react-feather";
import { Link } from "react-router-dom";
import { translate } from "react-switch-lang";
import configDB from "../../data/customizer/config";

const Sidebar = (props) => {
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [margin, setMargin] = useState(0);
  const [width, setWidth] = useState(0);
  const [sidebartoogle, setSidebartoogle] = useState(true);
  const wrapper =
    useSelector((content) => content.Customizer.sidebar_types.type) ||
    configDB.data.settings.sidebar.type;

  useEffect(() => {
    document.querySelector(".left-arrow").classList.add("d-none");

    window.addEventListener("resize", handleResize);
    handleResize();

    const currentUrl = window.location.pathname;
    mainmenu.map((items) => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth - 500);
  };

  const setNavActive = (item) => {
    MENUITEMS.map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (Items !== item) Items.active = false;
        if (Items.children && Items.children.includes(item))
          Items.active = true;
        if (Items.children) {
          Items.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true;
              submenuItems.active = true;
              return true;
            } else {
              return false;
            }
          });
        }
        return Items;
      });
      return menuItems;
    });
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if (width === 492) {
        setMargin(-3570);
      } else {
        setMargin(-3464);
      }
      document.querySelector(".right-arrow").classList.add("d-none");
      document.querySelector(".left-arrow").classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += -width));
      document.querySelector(".left-arrow").classList.remove("d-none");
    }
  };

  const scrollToLeft = () => {
    if (margin >= -width) {
      setMargin(0);
      document.querySelector(".left-arrow").classList.add("d-none");
      document.querySelector(".right-arrow").classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += width));
      document.querySelector(".right-arrow").classList.remove("d-none");
    }
  };

  const openCloseSidebar = (toggle) => {
    if (toggle) {
      setSidebartoogle(!toggle);
      document.querySelector(".page-header").className =
        "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className =
        "sidebar-wrapper close_icon ";
    } else {
      setSidebartoogle(!toggle);
      document.querySelector(".page-header").className = "page-header";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
    }
  };

  const responsiveSidebar = () => {
    document.querySelector(".page-header").className = "page-header close_icon";
    document.querySelector(".sidebar-wrapper").className =
      "sidebar-wrapper close_icon";
  };

  return (
    <Fragment>
      <div className="sidebar-wrapper">
        <div className="logo-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/userDashboard`}>
            {/* <img
              className="img-fluid for-light"
              src={require("../../assets/images/logo/logo.png")}
              alt=""
            /> */}
            {/* <img
              className="img-fluid for-dark"
              src={require("../../assets/images/logo/logo_dark.png")}
              alt=""
            /> */}
          </Link>
          <div className="back-btn" onClick={() => responsiveSidebar()}>
            <i className="fa fa-angle-left"></i>
          </div>
          <div
            className="toggle-sidebar"
            onClick={() => openCloseSidebar(sidebartoogle)}
          >
            <Grid className="status_toggle middle sidebar-toggle" />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/userDashboard`}>
            <img
              className="img-fluid"
              src={require("../../assets/images/logo/logo-icon.png")}
              alt=""
            />
          </Link>
        </div>
        <nav className="sidebar-main">
          <div className="left-arrow" onClick={scrollToLeft}>
            <ArrowLeft />
          </div>
          <div
            id="sidebar-menu"
            style={
              wrapper === "horizontal-wrapper"
                ? { marginLeft: margin + "px" }
                : { margin: "0px" }
            }
          >
            <ul className="sidebar-links custom-scrollbar">
              <li className="back-btn">
                <div className="mobile-back text-right">
                  <span>{"Back"}</span>
                  <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                </div>
              </li>
              {MENUITEMS.map((Item, i) => (
                <Fragment key={i}>
                  {Item.Items.map((menuItem, i) => (
                    <li className="sidebar-list" key={i}>
                      {menuItem.type === "link" ? (
                        <Link
                          to={menuItem.path}
                          className={`sidebar-link sidebar-title link-nav 
                          `}
                          href="#javascript"
                        >
                          <menuItem.icon />
                          <span>{props.t(menuItem.title)}</span>
                          {menuItem.badge ? (
                            <label className={menuItem.badge}>
                              {menuItem.badgetxt}
                            </label>
                          ) : (
                            ""
                          )}
                        </Link>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </Fragment>
              ))}
            </ul>
          </div>
          <div className="right-arrow" onClick={scrollToRight}>
            <ArrowRight />
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default translate(Sidebar);
