import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import RcIf from "rc-if";
import { Col, Row, Modal, ModalBody, ModalFooter } from "reactstrap";
import { getUserData } from "../../../helpers/helper";
import axios from "axios";

const JobVacancyList = ({ sharedVariable, onVariableChange }) => {
  let selectedJob;

  const handleChange = (experience, employeeType, date) => {
    const newValue = { experience, employeeType, date, isTopel: true };
    onVariableChange(newValue);
  };

  const location = useLocation();
  const state = location?.state || {};

  const user = getUserData();

  const [jobs, setJobs] = useState([]); // Original list of jobs
  const [copyOfJobs, setCopyJobs] = useState([]); // Original list of jobs

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const [jobSeeker, setJobSeeker] = useState(null);
  const fileInputRef = useRef(null);

  const [modal, setModal] = useState(false);
  const [jobId, setJobId] = useState("");

  // Query variables
  // const [geo, setLocation] = useState("");
  // const [categories, setCategory] = useState("");
  // const [experience, setExperience] = useState("");
  // const [employmentType, setEmployment] = useState("");
  // const [date, setDate] = useState("");

  let isLoaded = false;

  const [geo, setGeo] = useState(state?.geo ? state.geo : "");
  const [categories, setCategories] = useState(state?.categories ? state.categories : "");

  // let experience = "";
  // let employmentType = "";
  // let date = 30;

  function isDateBetween(createdAt, selectedDate) {
    var today = new Date(); // Get the current date
    var thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - Number(selectedDate)); // Subtract 30 days from today

    // Convert the input date to a Date object, if it's not already
    if (!(createdAt instanceof Date)) {
      createdAt = new Date(createdAt);
    }

    // Check if the input date is between today and 30 days ago
    return createdAt >= thirtyDaysAgo && createdAt <= today;
  }

  function filterJobs() {
    console.log("VARS ", geo, categories, sharedVariable);
  
    const filteredJobs = jobs.filter(
      (job) =>
        (geo?.length > 0 ? job.location === geo : true) &&
        (categories?.length > 0 ? job.category === categories : true) &&
        (sharedVariable?.experience?.length > 0
          ? job.experience === sharedVariable.experience
          : true) &&
        (sharedVariable?.employeeType?.length > 0
          ? job.employeeType === sharedVariable.employeeType
          : true)
    );

    setCopyJobs(filteredJobs);
  }

  function reset() {
    setGeo("");
    setCategories("");
    handleChange("", "", "30");
  }
  
  function doubleReset() {
    reset();
    reset();
  }

  const resetArray = () => {
    setSelectedFiles([]);
    setSelectedDates([]);
  };
  const authToken = user?.access_token;

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: { Authorization: `Bearer ${authToken}` },
  });

  const axiosFile = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
  });

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

  const getJobs = async () => {
    const resp = await axiosInstance.get("/job");
    const jobs = resp.data;

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
    isLoaded = true;

    setJobs(jobs);
    console.log('stateeeeee', state, geo)
    setCopyJobs(jobs);
  };

  const getJobSeekerById = async () => {
    if (user?.jobSeeker?.jobSeekerId) {
      const resp = await axiosInstance.get(
        `/job-seeker/${user?.jobSeeker?.jobSeekerId}`
      );
      const seeker = resp.data;
      setJobSeeker({ ...seeker });
    }
  };
  const openModal = (job = null) => {
    selectedJob = job;
    setJobId(selectedJob.jobId);
    setModal(!modal);
    resetArray();
  };

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
              window.location.href = "/bookmarkjobs";
            });
        }
      });
    });
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

  useEffect(() => {
    if (Object.keys(state)?.length > 0) {
      window.document.getElementById('choices-single-location').value = state?.geo
      window.document.getElementById('choices-single-location2').value = state?.categories
    }
    getJobSeekerById();
    getJobs();
    console.log("shared variable ", sharedVariable);
    filterJobs();

    console.log("STATE ", state);

    console.log("JOBS ", jobs);
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col lg={3} md={6}>
          <div className="filler-job-form">
            <i className="uil uil-location-point"></i>
            <select
              className="form-select form-select-option"
              data-trigger
              name="choices-single-location"
              id="choices-single-location"
              aria-label="Default select example"
              onChange={(e) => {
                setGeo(e.target.value);
                // filterJobs();
              }}
            >
              <option value="">All</option>
              <option value="Kyrenia">Kyrenia</option>
              <option value="Nicosia">Nicosia</option>
              <option value="Famagusta">Famagusta</option>
              <option value="Lefka">Lefka</option>
              <option value="Morphou">Morphou</option>
              <option value="Iskele">Iskele</option>
            </select>
          </div>
        </Col>
        <Col lg={4} md={6}>
          <div className="filler-job-form">
            <i className="uil uil-clipboard-notes"></i>
            <select
              className="form-select form-select-option"
              data-trigger
              name="choices-single-location2"
              id="choices-single-location2"
              aria-label="Default select example"
              onChange={(e) => {
                setCategories(e.target.value);
                // filterJobs();
              }}
            >
              <option value="">All</option>
              <option value="Accounting Finance">Accounting & Finance</option>
              <option value="Banking">Banking</option>
              <option value="Purchasing Manager">Purchasing Manager</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Education Training">Education & Training</option>
              <option value="Marketing Advertising">
                Marketing & Advertising
              </option>
              <option value="Catering Tourism">Catering & Tourism</option>
              <option value="Government">Government</option>
              <option value="Defence">Defence</option>
              <option value="Teaching">Teaching</option>
              <option value="Retail Customer Services">
                Retail & Customer Services
              </option>
              <option value="Diploma">Diploma</option>
              <option value="Health Care">Health Care</option>
              <option value="Manufacturing Production">
                Manufacturing & Production
              </option>
              <option value="Arts Media">Arts & Media</option>
              <option value="IT Software">IT & Software</option>
              <option value="Logistics Transportation">
                Logistics & Transportation{" "}
              </option>
              <option value="Sports Jobs">Sports Jobs</option>
              <option value="Forest Worker">Forest Worker</option>
              <option value="Animal Care Worker">Animal Care Worker</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Administrative Officer">
                Administrative Officer
              </option>
              <option value="Garage Services">Garage Services</option>
            </select>
          </div>
        </Col>
        <Col lg={4} md={7}>
          <button className="btn btn-blue" type="button" onClick={filterJobs}>
            Filter
          </button>
          <button
            className="btn btn-blue ms-2"
            type="button"
            onClick={doubleReset}
          >
            Reset Filter
          </button>
        </Col>
      </Row>
      {copyOfJobs?.map((selectedJobDetails, key) => (
        <div key={key} className={"job-box bookmark-post card mt-4"}>
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
                    onClick={() =>
                      companyDetails(selectedJobDetails?.companyId)
                    }
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
                    <Link
                      to={{
                        pathname: "/jobdetails",
                        state: { selectedJobDetails },
                        // Pass the job object as state
                      }}
                      className="text-dark"
                    >
                      {selectedJobDetails.title}
                    </Link>
                  </h5>
                  <p className="text-muted fs-14 mb-0">
                    {selectedJobDetails?.category}
                  </p>
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
                    <span className="text-dark">Experience :</span>{" "}
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
                      Apply Now <i className="mdi mdi-chevron-double-right"></i>
                    </button>
                  </div>
                </Col>
              </RcIf>
            </Row>
          </div>
        </div>
      ))}
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

export default JobVacancyList;
