import React from "react";
import Section from "../Team/Section";
import TeamPage from "../Team/TeamPage";
import MetaTags from "react-meta-tags";

const Team = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Team | CareerHub</title>
      </MetaTags>
      <Section />
      <TeamPage />
    </React.Fragment>
  );
};

export default Team;
