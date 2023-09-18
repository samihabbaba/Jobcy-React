import React,  { useEffect } from "react";
import Section from "../Layout1/Section";
import Home from "../Home";
import MetaTags from "react-meta-tags";

import axios from "axios";


import {
  getUserData,
  setCompanyLocal,
  setSeekerLocal,
} from "../../../helpers/helper";

const user = getUserData();
const authToken = user?.access_token;

const Layout1 = () => {

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const setVariables = async() => {
    if(user?.role === 'jobSeeker') {
      const resp = await axiosInstance.get(`/job-seeker/${user.jobSeeker.jobSeekerId}`);
      const jobSeekerdata = resp.data;
      setSeekerLocal(jobSeekerdata);
    }else if(user?.role === 'company') {
      const resp = await axiosInstance.get(`/company/${user.company.companyId}`);
      const companyId = resp.data;
      setCompanyLocal(companyId);
    }

  };

  useEffect(() => {
    setVariables()
  }, []);

  return (
    <div>
      <MetaTags>
        <title>Home | CareerHub</title>
        <script src="https://unicons.iconscout.com/release/v3.0.2/script/monochrome/bundle.js"></script>
      </MetaTags>
      <Section />
      <Home />
    </div>
  );
};

export default Layout1;
