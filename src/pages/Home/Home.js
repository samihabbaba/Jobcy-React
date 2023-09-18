import React from "react";
import Jobcatogaries from "../Home/jobCatogaries";
import JobList from "./JobList/jobList";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <React.Fragment>
      <Jobcatogaries />
      <JobList />
      <HowItWorks />
    </React.Fragment>
  );
};

export default Home;
