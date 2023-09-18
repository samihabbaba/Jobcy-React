/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import RcIf, { RcElse } from "rc-if";
import axios from "axios";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import {
  Col,
  Row,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Input,
  Form,
  NavItem,
  CardBody,
  Label,
} from "reactstrap";

import classnames from "classnames";
import {
  getUserData,
  setCompanyLocal,
  setSeekerLocal,
  getCompanyLocal,
  getSeekerLocal,
} from "../../../helpers/helper";
axios.defaults.baseURL = "http://localhost:3000";

const user = getUserData();

const RightSideContent = () => {
  const [jobSeeker, setJobSeeker] = useState(getSeekerLocal() || null);
  const [companyy, setCompanyy] = useState(getCompanyLocal() || null);
  const [activeTab, setActiveTab] = useState("1");
  //job-seeker
  const [name, setName] = useState(jobSeeker?.name || "");
  const [surname, setSurname] = useState(jobSeeker?.surname || "");
  const [title, setTitle] = useState(jobSeeker?.title || "");
  const [telephone, setTelephone] = useState(user?.telephone);
  const [linkedIn, setLinkedIn] = useState(jobSeeker?.linkedIn || "");
  const [email, setEmail] = useState(jobSeeker?.email || "");
  const [location, setLocation] = useState(
    jobSeeker?.location || companyy?.location || ""
  );
  const [about, setAbout] = useState(jobSeeker?.about || companyy?.about || "");
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState(jobSeeker?.skills || []);
  const [newLanguage, setNewLanguage] = useState("");
  const [languages, setLanguages] = useState(jobSeeker?.languages || []);

  //company
  const [companyName, setCompanyName] = useState(companyy?.companyName || "");
  const [owner, setOwner] = useState(companyy?.owner || "");
  const [employees, setEmployees] = useState(companyy?.employees || "");
  const [website, setWebsite] = useState(companyy?.website || "");
  const [established, setEstablished] = useState(
    companyy?.established || new Date()
  );
  const [linkedId, setLinkedId] = useState(companyy?.linkedId || "");
  const [companyEmail, setCompanyEmail] = useState(
    companyy?.companyEmail || ""
  );
  const [sector, setSector] = useState(companyy?.sector || "");
  const [companyJobs, setCompanyJobs] = useState([]);

  const jobSeekerId = user?.jobSeeker?.jobSeekerId;
  const companyId = user?.company?.companyId;

  const authToken = user?.access_token;
  const [experience, setExperience] = useState(jobSeeker?.experience || []);
  const [education, setEducation] = useState(jobSeeker?.education || []);
  const [showModal, setShowModal] = useState(false);

  const customModalStyles = {
    content: {
      width: "500px",
      height: "300px",
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: "10px",
      outline: "none",
      padding: "20px",
    },
    closeBtn: {
      position: "absolute",
      top: "10px",
      right: "15px",
      cursor: "pointer",
      fontSize: "20px",
      fontWeight: "bold",
    },
  };

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const getJobSeekerById = async () => {
    if (jobSeekerId) {
      const resp = await axiosInstance.get(`/job-seeker/${jobSeekerId}`);
      const jobSeekerdata = resp.data;
      setJobSeeker({ ...jobSeekerdata });
      setSeekerLocal(jobSeekerdata);
      console.log(jobSeeker, resp.data);
    }
  };

  const getCompanyById = async () => {
    if (companyId) {
      const resp = await axiosInstance.get(`/company/${companyId}`);
      const companyData = resp.data;
      setCompanyy({ ...companyData });
      setCompanyLocal(companyData);
      setCompanyJobs(companyData.jobs);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills((prevSkills) => [...prevSkills, newSkill.trim()]);
      setNewSkill(""); // Reset the input field after adding
    }
  };

  const removeSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    if (newLanguage.trim() !== "") {
      setLanguages((prevLanguages) => [...prevLanguages, newLanguage.trim()]);
      setNewLanguage(""); // Reset the input field after adding
    }
  };

  const removeLanguage = (index) => {
    setLanguages((prevLanguages) =>
      prevLanguages.filter((_, i) => i !== index)
    );
  };

  const addExperience = async () => {
    setExperience((prevExperience) => [...prevExperience, {}]);
  };
  const deleteExperience = (index) => {
    setExperience((prevExperience) => {
      const updateExperience = [...prevExperience];
      updateExperience.splice(index, 1); // Remove the item at the specified index
      return updateExperience;
    });
  };
  const handleExpChange = (index, field, event) => {
    let updateExperience;

    if (experience.length === 0) {
      updateExperience = [jobSeeker?.experience];
    } else {
      updateExperience = [...experience];
    }

    updateExperience[index][field] = event.target.value;

    setExperience(updateExperience);
  };
  const addEducation = () => {
    setEducation((prevEducation) => [...prevEducation, {}]);
  };
  const deleteEducation = (index) => {
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation.splice(index, 1); // Remove the item at the specified index
      return updatedEducation;
    });
  };
  const handleEduChange = (index, field, event) => {
    let updateEducation;

    if (education.length === 0) {
      updateEducation = [...jobSeeker.education];
    } else {
      updateEducation = [...education];
    }

    updateEducation[index][field] = event.target.value;

    setEducation(updateEducation);
  };

  const handleSubmitJobseeker = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance
        .put("/job-seeker", {
          jobSeekerId,
          name,
          surname,
          title,
          telephone,
          linkedIn,
          email,
          location,
          about,
          skills,
          languages,
          experience,
          education,
        })
        .then(async () => {
          setShowModal(true);
          getJobSeekerById();
        });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      // Handle error, e.g., display error message
      console.error("Error updating", error);
    }
  };
  const handleSubmitCompany = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance
        .put("/company", {
          companyId,
          companyName,
          telephone,
          linkedId,
          owner,
          employees,
          location,
          about,
          website,
          established,
          companyEmail,
          sector,
        })
        .then(async () => {
          setShowModal(true);
          getCompanyById();
        });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      // Handle error, e.g., display error message
      console.error("Error updating", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    tabChange("1");
  };
  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    console.log(education);
  };

  const fetchData = async () => {
    if (user.role === "jobSeeker") {
      await getJobSeekerById();
      console.log(jobSeeker);
    } else if (user.role === "company") {
      await getCompanyById();
      console.log(companyJobs);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Col lg={8}>
        <Card className="profile-content-page mt-4 mt-lg-0">
          <Nav
            className="profile-content-nav nav-pills border-bottom mb-4"
            id="pills-tab"
            role="tablist"
          >
            <NavItem role="presentation">
              <NavLink
                to="#"
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  tabChange("1");
                }}
                type="button"
              >
                Overview
              </NavLink>
            </NavItem>
            <NavItem role="presentation">
              <NavLink
                to="#"
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  tabChange("2");
                }}
                type="button"
              >
                Edit Profile
              </NavLink>
            </NavItem>
          </Nav>
          <CardBody className="p-4">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <RcIf if={user?.role === "company"}>
                  <div>
                    <h5 className="fs-18 fw-bold">About</h5>
                    <p className="text-muted mt-4">{about}</p>
                  </div>
                </RcIf>
                <RcIf if={user?.role === "jobSeeker"}>
                  <div>
                    <h5 className="fs-18 fw-bold"> About</h5>
                    <p className="text-muted mt-4">{jobSeeker?.about}</p>
                  </div>
                  <RcIf if={jobSeeker?.education?.length > 0}>
                    <div className="candidate-education-details mt-4">
                      <h6 className="fs-18 fw-bold mb-0">Education</h6>
                      <div>
                        {jobSeeker?.education?.map((education, index) => {
                          const startdate = new Date(
                            education.startDate
                          ).getFullYear();
                          const enddate = new Date(
                            education.startDate
                          ).getFullYear();

                          return (
                            <div key={index}>
                              <div className="candidate-education-content mt-4 d-flex">
                                <div className="circle flex-shrink-0 bg-soft-primary">
                                  {education.expName.charAt(0)}
                                </div>
                                <div className="ms-4">
                                  <h6 className="fs-16 mb-1">
                                    {education.expName}
                                  </h6>
                                  <p className="mb-2 text-muted">
                                    {education.title} - ({startdate} - {enddate}
                                    )
                                  </p>
                                  <p className="text-muted">
                                    {education.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </RcIf>

                  <RcIf if={jobSeeker?.experience?.length > 0}>
                    <div className="candidate-education-details mt-4">
                      <h6 className="fs-18 fw-bold mb-0">Experiences</h6>
                      <div>
                        {jobSeeker?.experience?.map((experience, index) => {
                          const startdate = new Date(
                            experience.startDate
                          ).getFullYear();
                          const enddate = new Date(
                            experience.startDate
                          ).getFullYear();

                          return (
                            <div key={index}>
                              <div className="candidate-education-content mt-4 d-flex">
                                <div className="circle flex-shrink-0 bg-soft-primary">
                                  {experience.expName.charAt(0)}
                                </div>
                                <div className="ms-4">
                                  <h6 className="fs-16 mb-1">
                                    {experience.expName}
                                  </h6>
                                  <p className="mb-2 text-muted">
                                    {experience.title} - ({startdate} -{" "}
                                    {enddate})
                                  </p>
                                  <p className="text-muted">
                                    {experience.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </RcIf>

                  <RcIf if={jobSeeker?.skills?.length > 0}>
                    <div className="mt-4">
                      <h5 className="fs-18 fw-bold">Skills</h5>
                    </div>
                    <div className="mt-0 d-flex flex-wrap align-items-start gap-1">
                      {jobSeeker?.skills?.map((skill, index) => (
                        <div key={index}>
                          <span className="badge fs-13 bg-soft-blue mt-2">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </RcIf>
                  <RcIf if={jobSeeker?.languages?.length > 0}>
                    <div className="mt-4">
                      <h5 className="fs-18 fw-bold">Spoken Languages</h5>
                    </div>
                    <div className="mt-0 d-flex flex-wrap align-items-start gap-1">
                      {jobSeeker?.languages?.map((lang, index) => (
                        <div key={index}>
                          <span className="badge fs-13 bg-soft-success mt-2">
                            {lang}
                          </span>
                        </div>
                      ))}
                    </div>
                  </RcIf>
                </RcIf>
              </TabPane>
              <TabPane tabId="2">
                <RcIf if={user?.role === "company"}>
                  <Form onSubmit={handleSubmitCompany} className="edit-form">
                    <div>
                      <h5 className="fs-17 fw-semibold mb-3 mb-0">
                        My Account
                      </h5>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="companyName" className="form-label">
                              Company Name
                            </label>
                            <FormControl
                              type="text"
                              className="form-control"
                              id="companyName"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="telephone" className="form-label">
                              Telephone
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="telephone"
                              value={telephone}
                              onChange={(e) => setTelephone(e.target.value)}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="owner" className="form-label">
                              Owner
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="owner"
                              value={owner}
                              onChange={(e) => setOwner(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="email" className="form-label">
                              Email
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="email"
                              value={companyEmail}
                              onChange={(e) => setCompanyEmail(e.target.value)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="mt-4">
                      <h5 className="fs-17 fw-semibold mb-3">Profile</h5>
                      <Row>
                        <Col lg={12}>
                          <div className="mb-3">
                            <Label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label"
                            >
                              Introduce Your Company
                            </Label>
                            <FormControl
                              className="form-control"
                              as="textarea"
                              rows="5"
                              id="about"
                              value={about}
                              onChange={(e) => setAbout(e.target.value)}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="employees" className="form-label">
                              Employee Number
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="employees"
                              value={employees}
                              onChange={(e) => setEmployees(e.target.value)}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="location" className="form-label">
                              Location
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="employees"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="mt-4">
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="sector" className="form-label">
                              Sector
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="sector"
                              value={sector}
                              onChange={(e) => setSector(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="website" className="form-label">
                              Website
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="website"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="linkedin" className="form-label">
                              Linkedin
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="linkedin"
                              value={linkedId}
                              onChange={(e) => setLinkedId(e.target.value)}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="established" className="form-label">
                              Established
                            </Label>
                            <Input
                              type="date"
                              className="form-control"
                              id="established"
                              value={established}
                              onChange={(e) => setEstablished(e.target.value)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="mt-4 text-end">
                      <button
                        type="submite"
                        className="btn btn-blue btn-hover w-25"
                      >
                        Update
                      </button>
                      <Modal
                        isOpen={showModal}
                        onRequestClose={handleCloseModal}
                        style={customModalStyles}
                        contentLabel="Sign Up Modal"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <h2>UPDATED!</h2>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="64"
                              height="64"
                              viewBox="0 0 24 24"
                              fill="#008000"
                            >
                              <path d="M9 16.172l-4.586-4.586-1.414 1.414 6 6 .586.586.586-.586 10-10-1.414-1.414z" />
                            </svg>
                          </div>
                          <div
                            style={customModalStyles.closeBtn}
                            onClick={handleCloseModal}
                          >
                            X
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </Form>
                </RcIf>
                <RcIf if={user?.role === "jobSeeker"}>
                  <Form onSubmit={handleSubmitJobseeker} className="edit-form">
                    <div>
                      <h5 className="fs-17 fw-semibold mb-3 mb-0">
                        My Account
                      </h5>

                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="lastName" className="form-label">
                              Last Name
                            </Label>
                            <FormControl
                              type="text"
                              className="form-control"
                              id="lastName"
                              value={surname}
                              onChange={(e) => setSurname(e.target.value)}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="lastName" className="form-label">
                              Job Title
                            </Label>
                            <FormControl
                              type="text"
                              className="form-control"
                              id="jobTitle"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="email" className="form-label">
                              Email
                            </Label>
                            <FormControl
                              type="text"
                              className="form-control"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="telephone" className="form-label">
                              Telephone
                            </Label>
                            <FormControl
                              type="text"
                              className="form-control"
                              id="telephone"
                              value={telephone}
                              onChange={(e) => setTelephone(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="email" className="form-label">
                              LinkedIn Profile
                            </Label>
                            <FormControl
                              type="text"
                              className="form-control"
                              id="linkedIn"
                              value={linkedIn}
                              onChange={(e) => setLinkedIn(e.target.value)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="mt-4">
                      <h5 className="fs-17 fw-semibold mb-3">Profile</h5>
                      <Row>
                        <Col lg={12}>
                          <div className="mb-3">
                            <Label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label"
                            >
                              Introduce Yourself
                            </Label>
                            <FormControl
                              className="form-control"
                              as="textarea"
                              rows="5"
                              id="about"
                              value={about}
                              onChange={(e) => setAbout(e.target.value)}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <label
                              htmlFor="choices-single-location"
                              className="form-label"
                            >
                              Location
                            </label>

                            <FormControl
                              type="text"
                              className="form-control"
                              id="location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <h5 className="fs-17 fw-semibold mb-3 mb-0">Experiece</h5>

                      {experience?.map((exp, index) => (
                        <Row key={index}>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                htmlFor="choices-single-location"
                                className="form-label"
                              >
                                Job Title
                              </label>

                              <FormControl
                                type="text"
                                autoFocus={true}
                                className="form-control"
                                id={"title" + index}
                                key={
                                  experience[index]?.title ||
                                  jobSeeker?.experience[index]?.title
                                }
                                value={exp.title || ""}
                                onChange={(e) => {
                                  handleExpChange(index, "title", e);
                                }}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                htmlFor="choices-single-location"
                                className="form-label"
                              >
                                Company
                              </label>
                              <FormControl
                                type="text"
                                autoFocus={true}
                                className="form-control"
                                id={"expName" + index}
                                key={
                                  experience[index]?.expName ||
                                  jobSeeker?.experience[index]?.expName
                                }
                                value={exp?.expName || ""}
                                onChange={(e) =>
                                  handleExpChange(index, "expName", e)
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                htmlFor="choices-single-location"
                                className="form-label"
                              >
                                Start Date
                              </label>

                              <input
                                type="date"
                                className="form-control"
                                id={"startDate" + index}
                                key={
                                  experience[index]?.startDate ||
                                  jobSeeker?.experience[index]?.startDate
                                }
                                value={exp?.startDate || null}
                                onChange={(e) =>
                                  handleExpChange(index, "startDate", e)
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                htmlFor="choices-single-location"
                                className="form-label"
                              >
                                End Date
                              </label>

                              <FormControl
                                type="date"
                                className="form-control"
                                id={"endDate" + index}
                                key={
                                  experience[index]?.endDate ||
                                  jobSeeker?.experience[index]?.endDate
                                }
                                value={exp?.endDate || null}
                                onChange={(e) =>
                                  handleExpChange(index, "endDate", e)
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                htmlFor="choices-single-location"
                                className="form-label"
                              >
                                Description
                              </label>

                              <FormControl
                                className="form-control"
                                as="textarea"
                                rows="5"
                                autoFocus={true}
                                id={"description" + index}
                                value={exp?.description || ""}
                                onChange={(e) =>
                                  handleExpChange(index, "description", e)
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <button
                                onClick={() => deleteExperience(index)}
                                className="mb-3 btn btn-danger btn-hover w-10"
                              >
                                Delete
                              </button>
                            </div>
                          </Col>
                        </Row>
                      ))}

                      <div className="mt-4 text-end">
                        <button
                          type="button"
                          className="btn btn-blue btn-hover w-10"
                          onClick={addExperience}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <h5 className="fs-17 fw-semibold mb-3 mb-0">Education</h5>

                      {education?.map((edu, index) => (
                        <Row key={index}>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                htmlFor="choices-single-location"
                                className="form-label"
                              >
                                Faculty
                              </label>

                              <FormControl
                                type="text"
                                autoFocus={true}
                                className="form-control"
                                id={"title" + index}
                                key={
                                  education[index]?.title ||
                                  jobSeeker?.education[index]?.title
                                }
                                value={edu.title || ""}
                                onChange={(e) => {
                                  handleEduChange(index, "title", e);
                                }}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                htmlFor="choices-single-location"
                                className="form-label"
                              >
                                School
                              </label>
                              <FormControl
                                type="text"
                                autoFocus={true}
                                className="form-control"
                                id={"expName" + index}
                                key={
                                  education[index]?.expName ||
                                  jobSeeker?.education[index]?.expName
                                }
                                value={edu?.expName || ""}
                                onChange={(e) =>
                                  handleEduChange(index, "expName", e)
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                htmlFor="choices-single-location"
                                className="form-label"
                              >
                                Start Date
                              </label>

                              <FormControl
                                type="date"
                                className="form-control"
                                id={"startDate" + index}
                                key={
                                  education[index]?.startDate ||
                                  jobSeeker?.education[index]?.startDate
                                }
                                value={edu?.startDate || null}
                                onChange={(e) =>
                                  handleEduChange(index, "startDate", e)
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                htmlFor="choices-single-location"
                                className="form-label"
                              >
                                End Date
                              </label>
                              <FormControl
                                type="date"
                                className="form-control"
                                id={"endDate" + index}
                                key={
                                  education[index]?.endDate ||
                                  jobSeeker?.education[index]?.endDate
                                }
                                value={edu?.endDate || null}
                                onChange={(e) =>
                                  handleEduChange(index, "endDate", e)
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div className="mb-3">
                              <label
                                htmlFor="choices-single-location"
                                className="form-label"
                              >
                                Description
                              </label>

                              <FormControl
                                className="form-control"
                                as="textarea"
                                rows="5"
                                autoFocus={true}
                                id={"description" + index}
                                value={edu?.description || ""}
                                onChange={(e) =>
                                  handleEduChange(index, "description", e)
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <button
                                onClick={() => deleteEducation(index)}
                                className="mb-3 btn btn-danger btn-hover w-10"
                              >
                                Delete
                              </button>
                            </div>
                          </Col>
                        </Row>
                      ))}
                      <div className="mt-4 text-end">
                        <button
                          type="button"
                          className="btn btn-blue btn-hover w-10"
                          onClick={addEducation}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <Col lg={12}>
                      <div className="mb-4">
                        <label htmlFor="skills" className="form-label">
                          Skills{" "}
                        </label>
                        <div className="skills-input">
                          <input
                            type="text"
                            className="form-control"
                            id="skills"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                          />
                          <button
                            className="btn btn-blue mt-1"
                            onClick={addSkill}
                            type="button"
                          >
                            Add
                          </button>

                          {skills?.map((skills, index) => (
                            <span
                              key={index}
                              className="badge bg-soft-success ms-2"
                            >
                              {skills}
                              <button
                                className="badge bg-soft-danger"
                                type="button"
                                onClick={() => removeSkill(index)}
                              >
                                x
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="mb-4">
                        <label htmlFor="languages" className="form-label">
                          Languages{" "}
                        </label>
                        <div className="languages-input">
                          <input
                            type="text"
                            className="form-control"
                            id="languages"
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                          />
                          <button
                            className="btn btn-blue mt-1"
                            onClick={addLanguage}
                            type="button"
                          >
                            Add
                          </button>

                          {languages?.map((languages, index) => (
                            <span
                              key={index}
                              className="badge bg-soft-success ms-2"
                            >
                              {languages}
                              <button
                                className="badge bg-soft-danger"
                                type="button"
                                onClick={() => removeLanguage(index)}
                              >
                                x
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </Col>

                    <div className="mt-4 text-end">
                      <button
                        type="submit"
                        className="btn btn-blue btn-hover w-25"
                      >
                        Update
                      </button>
                      <Modal
                        isOpen={showModal}
                        onRequestClose={handleCloseModal}
                        style={customModalStyles}
                        contentLabel="Sign Up Modal"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <h2>UPDATED!</h2>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="64"
                              height="64"
                              viewBox="0 0 24 24"
                              fill="#008000"
                            >
                              <path d="M9 16.172l-4.586-4.586-1.414 1.414 6 6 .586.586.586-.586 10-10-1.414-1.414z" />
                            </svg>
                          </div>
                          <div
                            style={customModalStyles.closeBtn}
                            onClick={handleCloseModal}
                          >
                            X
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </Form>
                </RcIf>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RightSideContent;
