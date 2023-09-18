import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import RcIf from "rc-if";
import { useLocation } from "react-router-dom";
import JobDetailImage from "../../../assets/images/job-detail.jpg";
import JobImage10 from "../../../assets/images/featured-job/img-10.png";
import axios from "axios";
import { getUserData } from "../../../helpers/helper";
axios.defaults.baseURL = "http://localhost:3000";

const JobDetailsDescription = () => {
  const user = getUserData();
  const authToken = user?.access_token;
  const location = useLocation();
  const selectedJob = location?.state?.selectedJobDetails;
  const fileInputRef = useRef(null);
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

  let selectedJobId;

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

  const [job, setJob] = useState();
  const [jobSeeker, setJobSeeker] = useState(null);
  const [jobResponsibilities, setJobResponsibilities] = useState([]);
  const [jobSkills, setJobSkills] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const resetArray = () => {
    setSelectedFiles([]);
    setSelectedDates([]);
  };
  //Getting bearer token
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const openModal = (job = null) => {
    setModal(!modal);
    resetArray();
  };
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;

    // Add the selected date to the array
    setSelectedDates([...selectedDates, selectedDate]);
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
            .post(`/job-apply?jobId=${selectedJobId}`, objToSend)
            .then(async (res) => {
              window.location.href = "/bookmarkjobs";
            });
        }
      });
    });
  };
  const getJobSeekerById = async () => {
    if (user?.jobSeeker?.jobSeekerId) {
      const resp = await axiosInstance.get(
        `/job-seeker/${user?.jobSeeker?.jobSeekerId}`
      );
      const seeker = resp.data;

      setJobSeeker({ ...seeker });
      console.log(seeker);
      console.log(resp.data);
    }
  };
  useEffect(() => {
    const getJobById = async () => {
      try {
        const response = await axiosInstance.get(`/job/${selectedJobId}`);
        const responseData = response?.data;
        setJob(responseData);
        setJobResponsibilities(responseData?.responsibilities);
        setJobSkills(responseData?.skills);
      } catch (error) {
        console.error("Error fetching job", error);
      }
    };
    getJobById();
    getJobSeekerById();
  }, [selectedJobId]);

  return (
    <React.Fragment>
      <Card className="job-detail overflow-hidden">
        <div>
          <img src={JobDetailImage} alt="" className="img-fluid" />
          <div className="job-details-compnay-profile">
            <img
              src={JobImage10}
              alt=""
              className="img-fluid rounded-3 rounded-3"
            />
          </div>
        </div>
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <h5 className="mb-1">{job?.title}</h5>
              </Col>
              <RcIf
                if={
                  user?.role == "jobSeeker" &&
                  !jobSeeker?.appliedJobs?.some(
                    (x) => x.jobId === selectedJobId
                  )
                }
              >
                <div className="text-start text-md-end">
                  <button
                    type="button"
                    className="btn btn-blue"
                    onClick={() => openModal(selectedJobId)}
                  >
                    Apply Now <i className="mdi mdi-chevron-double-right"></i>
                  </button>
                </div>
              </RcIf>
            </Row>
          </div>

          <div className="mt-4">
            <Row className="g-2">
              <Col lg={3}>
                <div className="border rounded-start p-3">
                  <p className="text-muted mb-0 fs-13">Experience</p>
                  <p className="fw-medium fs-15 mb-0">{job?.experience}</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border p-3">
                  <p className="text-muted fs-13 mb-0">Employee type</p>
                  <p className="fw-medium mb-0">{job?.employeeType}</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border p-3">
                  <p className="text-muted fs-13 mb-0">Position</p>
                  <p className="fw-medium mb-0">{job?.position}</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border rounded-end p-3">
                  <p className="text-muted fs-13 mb-0">Salary</p>
                  <p className="fw-medium mb-0">{job?.salary}</p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Job Description</h5>
            <div className="job-detail-desc">
              <p className="text-muted mb-0">{job?.jobDescription}</p>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Responsibilities</h5>
            <div className="job-detail-desc mt-2">
              <ul className="job-detail-list list-unstyled mb-0 text-muted">
                {jobResponsibilities?.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Qualification </h5>
            <div className="job-detail-desc mt-2">
              <ul className="job-detail-list list-unstyled mb-0 text-muted">
                <li>{job?.qualification}</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="mb-3">Experience</h5>
            <div className="job-details-desc">
              <ul className="job-detail-list list-unstyled mb-0 text-muted">
                <li>{job?.experience}</li>
              </ul>
              <h5 className="mt-3">Skills</h5>
              <div className="mt-1 d-flex flex-wrap align-items-start gap-1">
                {jobSkills?.map((skill, index) => (
                  <div key={index}>
                    <span className="badge bg-soft-primary">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
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

                    {selectedFiles.map((file, index) => (
                      <p key={index}> - {file.name}</p>
                    ))}
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

export default JobDetailsDescription;
