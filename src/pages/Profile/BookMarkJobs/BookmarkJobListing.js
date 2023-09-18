import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { getUserData } from "../../../helpers/helper";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

const BookmarkJobListing = () => {
  const user = getUserData();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const jobSeekerId = user?.jobSeeker?.jobSeekerId;
  const authToken = user?.access_token;

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const requests = [];
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
  useEffect(() => {
    const getJobSeekerById = async () => {
      try {
        const response = await axiosInstance.get(
          `/job-apply/entity?jobSeekerId=${jobSeekerId}`
        );
        const responseData = response?.data;
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
    getJobSeekerById();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          {appliedJobs?.map((selectedJobDetails, key) => (
            <Card className="job-box card mt-4" key={key}>
              <CardBody className="p-4">
                <Row>
                  <Col lg={1}>
                    <button
                      style={{ border: "0px" }}
                      onClick={() =>
                        companyDetails(selectedJobDetails?.company?.companyId)
                      }
                    >
                      <img
                        src={selectedJobDetails?.company?.imageSrc}
                        alt=""
                        className="img-fluid rounded-3"
                        style={{ maxHeight: "60px" }}
                      />
                    </button>
                  </Col>
                  <Col lg={9}>
                    <div className="mt-3 mt-lg-0">
                      <h5 className="fs-17 mb-1">
                        {selectedJobDetails?.company?.companyName}
                      </h5>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <p className="fs-14 mb-0">
                            {selectedJobDetails?.job?.title}
                          </p>
                        </li>
                        <li className="list-inline-item">
                          <p className="fs-14 mb-0">
                            <i className="mdi mdi-map-marker"></i>{" "}
                            {selectedJobDetails?.job?.location}
                          </p>
                        </li>
                        <li className="list-inline-item">
                          <p className="fs-14 mb-0">
                            <i className="uil uil-wallet"></i>{" "}
                            {selectedJobDetails?.job?.salary}
                          </p>
                        </li>
                      </ul>
                      <div className="mt-2">
                        <span
                          className={
                            selectedJobDetails?.job?.employeeType == "Full Time"
                              ? "badge bg-soft-success fs-13 mt-1 mx-1"
                              : selectedJobDetails?.job?.employeeType ==
                                "Part Time"
                              ? "badge bg-soft-danger fs-13 mt-1 mx-1"
                              : selectedJobDetails?.job?.employeeType ==
                                "Intern"
                              ? "badge bg-soft-purple fs-13 mt-1 mx-1"
                              : ""
                          }
                        >
                          {selectedJobDetails?.job?.employeeType}
                        </span>
                      </div>
                    </div>
                  </Col>

                  <Col lg={2} className="align-self-center">
                    <ul className="list-inline mt-3 mb-0">
                      <li
                        className="list-inline-item"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="View More"
                      >
                        <Link
                          to={{
                            pathname: "/jobdetails",
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

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModal"
        aria-hidden="true"
      ></div>
    </React.Fragment>
  );
};

export default BookmarkJobListing;
