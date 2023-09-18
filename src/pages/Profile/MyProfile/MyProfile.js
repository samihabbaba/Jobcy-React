import React, { useEffect, useState, useRef } from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Row } from "reactstrap";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";
import Section from "./Section";

const MyProfile = () => {
  // const [file, setFile] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));


    if (user === null) {
      window.location.href = "/error404";
    }
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>My Profile</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <LeftSideContent />
            <RightSideContent />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default MyProfile;
