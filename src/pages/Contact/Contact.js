import React from "react";
import Section from "../Contact/Section";
import ContactContent from "../Contact/ContactContent";
import MetaTags from "react-meta-tags";

const Contact = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Contact | CareerHub</title>
      </MetaTags>
      <Section />
      <ContactContent />
    </React.Fragment>
  );
};

export default Contact;
