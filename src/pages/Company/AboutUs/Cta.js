import React from "react";
import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <React.Fragment>
      <section className="section bg-light">
        <Container>
          <Row className="justify-content-center">
            <div className="section-title text-center">
              <h3 className="title mb-4 pb-2">
                Improve your business, start your career with CareerHub
              </h3>
              <div className="mt-4">
                <Link to="/Pricing" className="btn btn-primary btn-hover mt-2">
                  <i className="uil uil-rocket me-1"></i> Get Started Now
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Cta;
