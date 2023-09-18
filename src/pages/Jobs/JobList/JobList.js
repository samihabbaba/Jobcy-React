import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import Section from "../../Jobs/JobList/Section";
import JobVacancyList from "./JobVacancyList";
import Sidebar from "./Sidebar";

const JobList = () => {
  // const childRef = useRef();

  const [sharedVariable, setSharedVariable] = useState({
    experience: "",
    employmentType: "",
    date: "30",
  });

  const handleVariableChange = (newValue) => {
    console.log(newValue);

    setSharedVariable(newValue);

    // if (!newValue.isTopel) {
    //   childRef.current.filterJobs()
    // }
  };

  // useEffect(() => {}, [sharedVariable]);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Job List |</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="me-lg-5">
                <JobVacancyList
                  sharedVariable={sharedVariable}
                  onVariableChange={handleVariableChange}
                />
              </div>
            </Col>
            <Sidebar
              sharedVariable={sharedVariable}
              onVariableChange={handleVariableChange}
            />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default JobList;
