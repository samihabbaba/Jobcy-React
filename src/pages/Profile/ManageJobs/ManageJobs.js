import React from "react";
import { MetaTags } from "react-meta-tags";
import { Container } from "reactstrap";
import JobListing from "./JobListing";
import Section from "./Section";
import Selected from "./Selected";
import { getUserData } from "../../../helpers/helper";

const user = getUserData();

if(user?.role !== "company"){
  window.location.href = "/error404"
}

const ManageJobs = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Manage Jobs</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Selected />
          <JobListing />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default ManageJobs;
