import React, { useEffect, useState } from "react";
import { Col, Card, CardBody, Row, Label } from "reactstrap";
import { Link } from "react-router-dom";
import "react-image-lightbox/style.css";
import RcIf, { RcElse } from "rc-if";
import axios from "axios";

import Modal from "react-modal";

import { getUserData } from "../../../helpers/helper";
import { useLocation } from "react-router-dom";
import { FormControl } from "react-bootstrap";

const RightSideContent = () => {
  const location = useLocation();
  const user = getUserData();
  const companyId = user?.company?.companyId;
  const authToken = user?.access_token;
  const selectedJob = location?.state?.selectedJobDetails;
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [meetingDate, setMeetingDate] = useState(
    appliedJobs.preferedDates || new Date()
  );
  const [meetingLink, setMeetingLink] = useState("");
  const [applyId, setApplyId] = useState("");

  const [selectedApplyIDs, setSelectedApplyIDs] = useState([]);

  const customModalStyles = {
    content: {
      width: "600px",
      height: "400px",
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
  const customModalStyles2 = {
    content: {
      width: "250px",
      height: "200px",
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
  const openModal = (applicantIndex) => {
    setSelectedApplicant(applicantIndex);
    setSelectedApplyIDs((prevSelectedApplyIDs) => {
      const updatedApplyIDs = [...prevSelectedApplyIDs];
      updatedApplyIDs[applicantIndex] = applyId;
      return updatedApplyIDs;
    });
    setShowModal(true);
  };
 
  const openModalHire = (applicantIndex) => {
    setSelectedApplicant(applicantIndex);
    setSelectedApplyIDs((prevSelectedApplyIDs) => {
      const updatedApplyIDs = [...prevSelectedApplyIDs];
      updatedApplyIDs[applicantIndex] = applyId;
      return updatedApplyIDs;
    });
    setShowHireModal(true);
  };

  const openModalReject = (applicantIndex) => {
    
    setSelectedApplicant(applicantIndex);
    setSelectedApplyIDs((prevSelectedApplyIDs) => {
      const updatedApplyIDs = [...prevSelectedApplyIDs];
      updatedApplyIDs[applicantIndex] = applyId;
      return updatedApplyIDs;
    });
    setShowRejectModal(true);
    
  };

  const checkDate = (date) => {
    if (date) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      return formattedDate;
    } else {
      return "";
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseRejectModal = () => {
    setShowRejectModal(false);
  };
  const handleCloseHireModal = () => {
    setShowHireModal(false);
  };

  const getCompanyById = async () => {
    try {
      const response = await axiosInstance.get(
        `/job-apply/entity?jobId=${selectedJob.jobId}`
      );
      const responseData = response?.data;

      responseData.forEach((job, i) => {
        if (job?.jobSeeker?.image) {
          const fileId = job.jobSeeker.image.fileId;
          requests.push(
            axiosInstance
              .get(`/file/${fileId}`, {
                responseType: "blob",
              })
              .then((res) => {
                const blobUrl = window.URL.createObjectURL(res.data);
                responseData[i].jobSeeker.image.file = blobUrl;
                console.log(blobUrl);
              })
          );
        }
      });

      responseData.forEach((job, i) => {
        if (job?.company?.image) {
          const fileId = job.company.image.fileId;
          requests.push(
            axiosInstance
              .get(`/file/${fileId}`, {
                responseType: "blob",
              })
              .then((res) => {
                const blobUrl = window.URL.createObjectURL(res.data);
                responseData[i].company.imageSrc = blobUrl;
                console.log(blobUrl);
              })
          );
        }
      });

      await Promise.all(requests);
      setAppliedJobs(responseData);

      console.log(responseData);
      console.log(appliedJobs);
    } catch (error) {
      console.error("Error fetching job seeler:", error);
    }
  };
  const downloadDoc = async (document) => {
   
    const fileId = document.fileId;
    const type = document.mimetype;
    const name = document.originalname;


    axiosInstance
      .get(`/file/${fileId}`, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data], { type }));
      const link = window.document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      });
  };
 

  const handleSubmitMeetingDate = async (event) => {
    event.preventDefault();
    const applyId = appliedJobs[selectedApplicant].applyId;
    const seekerSeen = false;

    try {
      await axiosInstance
        .put("/job-apply", {
          meetingDate,
          meetingLink,
          applyId,
          seekerSeen,
        })
        .then(async () => {
          getCompanyById();
          handleCloseModal();
        });
    } catch (error) {
      // Handle error, e.g., display error message
      console.error("Error updating", error);
    }
  };
  const handleReject = async (event) => {
    event.preventDefault();
    const applyId = appliedJobs[selectedApplicant].applyId;
    const isRejected = true;
    const isHired = false;
    const seekerSeen = false;

    try {
      await axiosInstance
        .put("/job-apply", {
          applyId,
          isRejected,
          isHired,
          seekerSeen,
        })
        .then(async () => {
          getCompanyById();
          handleCloseRejectModal();
        });
    } catch (error) {
      // Handle error, e.g., display error message
      console.error("Error updating", error);
    }
  };
  const handleHire = async (event) => {
    event.preventDefault();
    const applyId = appliedJobs[selectedApplicant].applyId;
    const isHired = true;
    const isRejected = false;
    const seekerSeen = false;

    console.log("hshjsfjlshljs");
    try {
      await axiosInstance
        .put("/job-apply", {
          applyId,
          isHired,
          isRejected,
          seekerSeen,
        })
        .then(async () => {
          getCompanyById();
          handleCloseHireModal();
        });
    } catch (error) {
      // Handle error, e.g., display error message
      console.error("Error updating", error);
    }
  };
  const requests = [];

  let selectedJobId;

  const jobTitle = appliedJobs[0]?.job?.title;
  const uppercaseTitle = jobTitle ? jobTitle.toUpperCase() : "";
  if (selectedJob && selectedJob.job && selectedJob.job.jobId) {
    selectedJobId = selectedJob.job.jobId;
    console.log(selectedJobId);
  } else if (selectedJob && selectedJob.jobId) {
    selectedJobId = selectedJob.jobId;
    console.log(selectedJobId);
  }

  if (selectedJobId == null) {
    window.location.href = "/error404";
  }

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  useEffect(() => {
    getCompanyById();
   
  }, [selectedApplicant]);

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card className="ms-lg-4 mt-4 mt-lg-0">
          <CardBody className="p-4">
            <div className="mb-5">
              <h6 className="fs-17 fw-semibold mb-4">
                {" "}
                {uppercaseTitle} Applicants
              </h6>
            </div>
            <div  style={{paddingLeft:"26px"}}>
              {appliedJobs.map((jobs, i) => (
                <div
                  key={i}
                  style={{maxWidth:"1000px"}}
                >
                  <div className="p-4">
                    <Row className="align-items-center">
                      <Col md={2}>
                        <div className="text-center mb-4 mb-md-0 ">
                          <Link to="/companydetails">
                            <img
                              src={jobs?.jobSeeker?.image?.file}
                              alt=""
                              className="img-fluid rounded-3"
                              style={{ maxWidth: "100px !important" }}
                            />
                          </Link>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-2 mb-md-0">
                         <Link to={{
                        pathname: "/jobseekerdetails",
                        state: { jobSeeker : jobs?.jobSeeker },
                        // Pass the job object as state
                      }}>
                         <p className="fs-14 mb-0">{jobs?.jobSeeker?.name}</p>
                         </Link> 
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-2 mb-md-0">
                          <p
                            className="fs-14 mb-0"
                            style={{ fontWeight: "bold" }}
                          >
                            {jobs?.documents.map((document, x) => (
                              <div key={x}>
                                <i className="mdi mdi-download text-primary"></i>
                                <button
                                className="mb-0 badge bg-secondary "
                                  onClick={() =>
                                    downloadDoc(
                                      document
                                    )
                                  }
                                  style={{ border: "0px",fontSize:"12px" }}
                                >
                                  {" "}
                                  {document.originalname}
                                </button>
                              </div>
                            ))}
                          </p>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex mb-2">
                          <div className="flex-shrink-0">
                            <i className="mdi mdi-map-marker text-primary me-1"></i>
                          </div>
                          <p className="mb-0">{jobs?.jobSeeker?.location}</p>
                        </div>
                        <div className="d-flex mb-0">
                          <div className="flex-shrink-0">
                            <i className="uil uil-clock-three text-primary me-1"></i>
                          </div>
                          <p className="mb-0"> {checkDate(jobs.meetingDate)}</p>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex mb-2">
                          <div className="flex-shrink-0">
                            <i className="mdi mdi-link-variant text-primary me-1"></i>
                          </div>
                          <p className="mb-0">{jobs.meetingLink}</p>
                        </div>
                        <div className="d-flex mb-0">
                          <div className="flex-shrink-0"></div>
                          <RcIf
                            if={
                              jobs.meetingDate === null &&
                              jobs.isRejected === false &&
                              jobs.isHired === false
                            }
                          >
                            <p className="mb-0 badge bg-warning rounded-pill">
                              Waiting
                            </p>
                          </RcIf>
                          <RcIf
                            if={
                              jobs.meetingDate !== null &&
                              jobs.isHired === false &&
                              jobs.isRejected === false
                            }
                          >
                            <p className="mb-0 badge bg-blue rounded-pill">
                              Meeting Set
                            </p>
                          </RcIf>
                          <RcIf
                            if={
                              jobs.meetingDate !== null &&
                              jobs.isRejected === true &&
                              jobs.isHired === false
                            }
                          >
                            <p className="mb-0 badge bg-danger rounded-pill">
                              Rejected
                            </p>
                          </RcIf>
                          <RcIf
                            if={
                              jobs.meetingDate !== null &&
                              jobs.isHired === true &&
                              jobs.isRejected === false
                            }
                          >
                            <p className="mb-0 badge bg-success rounded-pill">
                              Hired
                            </p>
                          </RcIf>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div>
                          {(jobs.badges || []).map((badgeInner, key) => (
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
                    <Row className="justify-content-between">
                      <Col md={4}>
                        <div>
                          <p className="mb-0 mt-3">
                            <span className="text-dark">Preferred Dates :</span>
                            {jobs?.preferedDates + ""}
                          </p>
                        </div>
                      </Col>
                      <Col>
                        <RcIf
                          if={
                            jobs.isHired === false && jobs.isRejected === false
                          }
                        >
                          <div className="mt-2 text-end">
                            <button
                              className="btn btn-danger ms-3"
                              onClick={() => openModalReject(i, jobs.applyID)}
                            >
                              Reject Applicant
                            </button>
                            <RcIf if={jobs.meetingDate === null}>
                              <button
                                className="btn btn-secondary ms-3"
                                onClick={() => openModal(i, jobs.applyID)}
                              >
                                Give Meeting
                              </button>
                            </RcIf>

                            <RcIf if={jobs.meetingDate != null}>
                              <button
                                className="btn btn-blue ms-3"
                                onClick={() => openModalHire(i, jobs.applyID)}
                              >
                                Hire Applicant
                              </button>
                            </RcIf>
                          </div>
                        </RcIf>
                      </Col>
                    </Row>
                  </div>
                </div>
              ))}
              <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                style={customModalStyles}
                contentLabel="Sign Up Modal"
              >
                <div>
                  <h4>Please choose a date for the meeting</h4>
                  <div
                    className="d-flex flex-wrap"
                    style={{ justifyContent: "space-evenly" }}
                  >
                    {selectedApplicant !== null &&
                      appliedJobs[selectedApplicant]?.preferedDates.map(
                        (date, index) => (
                          <div key={index} className="mt-3 mb-2">
                            <input
                              type="radio"
                              name="option"
                              className="form-check-input"
                              id="`flexCheckDefault_${index}`"
                              value={new Date(meetingDate)}
                              onChange={(e) => setMeetingDate(e.target.value)}
                            />
                            <label htmlFor={`flexCheckDefault_${index}`}>
                              {date}
                            </label>
                          </div>
                        )
                      )}
                  </div>
                  <Row>
                    <Col lg={6}>
                      <Label htmlFor="flexCheckDefault" className="form-label">
                        Or Choose Another Date:
                      </Label>
                      <FormControl
                        type="date"
                        className="form-control"
                        id="flexCheckDefault"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                      ></FormControl>
                    </Col>
                    <Col lg={6}>
                      <Label htmlFor="MeetingLink" className="form-label">
                        Meeting Link:
                      </Label>
                      <FormControl
                        type="input"
                        className="form-control"
                        id="MeetingLink"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                      ></FormControl>
                    </Col>
                  </Row>

                  <div>
                    <button
                      className="btn btn-blue btn-hover w-100 mt-2 mb-1"
                      onClick={handleSubmitMeetingDate}
                    >
                      Send
                    </button>
                  </div>
                  <div
                    style={customModalStyles.closeBtn}
                    onClick={handleCloseModal}
                  >
                    X
                  </div>
                </div>
              </Modal>
              <Modal
                isOpen={showRejectModal}
                onRequestClose={handleCloseRejectModal}
                style={customModalStyles2}
              >
                <div>
                  <h4>Are you sure?</h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      className="btn btn-danger btn-hover w-100 mt-2 mb-1"
                      onClick={handleReject}
                      style={{ marginRight: "5px" }}
                    >
                      YES
                    </button>
                    <button
                      className="btn btn-blue btn-hover w-100 mt-2 mb-1"
                      onClick={handleCloseRejectModal}
                      style={{ marginLeft: "5px" }}
                    >
                      NO
                    </button>
                  </div>
                  <div
                    style={customModalStyles.closeBtn}
                    onClick={handleCloseRejectModal}
                  >
                    X
                  </div>
                </div>
              </Modal>
              <Modal
                isOpen={showHireModal}
                onRequestClose={handleCloseHireModal}
                style={customModalStyles2}
                contentLabel="Sign Up Modal"
              >
                <div>
                  <h4>Are you sure?</h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      className="btn btn-success btn-hover w-100 mt-2 mb-1"
                      onClick={handleHire}
                      style={{ marginRight: "5px" }}
                    >
                      YES
                    </button>
                    <button
                      className="btn btn-danger btn-hover w-100 mt-2 mb-1"
                      onClick={handleCloseHireModal}
                      style={{ marginLeft: "5px" }}
                    >
                      NO
                    </button>
                  </div>
                  <div
                    style={customModalStyles.closeBtn}
                    onClick={handleCloseHireModal}
                  >
                    X
                  </div>
                </div>
              </Modal>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RightSideContent;
