import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Form } from "reactstrap";
import { Link } from "react-router-dom";

const Section = () => {
  const [geo, setGeo] = useState("");
  const [categories, setCategories] = useState("");

  function routeToJobList() {}

  return (
    <React.Fragment>
      <section className="bg-home" id="home">
        <div className="bg-overlay"></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center text-white mb-5">
                <h1 className="display-5 fw-semibold mb-3">
                  Search Between More Then{" "}
                  <span className="text-warning fw-bold">1,000+ </span>
                  Open Jobs.
                </h1>
                <p className="fs-17">
                  Find jobs, create trackable resumes and enrich your
                  applications.
                </p>
              </div>
            </Col>
          </Row>

          <Form action="#">
            <div className="registration-form">
              <Row className="g-0" style={{ justifyContent: "center" }}>
                <Col lg={3}>
                  <div className="filter-search-form filter-border mt-3 mt-lg-0">
                    <i className="uil uil-map-marker"></i>
                    <select
                      style={{
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                      }}
                      className="form-select selectForm__inner"
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
                <Col lg={3}>
                  <div className="filter-search-form mt-3 mt-lg-0">
                    <i className="uil uil-clipboard-notes"></i>
                    <select
                      className="form-select selectForm__inner"
                      data-trigger
                      name="choices-single-categories"
                      id="choices-single-categories"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setCategories(e.target.value);
                        // filterJobs();
                      }}
                    >
                      <option value="">All</option>
                      <option value="Accounting Finance">
                        Accounting & Finance
                      </option>
                      <option value="Banking">Banking</option>
                      <option value="Purchasing Manager">
                        Purchasing Manager
                      </option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Education Training">
                        Education & Training
                      </option>
                      <option value="Marketing Advertising">
                        Marketing & Advertising
                      </option>
                      <option value="Catering Tourism">
                        Catering & Tourism
                      </option>
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
                      <option value="Animal Care Worker">
                        Animal Care Worker
                      </option>
                      <option value="Digital Marketing">
                        Digital Marketing
                      </option>
                      <option value="Administrative Officer">
                        Administrative Officer
                      </option>
                      <option value="Garage Services">Garage Services</option>
                    </select>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="mt-3 mt-lg-0 h-100">
                    <Link
                      to={{
                        pathname: "/joblist",
                        state: { geo, categories },
                      }}
                      className="btn btn-primary submit-btn w-100 h-100"
                      type="submit"
                    >
                      <i className="uil uil-search me-1"></i> Find Job
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>

          <Row>
            <Col lg={12}>
              <ul className="treding-keywords list-inline mb-0 text-white-50 mt-4 mt-lg-3 text-center">
                <li className="list-inline-item text-white">
                  <i className="mdi mdi-tag-multiple-outline text-warning fs-18"></i>{" "}
                  Trending Keywords:
                </li>
                <li className="list-inline-item">
                  <Link to="#">Design,</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">Development,</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">Manager,</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">Senior</Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="position-relative">
        <div className="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="1440"
            height="150"
            preserveAspectRatio="none"
            viewBox="0 0 1440 220"
          >
            <g mask='url("#SvgjsMask1004")' fill="none">
              <path
                d="M 0,213 C 288,186.4 1152,106.6 1440,80L1440 250L0 250z"
                fill="rgba(255, 255, 255, 1)"
              ></path>
            </g>
            <defs>
              <mask id="SvgjsMask1004">
                <rect width="1440" height="250" fill="#ffffff"></rect>
              </mask>
            </defs>
          </svg>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Section;
