import React from "react";
import { Container, Row, Col } from "reactstrap";
import AboutImage from "../../../assets/images/about/img-01.jpg";

const About = () => {
  return (
    <React.Fragment>
      <section className="section overflow-hidden">
        <Container>
          <Row className="align-items-center g-0">
            <Col lg={6}>
              <div className="section-title me-lg-5">
                <h6 className="sub-title">About Us</h6>
                <h2 className="title mb-4">
                  Why <span className="text-warning fw-bold">35,000+</span>{" "}
                  People Trust On CareerHub?
                </h2>
                <p className="text-muted">
                  Founded in 2023, CareerHub is a leading job search website
                  connecting companies and job seekers. Our user-friendly
                  platform revolutionizes the hiring process by empowering
                  individuals to find meaningful employment opportunities and
                  enabling companies to discover top talent. With advanced
                  search capabilities, intelligent matching algorithms, and a
                  commitment to fairness and inclusivity, we bridge the gap
                  between talent and opportunity. Join us today and unlock
                  endless possibilities in the world of employment.
                </p>

                <Row mt={4} pt={2}>
                  <Col md={6}>
                    <ul className="list-unstyled about-list text-muted mb-0 mb-md-3">
                      <li>Creating a Business Personal Profile</li>
                      <li>Creating a Company Profile</li>
                      <li>Applying for Jobs</li>
                      <li>Creating Job Advertisements</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul className="list-unstyled about-list text-muted">
                      <li>Improve your career</li>
                      <li>Improve your company</li>
                      <li>5000+ Companies</li>
                      <li>35000+ Users</li>
                      <li>and more...</li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-img mt-4 mt-lg-0">
                <img src={AboutImage} alt="" className="img-fluid rounded" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default About;