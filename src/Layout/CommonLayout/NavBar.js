import React, { useState, useEffect } from "react";
import RcIf from "rc-if";
import {
  Container,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Media,
} from "reactstrap";

import { Link, withRouter } from "react-router-dom";
import classname from "classnames";
import darkLogo from "../../assets/images/careerhub.png";
import lightLogo from "../../assets/images/careerhub.png";
import { getUserData } from "../../helpers/helper";
import axios from "axios";

const user = getUserData();
const jobSeekerId = user?.jobSeeker?.jobSeekerId;
const companyId = user?.company?.companyId;
const authToken = user?.access_token;

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

const handleLogout = () => {
  localStorage.clear();
};

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [pages, setPages] = useState(false);
  const [pages1, setPages1] = useState(false);
  const [jobApplies, setJobApplies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //user Profile Dropdown
  const [userProfile, setUserProfile] = useState(false);
  const dropDownuserprofile = () => setUserProfile((prevState) => !prevState);

  //Notification Dropdown
  const [notification, setNotification] = useState(false);
  const dropDownnotification = async () => {
    if (!notification) {
      if (companyId) {
        const resp = await axiosInstance.get(
          `job-apply/seen?companyId=${companyId}`
        );
        const applies = resp.data;
        if (applies.affected > 0) {
          const updatedApplies = jobApplies.map(
            (apply) => (apply.companySeen = true)
          );
          setJobApplies(updatedApplies);
        }
      } else if (jobSeekerId) {
        const resp = await axiosInstance.get(
          `job-apply/seen?jobSeekerId=${jobSeekerId}`
        );
        const applies = resp.data;
        if (applies.affected > 0) {
          const updatedApplies = jobApplies.map(
            (apply) => (apply.seekerSeen = true)
          );
          setJobApplies(updatedApplies);
        }
      }
    }
    return setNotification((prevState) => !prevState);
  };

  //scroll navbar
  const [navClass] = useState(false);

  const closeNavbar = () => {
    setIsOpen(false);
    closeDropdowns();
  };

  const closeDropdowns = () => {
    setPages(false);
    setPages1(false);
  };

  const getTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const notificationTime = new Date(createdAt);

    const timeDifference = currentTime.getTime() - notificationTime.getTime();
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }
  };

  const routeNotification = (job) => {
    if (companyId) {
      if (job) {
        return {
          pathname: "/jobapplicants",
          state: { selectedJobDetails: job },
        };
      } else {
        return {
          pathname: "/managejobs",
        };
      }
    } else {
      return {
        pathname: "/jobapplicationresponse",
      };
    }
  };

  const getUnreadNotification = () => {
    return jobApplies?.filter((apply) =>
      companyId ? !apply.companySeen : !apply.jobSeekerSeen
    ).length;
  };

  const getJobApplies = async () => {
    if (companyId) {
      const resp = await axiosInstance.get(
        `job-apply/entity?companyId=${companyId}`
      );
      const applies = resp.data;
      return applies;
    } else if (jobSeekerId) {
      const resp = await axiosInstance.get(
        `job-apply/entity?jobSeekerId=${jobSeekerId}`
      );
      const applies = resp.data;
      return applies;
    }
  };

  //menu activation
  useEffect(() => {
    let isMounted = true;

    getJobApplies()
      .then((responseData) => {
        if (isMounted) {
          console.log("RESPONSE DATAAAA", responseData);
          setJobApplies(responseData);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    window.scrollTo({ top: 0, behavior: "smooth" });
    var matchingMenuItem = null;
    var ul = document?.getElementById("navbarCollapse");
    var items = ul?.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items?.length; ++i) {
      if (props?.location?.pathname === items[i]?.pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }

    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items?.length; ++i) {
      var item = items[i];
      const parent = items[i]?.parentElement;
      if (item && item?.classList?.contains("active")) {
        item?.classList?.remove("active");
      }
      if (parent) {
        if (parent?.classList.contains("active")) {
          parent?.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement.parentElement.parentElement;

    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <React.Fragment>
        <nav
          className={"navbar navbar-expand-lg fixed-top sticky p-0 " + navClass}
          id="navigation"
        >
          <Container fluid className="custom-container">
            <Link className="navbar-brand text-dark fw-bold me-auto" to="/">
              <img src={darkLogo} height="22" alt="" className="logo-dark" />
              <img src={lightLogo} height="22" alt="" className="logo-light" />
            </Link>
            <div>
              <NavbarToggler
                className="me-3"
                type="button"
                onClick={() => toggle()}
              >
                <i className="mdi mdi-menu"></i>
              </NavbarToggler>
            </div>
            <Collapse
              isOpen={isOpen}
              className="navbar-collapse"
              id="navbarCollapse"
            >
              <ul className="navbar-nav mx-auto navbar-center">
                <NavItem>
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={() => {
                      closeNavbar();
                    }}
                  >
                    Home
                  </Link>
                </NavItem>

                <NavItem className="dropdown dropdown-hover">
                  <li className="nav-item dropdown dropdown-hover">
                    <NavLink
                      to="/#"
                      id="homedrop"
                      className="arrow-none"
                      onClick={() => {
                        setPages(!pages);
                      }}
                    >
                      Jobs <div className="arrow-down"></div>
                    </NavLink>
                    <ul
                      className={classname(
                        "dropdown-menu  dropdown-menu-center",
                        { show: pages }
                      )}
                      aria-labelledby="homedrop"
                      style={{ width: "100px" }}
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/joblist"
                          onClick={() => {
                            closeNavbar();
                          }}
                        >
                          Job List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/jobscategories"
                          onClick={() => {
                            closeNavbar();
                          }}
                        >
                          Jobs Categories
                        </Link>
                      </li>
                    </ul>
                  </li>
                </NavItem>
                <RcIf if={user?.role == "company"}>
                  <NavItem>
                    <Link
                      className="nav-link"
                      to="/Pricing"
                      onClick={() => {
                        closeNavbar();
                      }}
                    >
                      Pricing
                    </Link>
                  </NavItem>
                </RcIf>
                <NavItem>
                  <Link
                    className="nav-link"
                    to="/aboutus"
                    onClick={() => {
                      closeNavbar();
                    }}
                  >
                    About Us
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className="nav-link"
                    to="/contact"
                    onClick={() => {
                      closeNavbar();
                    }}
                  >
                    Contact
                  </Link>
                </NavItem>
                <NavItem className="dropdown dropdown-hover profile-dropdown">
                  <li className="nav-item dropdown dropdown-hover">
                    <NavLink
                      to="/#"
                      id="homedrop"
                      className="arrow-none"
                      onClick={() => {
                        setPages1(!pages1);
                      }}
                    >
                      Profile <div className="arrow-down"></div>
                    </NavLink>
                    <ul
                      className={classname(
                        "dropdown-menu  dropdown-menu-center",
                        { show: pages1 }
                      )}
                      aria-labelledby="homedrop"
                      style={{ width: "100px" }}
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/myprofile"
                          onClick={() => {
                            closeNavbar();
                          }}
                        >
                          My Profile
                        </Link>
                      </li>
                      <RcIf if={user?.role == "jobSeeker"}>
                    <li>
                      <Link className="dropdown-item" to="/bookmarkjobs">
                        Applied Jobs
                      </Link>
                    </li>
                  </RcIf>
                  <RcIf if={user?.role == "company"}>
                    <li>
                      <Link className="dropdown-item" to="/bookmarkjobpost">
                        Create Job Post
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/managejobs">
                        Manage Jobs
                      </Link>
                    </li>
                  </RcIf>
                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={() => {
                            closeNavbar();
                            handleLogout();
                          }}
                          to="/signout"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </NavItem>
              </ul>
            </Collapse>

            <ul className="header-menu list-inline d-flex align-items-center mb-0">
              <RcIf if={user?.username == null}>
                <Link to="/signin" className="btn btn-primary btn-hover">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-hover ms-3">
                  Register
                </Link>
              </RcIf>
              <RcIf if={user?.username != null}>
                {/* NOTIFICATIONN */}

                <Dropdown
                  isOpen={notification}
                  toggle={dropDownnotification}
                  className="list-inline-item  me-4"
                >
                  <DropdownToggle
                    href="#"
                    className="header-item noti-icon position-relative"
                    id="notification"
                    type="button"
                    tag="a"
                  >
                    <i className="mdi mdi-bell fs-22"></i>
                    <RcIf if={getUnreadNotification() > 0}>
                      <div className="count position-absolute">
                        {getUnreadNotification()}
                      </div>
                    </RcIf>
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropdown-menu-sm dropdown-menu-end p-0"
                    aria-labelledby="notification"
                    end
                  >
                    <div className="notification-header border-bottom bg-light">
                      <h6 className="mb-1"> Notification </h6>
                      <RcIf if={getUnreadNotification() > 0}>
                        <p className="text-muted fs-13 mb-0">
                          You have {getUnreadNotification()} unread Notification
                        </p>
                      </RcIf>
                    </div>
                    <div className="notification-wrapper dropdown-scroll">
                      {jobApplies?.map((apply, i) => {
                        return (
                          <Link
                            to={routeNotification(apply?.job)}
                            className="text-dark notification-item d-block active"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-xs bg-primary text-white rounded-circle text-center">
                                  <i className="uil uil-user-check"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mt-0 mb-1 fs-14">
                                  {apply?.job?.title} application
                                </h6>
                                <p className="mb-0 fs-12 text-muted">
                                  <i className="mdi mdi-clock-outline"></i>{" "}
                                  <span>
                                    {getTimeAgo(
                                      companyId
                                        ? apply?.createdAt
                                        : apply?.updatedAt
                                    )}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="notification-footer border-top text-center">
                      <Link
                        className="primary-link fs-13"
                        to={routeNotification(null)}
                      >
                        <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
                        <span>View More..</span>
                      </Link>
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </RcIf>
              <Dropdown
                onClick={() => setUserProfile(!userProfile)}
                isOpen={userProfile}
                toggle={dropDownuserprofile}
                className="list-inline-item"
              >
                <DropdownToggle
                  to="#"
                  className="header-item"
                  id="userdropdown"
                  type="button"
                  tag="a"
                  aria-expanded="false"
                >
                  <RcIf if={user?.username != null}>
                    <span className="d-none d-md-inline-block fw-medium">
                      Hi, {user?.username}
                    </span>
                  </RcIf>
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-end"
                  aria-labelledby="userdropdown"
                  end
                >
                  <li>
                    <Link className="dropdown-item" to="/myprofile">
                      My Profile
                    </Link>
                  </li>
                  <RcIf if={user?.role == "jobSeeker"}>
                    <li>
                      <Link className="dropdown-item" to="/bookmarkjobs">
                        Applied Jobs
                      </Link>
                    </li>
                  </RcIf>
                  <RcIf if={user?.role == "company"}>
                    <li>
                      <Link className="dropdown-item" to="/bookmarkjobpost">
                        Create Job Post
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/managejobs">
                        Manage Jobs
                      </Link>
                    </li>
                  </RcIf>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={handleLogout}
                      to="/signout"
                    >
                      Logout
                    </Link>
                  </li>
                </DropdownMenu>
              </Dropdown>
            </ul>
          </Container>
        </nav>
      </React.Fragment>
    );
  }
};

export default withRouter(NavBar);
