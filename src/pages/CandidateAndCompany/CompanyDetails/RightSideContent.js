import React, { useState, useEffect, useRef } from "react";
import RcIf, { RcElse } from "rc-if";
import {
  Col,
  Card,
  CardBody,
  Row,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import "react-image-lightbox/style.css";
import { useLocation } from "react-router-dom";
import {
  getUserData,
  setCompanyLocal,
  setSeekerLocal,
  getCompanyLocal,
  getSeekerLocal,
} from "../../../helpers/helper";
import axios from "axios";

const RightSideContent = () => {
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const companyData = JSON.parse(params.get("company"));

  const [jobSeeker, setJobSeeker] = useState(null);

  let selectedJob;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const fileInputRef = useRef(null);

  const [modal, setModal] = useState(false);
  const [jobId, setJobId] = useState("");
  const user = getUserData();
  const resetArray = () => {
    setSelectedFiles([]);
    setSelectedDates([]);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;

    // Add the selected date to the array
    setSelectedDates([...selectedDates, selectedDate]);
  };

  const authToken = user?.access_token;
  const [companyImg, setCompanyImg] = useState("");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const openModal = (job = null) => {
    selectedJob = job;
    setJobId(selectedJob.jobId);
    setModal(!modal);
    resetArray();
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
  if (companyData === undefined) {
    window.location.href = "/error404";
  }
  const img = async () => {
    const resp = await axiosInstance.get(`/file/${companyData.image.fileId}`, {
      responseType: "blob",
    });
    // .then((res) => {
    //   ;
    //   companyData.image.file2 = blobUrl;
    // });

    const blobUrl = window.URL.createObjectURL(resp.data);
    setCompanyImg(blobUrl);
    console.log(companyImg);
  };
  useEffect(() => {
    console.log(companyData);

    img();
  }, []);
  return (
    <React.Fragment>
      <Col lg={8}>
        <Card className="ms-lg-4 mt-4 mt-lg-0">
          <CardBody className="p-4">
            <div className="mb-5">
              <h6 className="fs-17 fw-semibold mb-4">About Our Company</h6>
              <p className="text-muted">{companyData?.about}</p>
            </div>
            <div>
              <h6 className="fs-17 fw-semibold mb-4">Current Opening</h6>

              {companyData?.jobs?.map((selectedJobDetails, key) => (
                <div key={key} className={"job-box bookmark-post card mt-4"}>
                  <div className="p-4">
                    <Row>
                      <Col lg={1}>
                        <img
                          src={companyImg}
                          alt=""
                          className="img-fluid rounded-3"
                          style={{ maxHeight: "60px" }}
                        />
                      </Col>
                      <Col lg={10}>
                        <div className="mt-3 mt-lg-0">
                          <h5 className="fs-17 mb-1">
                            <Link
                              to={{
                                pathname: "/jobdetails",
                                state: { selectedJobDetails }, // Pass the job object as state
                              }}
                              className="text-dark"
                            >
                              {selectedJobDetails.title}
                            </Link>
                            <small className="text-muted fw-normal">
                              ({selectedJobDetails.experience} Yrs)
                            </small>
                          </h5>
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                {companyData.companyName}
                              </p>
                            </li>
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                <i className="mdi mdi-map-marker"></i>
                                {selectedJobDetails.location}
                              </p>
                            </li>
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                <i className="uil uil-wallet"></i>{" "}
                                {selectedJobDetails.salary}
                              </p>
                            </li>
                          </ul>
                          <div className="mt-2">
                            <span
                              className={
                                selectedJobDetails.employeeType === "Full Time"
                                  ? "badge bg-soft-success fs-13 mt-1 mx-1"
                                  : selectedJobDetails.employeeType ===
                                    "Part Time"
                                  ? "badge bg-soft-danger fs-13 mt-1 mx-1"
                                  : selectedJobDetails.employeeType === "Intern"
                              }
                            >
                              {selectedJobDetails.employeeType}
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <RcIf
                    if={
                      user?.role == "jobSeeker" &&
                      !jobSeeker?.appliedJobs?.some(
                        (x) => x.jobId === selectedJobDetails.jobId
                      )
                    }
                  >
                    <div className="text-md-end p-2">
                      <button
                        to="#applyNow"
                        onClick={() => openModal(selectedJobDetails)}
                        className="btn btn-blue"
                      >
                        Apply Now{" "}
                        <i className="mdi mdi-chevron-double-right"></i>
                      </button>
                    </div>
                  </RcIf>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h5>Upload Your Documents(CV / Cover Letter)</h5>
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
                <button
                  onClick={handleButtonClick}
                  className="btn btn-blue mt-3 mb-3"
                >
                  Select Files
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div>
                  <h5>Please Select Meeting Dates:</h5>
                  <RcIf if={selectedDates.length < 2}>
                    <h5 style={{ fontSize: "14px", textAlign: "center" }}>
                      you can select multiple dates
                    </h5>
                  </RcIf>
                  <RcIf if={selectedDates.length > 0}>
                    <h5 style={{ fontSize: "14px", textAlign: "center" }}>
                      Selected Dates
                    </h5>
                  </RcIf>

                  {selectedDates.map((date, index) => (
                    <div
                      key={index}
                      style={{ fontSize: "14px", textAlign: "center" }}
                    >
                      {date}
                    </div>
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

export default RightSideContent;
