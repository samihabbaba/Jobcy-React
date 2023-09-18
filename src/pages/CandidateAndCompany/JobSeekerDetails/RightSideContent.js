/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,useState} from "react";
import { Link, useLocation } from "react-router-dom";
import RcIf, { RcElse } from "rc-if";
import { Col, Card, CardBody, Nav, NavLink, NavItem } from "reactstrap";

const RightSideContent = () => {
  const location = useLocation();

  const jobSeeker = location?.state?.jobSeeker;

  useEffect(() => {
    console.log(jobSeeker);
    if (jobSeeker===undefined) {
      window.location.href="/error404"    
    }
   
  });
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
              <NavLink type="button">Overview</NavLink>
            </NavItem>
          </Nav>
          <CardBody className="p-4">
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
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RightSideContent;
