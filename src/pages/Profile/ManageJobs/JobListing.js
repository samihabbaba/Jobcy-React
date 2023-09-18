import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Modal, ModalBody, Row } from "reactstrap";

import { getUserData } from "../../../helpers/helper";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

const JobListing = () => {
  const user = getUserData();

  const [company, setCompany] = useState();
  const [jobs, setJobs] = useState([]);
  const companyId = user.company?.companyId;

  const authToken = user?.access_token;

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
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

  // Get the current date
const currentDate = new Date();

// Get the created at date from selectedJobDetails (assuming it's a valid timestamp)
const createdAt = new Date(jobs[1]?.createdAt);
console.log(createdAt)

// Calculate the expiration date by adding 30 days to the created at date
const expirationDate = new Date(createdAt);
expirationDate.setDate(expirationDate.getDate() + 30);

// Calculate the remaining days
const timeDiff = expirationDate.getTime() - currentDate.getTime();
const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const getCompanyById = async () => {
      try {
        const response = await axiosInstance.get(`/company/${companyId}`); // Replace with the appropriate endpoint for getting company details
        const companyData = { ...response.data };
        const companyJobs = [...companyData?.jobs];
        setJobs(companyJobs);
        
      console.log(companyData);

        await axiosInstance
          .get(`/file/${companyData.image.fileId}`, {
            responseType: "blob",
          })
          .then((res) => {
            const blobUrl = window.URL.createObjectURL(res.data);
            companyData.imageSrc = blobUrl;
            setCompany(companyData);
            
          });
      } catch (error) {
        console.error("Error fetching company:", error);
      }
      
    };

    getCompanyById();
  }, []);


  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          {jobs.map((selectedJobDetails) => (
            <Card className="job-box card mt-4" /*key={key}*/>
              <CardBody className="p-4">
                <Row>
                  <Col lg={1}>
                    <button
                      style={{ border: "0px" }}
                      onClick={() =>
                        companyDetails(selectedJobDetails?.companyId)
                      }
                    >
                      <img
                        style={{
                          height: "100%",
                          maxHeight: "80px",
                          width: "100%",
                        }}
                        src={company?.imageSrc}
                        alt="company-image"
                        className="img-fluid rounded-3"
                      />
                    </button>
                  </Col>
                  <Col lg={9}>
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
                      </h5>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <p className="text-muted fs-14 mb-0">
                            {selectedJobDetails.category}
                          </p>
                        </li>
                        <li className="list-inline-item">
                          <p className="text-muted fs-14 mb-0">
                            <i className="mdi mdi-map-marker"></i>{" "}
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
                        {selectedJobDetails.employeeType === "Part Time" && (
                          <span className="badge bg-soft-success fs-13 mt-1 mx-1">
                            Part Time
                          </span>
                        )}
                        {selectedJobDetails.employeeType === "Full Time" && (
                          <span className="badge bg-soft-info fs-13 mt-1 mx-1">
                            Full Time
                          </span>
                        )}
                        {selectedJobDetails.employeeType === "Intern" && (
                          <span className="badge bg-soft-blue fs-13 mt-1 mx-1">
                            Internship
                          </span>
                        )}
                      </div>
                    </div>
                  </Col>

                  <Col lg={2} className="align-self-center">
                    <ul className="list-inline mt-3 mb-0">
                    <li
                        className="list-inline-item"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Days Left For Removing Job"
                      >
                        <div
                          className="avatar-sm bg-soft-danger d-inline-block text-center rounded-circle fs-18"
                        >
                          <i>{remainingDays}</i>
                        </div>
                      </li>
                      <li
                        className="list-inline-item"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit"
                      >
                        <Link
                          to={{
                            pathname: "/bookmarkjobpostedit",
                            state: { selectedJobDetails }, // Pass the job object as state
                          }}
                          className="avatar-sm bg-soft-blue d-inline-block text-center rounded-circle fs-18"
                        >
                          <i className="uil uil-edit"></i>
                        </Link>
                      </li>
                      <li
                        className="list-inline-item"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Show Applicants"
                      >
                        <Link
                          to={{
                            pathname: "/jobapplicants",
                            state: { selectedJobDetails }, // Pass the job object as state
                          }}
                          className="avatar-sm bg-soft-success d-inline-block text-center rounded-circle fs-18"
                        >
                          <i className="mdi mdi-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>

    </React.Fragment>
  );
};

export default JobListing;
