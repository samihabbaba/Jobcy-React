import React, { useEffect, useState, useRef } from "react";
import RcIf, { RcElse } from "rc-if";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import classnames from "classnames";

import {
  getUserData,
  setCompanyLocal,
  setSeekerLocal,
  getCompanyLocal,
  getSeekerLocal,
} from "../../../helpers/helper";
import axios from "axios";
import { Link, createBrowserRouter, RouterProvider } from "react-router-dom";

const user = getUserData();
const authToken = user?.access_token;

const JobList = () => {
  let selectedJob;
  const [modal, setModal] = useState(false);
  const [jobId, setJobId] = useState("");
  const [jobSeeker, setJobSeeker] = useState(null);
  const resetArray = () => {
    setSelectedFiles([]);
    setSelectedDates([]);
  };

  const companyDetails = async (companyId) => {
    const resp = await axiosInstance.get(`/company/${companyId}`);
    await axiosInstance
      .get(`/file/${resp.data.image.fileId}`, {
        responseType: "blob",
      })
      .then((res) => {
        const blobUrl = window.URL.createObjectURL(res.data);
        resp.data.imageSrc = blobUrl;
        const compData = JSON.stringify(resp.data);
        const destinationUrl = `/companydetails?company=${compData}`;
        window.location.href = destinationUrl;
      });
  };

  const openModal = (job = null) => {
    selectedJob = job;
    setJobId(selectedJob.jobId);
    setModal(!modal);
    resetArray();
  };

  const getJobSeekerById = async () => {
    if (user?.jobSeeker?.jobSeekerId) {
      const resp = await axiosInstance.get(
        `/job-seeker/${user?.jobSeeker?.jobSeekerId}`
      );
      const seeker = resp.data;
      console.log(seeker);
      setJobSeeker({ ...seeker });
    }
  };

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: { Authorization: `Bearer ${authToken}` },
  });

  // const [selectedJob, setSelectedJob] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;

    // Add the selected date to the array
    setSelectedDates([...selectedDates, selectedDate]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [activeTab, setActiveTab] = useState("1");

  const [jobs, setJobs] = useState([]);
  const [fullTimeJobs, setFullTimeJobs] = useState([]);
  const [partTimeJobs, setPartTimeJobs] = useState([]);
  const [internJobs, setInternJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getJobs = async () => {
    const resp = await axiosInstance.get("/job");
    const jobs = resp.data;

    console.log(jobs);

    const requests = [];

    jobs.forEach(async (job, i) => {
      if (job?.company?.image) {
        const fileId = job.company.image.fileId;
        requests.push(
          axiosInstance
            .get(`/file/${fileId}`, {
              responseType: "blob",
            })
            .then((res) => {
              const blobUrl = window.URL.createObjectURL(res.data);
              jobs[i].company.image.file = blobUrl;
            })
        );
      }
    });

    await Promise.all(requests);

    setJobs(jobs);

    console.log(jobs);

    const fullTimeJobsArray = jobs?.filter(
      (job) => job.employeeType === "Full Time"
    );
    setFullTimeJobs(fullTimeJobsArray.slice(0, 5));

    const partTimeJobsArray = jobs?.filter(
      (job) => job.employeeType === "Part Time"
    );
    setPartTimeJobs(partTimeJobsArray.slice(0, 5));

    const internJobsArray = jobs?.filter(
      (job) => job.employeeType === "Intern"
    );
    setInternJobs(internJobsArray.slice(0, 5));

    setRecentJobs(jobs?.slice(0, 5));
  };

  const axiosFile = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
  });

  const submitApplication = async () => {
    const fileObj = [];
    const objToSend = {};
    objToSend.preferedDates = selectedDates;
    objToSend.documents = [];

    selectedFiles.forEach(async (x, i) => {
      let formData = new FormData();
      formData.append("file", x);
      await axiosFile.post(`/file`, formData).then((res) => {
        objToSend.documents.push(res.data);
        if (i === selectedFiles.length - 1) {
          axiosInstance
            .post(`/job-apply?jobId=${jobId}`, objToSend)
            .then(async (res) => {
              console.log(res.data);
              window.location.href = "/bookmarkjobs";
            });
        }
      });
    });
  };

  // const getFileById = async (job) => {
  //   console.log(job);
  //   const fileId = job.company?.image?.fileId;
  //   const file = await getFile(fileId);
  //   const url = window.URL.createObjectURL(file);
  //   console.log(url);
  //   return url;
  // };

  useEffect(() => {
    getJobs();
    getJobSeekerById();
  }, []);

  return (
    <React.Fragment>
      <div className="section bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title">New Jobs</h4>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Nav
                tabs
                className="job-list-menu  nav-pills nav-justified flex-column flex-sm-row mb-4"
                id="pills-tab"
                role="tablist"
              >
                <NavItem role="presentation">
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      tabChange("1");
                    }}
                    id="recent-jobs-tab"
                    type="button"
                    role="tab"
                  >
                    Recent Jobs
                  </NavLink>
                </NavItem>
                <NavItem role="presentation">
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      tabChange("2");
                    }}
                    id="part-time-tab"
                    type="button"
                    role="tab"
                  >
                    Part Time
                  </NavLink>
                </NavItem>
                <NavItem role="presentation">
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      tabChange("3");
                    }}
                    id="full-time-tab"
                    type="button"
                    role="tab"
                  >
                    Full Time
                  </NavLink>
                </NavItem>
                <NavItem role="presentation">
                  <NavLink
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => {
                      tabChange("4");
                    }}
                    id="recent-jobs-tab"
                    type="button"
                    role="tab"
                  >
                    Intern
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <TabContent activeTab={activeTab}>
                {/* JOBS HERE */}
                <React.Fragment>
                  <TabPane tabId="1">
                    {recentJobs.map((selectedJobDetails, key) => (
                      <div
                        key={key}
                        className={"job-box bookmark-post card mt-4"}
                      >
                        <div className="bookmark-label text-center">
                          <Link className="text-white align-middle">
                            <i className="mdi mdi-star"></i>
                          </Link>
                        </div>
                        <div className="p-4">
                          <Row className="align-items-center">
                            <Col md={2}>
                              <div className="text-center mb-4 mb-md-0">
                                <button
                                  style={{ border: "0px" }}
                                  onClick={() => companyDetails(selectedJobDetails?.companyId)}
                                >
                                  <img
                                    src={selectedJobDetails?.company?.image?.file}
                                    alt=""
                                    className="img-fluid rounded-3"
                                    style={{ maxHeight: "60px" }}
                                  />
                                </button>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="mb-2 mb-md-0">
                                <h5 className="fs-18 mb-1">
                                  
                                <Link to={{
                            pathname: "/jobdetails",
                            state: { selectedJobDetails },
                             // Pass the job object as state
                          }} className="text-dark">
                          {selectedJobDetails.title}
                        </Link>
                                </h5>
                                <p className="text-muted fs-14 mb-0">
                                  {selectedJobDetails?.company?.companyName}
                                </p>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="d-flex mb-2">
                                <div className="flex-shrink-0">
                                  <i className="mdi mdi-map-marker text-primary me-1"></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {selectedJobDetails?.location}
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div>
                                <p className="text-muted mb-2">
                                  <span className="text-primary">$</span>
                                  {selectedJobDetails?.salary}
                                </p>
                              </div>
                            </Col>
                            <Col md={2}>
                              <div>
                                <span
                                  className={
                                    selectedJobDetails?.employeeType === "Full Time"
                                      ? "badge bg-soft-success fs-13 mt-1 mx-1"
                                      : selectedJobDetails?.employeeType === "Part Time"
                                      ? "badge bg-soft-danger fs-13 mt-1 mx-1"
                                      : selectedJobDetails?.employeeType === "Intern"
                                      ? "badge bg-soft-purple fs-13 mt-1 mx-1"
                                      : ""
                                  }
                                >
                                  {selectedJobDetails?.employeeType}
                                </span>

                                {(selectedJobDetails?.badges || []).map((badgeInner, key) => (
                                  <span
                                    className={`badge ${badgeInner.badgeclassName} fs-13 mt-1`}
                                    key={key}
                                  >
                                    {badgeInner.badgeName}
                                  </span>
                                ))}
                              </div>
                            </Col>
                          </Row>
                        </div>

                        <div className="p-3 bg-light">
                          <Row>
                            <Col md={4}>
                              <div>
                                <p className="text-muted mb-0 mt-2">
                                  <span className="text-dark">
                                    Experience :
                                  </span>{" "}
                                  {selectedJobDetails?.experience} Years
                                </p>
                              </div>
                            </Col>

                            <RcIf
                              if={
                                user?.role == "jobSeeker" &&
                                !jobSeeker?.appliedJobs?.some(
                                  (x) => x.jobId === selectedJobDetails.jobId
                                )
                              }
                            >
                              <Col lg={8} md={3}>
                                <div className="text-start text-md-end">
                                  <button
                                    type="button"
                                    className="btn btn-blue"
                                    onClick={() => openModal(selectedJobDetails)}
                                  >
                                    Apply Now{" "}
                                    <i className="mdi mdi-chevron-double-right"></i>
                                  </button>
                                </div>
                              </Col>
                            </RcIf>
                          </Row>
                        </div>
                      </div>
                    ))}
                    <div className="text-center mt-4 pt-2">
                      <Link to="/joblist" className="btn btn-primary">
                        View More <i className="uil uil-arrow-right"></i>
                      </Link>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    {partTimeJobs.map((selectedJobDetails, key) => (
                      <div
                        key={key}
                        className={"job-box bookmark-post card mt-4"}
                      >
                        <div className="bookmark-label text-center">
                          <Link to="#" className="text-white align-middle">
                            <i className="mdi mdi-star"></i>
                          </Link>
                        </div>
                        <div className="p-4">
                          <Row className="align-items-center">
                            <Col md={2}>
                              <div className="text-center mb-4 mb-md-0">
                              <button
                                  style={{ border: "0px" }}
                                  onClick={() => companyDetails(selectedJobDetails?.companyId)}
                                >
                                  <img
                                    src={selectedJobDetails?.company?.image?.file}
                                    alt=""
                                    className="img-fluid rounded-3"
                                    style={{ maxHeight: "60px" }}
                                  />
                                </button>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="mb-2 mb-md-0">
                                <h5 className="fs-18 mb-1">
                                <Link to={{
                            pathname: "/jobdetails",
                            state: { selectedJobDetails },
                             // Pass the job object as state
                          }} className="text-dark">
                          {selectedJobDetails.title}
                        </Link>
                                </h5>
                                <p className="text-muted fs-14 mb-0">
                                  {selectedJobDetails?.company?.companyName}
                                </p>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="d-flex mb-2">
                                <div className="flex-shrink-0">
                                  <i className="mdi mdi-map-marker text-primary me-1"></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {selectedJobDetails?.location}
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div>
                                <p className="text-muted mb-2">
                                  <span className="text-primary">$</span>
                                  {selectedJobDetails?.salary}
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div>
                                <span
                                  className={
                                    selectedJobDetails?.employeeType === "Full Time"
                                      ? "badge bg-soft-success fs-13 mt-1 mx-1"
                                      : selectedJobDetails?.employeeType === "Part Time"
                                      ? "badge bg-soft-danger fs-13 mt-1 mx-1"
                                      : selectedJobDetails?.employeeType === "Intern"
                                      ? "badge bg-soft-purple fs-13 mt-1 mx-1"
                                      : ""
                                  }
                                >
                                  {selectedJobDetails?.employeeType}
                                </span>

                                {(selectedJobDetails?.badges || []).map((badgeInner, key) => (
                                  <span
                                    className={`badge ${badgeInner.badgeclassName} fs-13 mt-1`}
                                    key={key}
                                  >
                                    {badgeInner.badgeName}
                                  </span>
                                ))}
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="p-3 bg-light">
                          <Row>
                            <Col md={4}>
                              <div>
                                <p className="text-muted mb-0">
                                  <span className="text-dark">
                                    Experience :
                                  </span>{" "}
                                  {selectedJobDetails?.experience} Years
                                </p>
                              </div>
                            </Col>
                            <RcIf
                              if={
                                user?.role == "jobSeeker" &&
                                !jobSeeker?.appliedJobs?.some(
                                  (x) => x.jobId === selectedJobDetails.jobId
                                )
                              }
                            >
                              <Col lg={8} md={3}>
                                <div className="text-start text-md-end">
                                  <button
                                    type="button"
                                    className="btn btn-blue"
                                    onClick={() => openModal(selectedJobDetails)}
                                  >
                                    Apply Now{" "}
                                    <i className="mdi mdi-chevron-double-right"></i>
                                  </button>
                                </div>
                              </Col>
                            </RcIf>
                          </Row>
                        </div>
                      </div>
                    ))}
                    <div className="text-center mt-4 pt-2">
                      <Link to="/joblist" className="btn btn-primary">
                        View More <i className="uil uil-arrow-right"></i>
                      </Link>
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    {fullTimeJobs.map((selectedJobDetails, key) => (
                      <div
                        key={key}
                        className={"job-box bookmark-post card mt-4"}
                      >
                        <div className="bookmark-label text-center">
                          <Link to="#" className="text-white align-middle">
                            <i className="mdi mdi-star"></i>
                          </Link>
                        </div>
                        <div className="p-4">
                          <Row className="align-items-center">
                            <Col md={2}>
                              <div className="text-center mb-4 mb-md-0">
                              <button
                                  style={{ border: "0px" }}
                                  onClick={() => companyDetails(selectedJobDetails?.companyId)}
                                >
                                  <img
                                    src={selectedJobDetails?.company?.image?.file}
                                    alt=""
                                    className="img-fluid rounded-3"
                                    style={{ maxHeight: "60px" }}
                                  />
                                </button>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="mb-2 mb-md-0">
                                <h5 className="fs-18 mb-1">
                                <Link to={{
                            pathname: "/jobdetails",
                            state: { selectedJobDetails },
                             // Pass the job object as state
                          }} className="text-dark">
                          {selectedJobDetails.title}
                        </Link>
                                </h5>
                                <p className="text-muted fs-14 mb-0">
                                  {selectedJobDetails?.company?.companyName}
                                </p>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="d-flex mb-2">
                                <div className="flex-shrink-0">
                                  <i className="mdi mdi-map-marker text-primary me-1"></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {selectedJobDetails?.location}
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div>
                                <p className="text-muted mb-2">
                                  <span className="text-primary">$</span>
                                  {selectedJobDetails?.salary}
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div>
                                <span
                                  className={
                                    selectedJobDetails?.employeeType === "Full Time"
                                      ? "badge bg-soft-success fs-13 mt-1 mx-1"
                                      : selectedJobDetails?.employeeType === "Part Time"
                                      ? "badge bg-soft-danger fs-13 mt-1 mx-1"
                                      : selectedJobDetails?.employeeType === "Full Time"
                                      ? "badge bg-soft-purple fs-13 mt-1 mx-1"
                                      : ""
                                  }
                                >
                                  {selectedJobDetails?.employeeType}
                                </span>

                                {(selectedJobDetails?.badges || []).map((badgeInner, key) => (
                                  <span
                                    className={`badge ${badgeInner.badgeclassName} fs-13 mt-1`}
                                    key={key}
                                  >
                                    {badgeInner.badgeName}
                                  </span>
                                ))}
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="p-3 bg-light">
                          <Row>
                            <Col md={4}>
                              <div>
                                <p className="text-muted mb-0 mt-2">
                                  <span className="text-dark">
                                    Experience :
                                  </span>{" "}
                                  {selectedJobDetails?.experience} Years
                                </p>
                              </div>
                            </Col>
                            <RcIf
                              if={
                                user?.role == "jobSeeker" &&
                                !jobSeeker?.appliedJobs?.some(
                                  (x) => x.jobId === selectedJobDetails.jobId
                                )
                              }
                            >
                              <Col lg={8} md={3}>
                                <div className="text-start text-md-end">
                                  <button
                                    type="button"
                                    className="btn btn-blue"
                                    onClick={() => openModal(selectedJobDetails)}
                                  >
                                    Apply Now{" "}
                                    <i className="mdi mdi-chevron-double-right"></i>
                                  </button>
                                </div>
                              </Col>
                            </RcIf>
                          </Row>
                        </div>
                      </div>
                    ))}
                    <div className="text-center mt-4 pt-2">
                      <Link to="/joblist" className="btn btn-primary">
                        View More <i className="uil uil-arrow-right"></i>
                      </Link>
                    </div>
                  </TabPane>
                  <TabPane tabId="4">
                    {internJobs.map((selectedJobDetails, key) => (
                      <div
                        key={key}
                        className={"job-box bookmark-post card mt-4"}
                      >
                        <div className="bookmark-label text-center">
                          <Link to="#" className="text-white align-middle">
                            <i className="mdi mdi-star"></i>
                          </Link>
                        </div>
                        <div className="p-4">
                          <Row className="align-items-center">
                            <Col md={2}>
                              <div className="text-center mb-4 mb-md-0">
                              <button
                                  style={{ border: "0px" }}
                                  onClick={() => companyDetails(selectedJobDetails?.companyId)}
                                >
                                  <img
                                    src={selectedJobDetails?.company?.image?.file}
                                    alt=""
                                    className="img-fluid rounded-3"
                                    style={{ maxHeight: "60px" }}
                                  />
                                </button>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="mb-2 mb-md-0">
                                <h5 className="fs-18 mb-1">
                                <Link to={{
                            pathname: "/jobdetails",
                            state: { selectedJobDetails },
                             // Pass the job object as state
                          }} className="text-dark">
                          {selectedJobDetails.title}
                        </Link>
                                </h5>
                                <p className="text-muted fs-14 mb-0">
                                  {selectedJobDetails?.company?.companyName}
                                </p>
                              </div>
                            </Col>

                            <Col md={3}>
                              <div className="d-flex mb-2">
                                <div className="flex-shrink-0">
                                  <i className="mdi mdi-map-marker text-primary me-1"></i>
                                </div>
                                <p className="text-muted mb-0">
                                  {selectedJobDetails?.location}
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div>
                                <p className="text-muted mb-2">
                                  <span className="text-primary">$</span>
                                  {selectedJobDetails?.salary}
                                </p>
                              </div>
                            </Col>

                            <Col md={2}>
                              <div>
                                <span
                                  className={
                                    selectedJobDetails?.employeeType === "Full Time"
                                      ? "badge bg-soft-success fs-13 mt-1 mx-1"
                                      : selectedJobDetails?.employeeType === "Part Time"
                                      ? "badge bg-soft-danger fs-13 mt-1 mx-1"
                                      : selectedJobDetails?.employeeType === "Intern"
                                      ? "badge bg-soft-purple fs-13 mt-1 mx-1"
                                      : ""
                                  }
                                >
                                  {selectedJobDetails?.employeeType}
                                </span>

                                {(selectedJobDetails?.badges || []).map((badgeInner, key) => (
                                  <span
                                    className={`badge ${badgeInner.badgeclassName} fs-13 mt-1`}
                                    key={key}
                                  >
                                    {badgeInner.badgeName}
                                  </span>
                                ))}
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="p-3 bg-light">
                          <Row>
                            <Col md={4}>
                              <div>
                                <p className="text-muted mb-0 mt-2">
                                  <span className="text-dark">
                                    Experience :
                                  </span>{" "}
                                  {selectedJobDetails?.experience} Years
                                </p>
                              </div>
                            </Col>
                            <RcIf
                              if={
                                user?.role == "jobSeeker" &&
                                !jobSeeker?.appliedJobs?.some(
                                  (x) => x.jobId === selectedJobDetails.jobId
                                )
                              }
                            >
                              <Col lg={8} md={3}>
                                <div className="text-start text-md-end">
                                  <button
                                    type="button"
                                    className="btn btn-blue"
                                    onClick={() => openModal(selectedJobDetails)}
                                  >
                                    Apply Now{" "}
                                    <i className="mdi mdi-chevron-double-right"></i>
                                  </button>
                                </div>
                              </Col>
                            </RcIf>
                          </Row>
                        </div>
                      </div>
                    ))}
                    <div className="text-center mt-4 pt-2">
                      <Link to="/joblist" className="btn btn-primary">
                        View More <i className="uil uil-arrow-right"></i>
                      </Link>
                    </div>
                  </TabPane>
                </React.Fragment>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        id="myModal"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
       <Modal isOpen={modal} toggle={openModal} role="dialog" centered>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Apply Job
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={openModal}
              ></button>
            </div>
            <ModalBody>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>

                <h5>
                  Upload Your Documents(CV / Cover Letter)
                </h5>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
                  {selectedFiles.length > 0 && (
                  <div>
                    <p>Selected Files:</p>
                    <ul>
                      {selectedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button onClick={handleButtonClick} className="btn btn-blue mt-3 mb-3">
                  Select Files
                </button>
              
              </div>
              <div  style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                <div>
                  
                  <h5>Please Select Meeting Dates:</h5>
                  <RcIf if={selectedDates.length<2}>
                  <h5 style={{fontSize:"14px", textAlign:"center"}}>you can select multiple dates</h5>
                  </RcIf>
                  <RcIf if={selectedDates.length>0}>
                  <h5 style={{fontSize:"14px", textAlign:"center"}}>Selected Dates</h5>
                  </RcIf>
                  
                  {selectedDates.map((date, index) => (
                    <div key={index} style={{fontSize:"14px", textAlign:"center"}} >{date}</div>
                  ))}
                </div>
                <input type="date" onChange={handleDateChange} />
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                className="btn btn-secondary waves-effect"
                data-bs-dismiss="modal"
                onClick={openModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-blue waves-effect waves-light"
                onClick={submitApplication}
              >
                Apply
              </button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
};
export default JobList;
