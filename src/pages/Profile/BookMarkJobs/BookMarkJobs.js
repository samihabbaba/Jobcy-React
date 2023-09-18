import React from "react";
import { MetaTags } from "react-meta-tags";
import { Container } from "reactstrap";
import Selected from "../ManageJobs/Selected";
import BookmarkJobListing from "./BookmarkJobListing";
import Section from "./Section";
import { getUserData } from "../../../helpers/helper";

const user = getUserData();

if(user?.role !== "jobSeeker"){
  window.location.href = "/error404"
}

const BookMarkJobs = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Bookmarks Jobs | CareerHub</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Selected />
          <BookmarkJobListing />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default BookMarkJobs;
