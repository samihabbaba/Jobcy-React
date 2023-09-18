import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  Nav,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

//Process Images Import
import processImage1 from "../../assets/images/process-01.png";
import processImage2 from "../../assets/images/process-02.png";
import processImage3 from "../../assets/images/process-03.png";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="section-title me-5">
                <h3 className="title">How It Works</h3>
                <Nav className="process-menu  flex-column nav-pills">
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      tabChange("1");
                    }}
                    type="button"
                  >
                    <div className="d-flex">
                      <div className="number flex-shrink-0">1</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">Register an account</h5>
                        <p className="text-muted mb-0">
                          Register a personal profile. Enter your personal
                          information and apply for the jobs with the matching
                          credentials with your profile.
                        </p>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      tabChange("2");
                    }}
                    type="button"
                  >
                    <div className="d-flex">
                      <div className="number flex-shrink-0">2</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">Find your job</h5>
                        <p className="text-muted mb-0">
                          You can find many jobs in your field and get in
                          contact with the relevant companies.
                        </p>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      tabChange("3");
                    }}
                    type="button"
                  >
                    <div className=" d-flex">
                      <div className="number flex-shrink-0">3</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">Apply for job</h5>
                        <p className="text-muted mb-0">
                          If you find a job and think that it is suitable for
                          you, it's the right time to apply and start your
                          career.
                        </p>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => {
                      tabChange("4");
                    }}
                    type="button"
                  >
                    <div className=" d-flex">
                      <div className="number flex-shrink-0">4</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">Company Owners</h5>
                        <p className="text-muted mb-0">
                          If you are a company owner, its the correct place to
                          find the correct staff for your company by posting the
                          jobs.
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </Nav>
              </div>
            </Col>
            <Col lg={6}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <img src={processImage1} alt="" className="img-fluid" />
                </TabPane>
                <TabPane tabId="2">
                  <img src={processImage2} alt="" className="img-fluid" />
                </TabPane>
                <TabPane tabId="3">
                  <img src={processImage3} alt="" className="img-fluid" />
                </TabPane>
                <TabPane tabId="4">
                  <img src={processImage3} alt="" className="img-fluid" />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default HowItWorks;
