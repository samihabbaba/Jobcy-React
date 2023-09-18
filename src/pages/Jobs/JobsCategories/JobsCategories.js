import React from "react";
import Categories from "./Categories";
import Section from "./Section";
import MetaTags from "react-meta-tags";

const JobsCategories = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Job Categories | CareerHub</title>
      </MetaTags>
      <Section />
      <Categories />
    </React.Fragment>
  );
};

export default JobsCategories;
