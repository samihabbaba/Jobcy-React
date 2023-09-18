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
  const user = getUserData();
  const jobSeekerId = user?.jobSeeker?.jobSeekerId;
  const authToken = user?.access_token;
  const [appliedJobs, setAppliedJobs] = useState([]);

  const checkDate = (date) => {
    if (date) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      return formattedDate;
    } else {
      return "";
    }
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
        const link = window.document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
      });
  };



  const requests = [];

  const jobTitle = appliedJobs[0]?.job?.title;
  const uppercaseTitle = jobTitle ? jobTitle.toUpperCase() : "";

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
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
    if(user?.role !== "jobSeeker"){
      window.location.href = "/error404"
    }
    getJobSeekerById();
  }, []);

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card className="ms-lg-4 mt-4 mt-lg-0">
          <CardBody >
            <div className="mb-5">
              <h6 className="fs-17 fw-semibold mb-4">
                {" "}
                Your Applicantions
              </h6>
            </div>
            <div style={{paddingLeft:"26px"}}> 
              {appliedJobs.map((jobs, i) => (
                <div
                  key={i}
                  className={
                    jobs.addclassNameBookmark === true
                      ? "job-box bookmark-post card mt-4"
                      : "job-box card mt-4"
                  }
                  style={{maxWidth:"1000px"}}
                >
                  <div className="p-4">
                    <Row className="align-items-center">
                      <Col md={2}>
                        <div className="text-center mb-4 mb-md-0 ">
                        <button
                      style={{ border: "0px" }}
                      onClick={() =>
                        companyDetails(jobs?.company?.companyId)
                      }
                    >
                            <img
                              src={jobs?.company?.imageSrc}
                              alt=""
                              className="img-fluid rounded-3"
                              style={{ maxWidth: "100px !important"}}
                            />
                          </button>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-2 mb-md-0">
                          <p className="fs-14 mb-0">{jobs?.job?.title}</p>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-2 mb-md-0">
                          <p
                            className="fs-14 mb-0"
                            style={{ fontWeight: "bold" }}
                          >
                            {jobs?.documents.map((document, x) => (
                              <div key={x} >
                                <i className="mdi mdi-download text-primary"></i>
                                <button
                                  className="mb-0 badge bg-secondary "
                                  onClick={() => downloadDoc(document)}
                                  style={{ border: "0px",fontSize:"12px",maxWidth:"100px" }}
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
                          <p className="mb-0">{jobs?.job?.location}</p>
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
                    </Row>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RightSideContent;
