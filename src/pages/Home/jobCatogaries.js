import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";

const Jobcatogaries = () => {
  const [ITSoftwareJobs, setITSoftwareJobs] = useState(0);
  const [bankingJobs, setBankingJobs] = useState(0);
  const [marketingAdvertising, setMarketingAdvertisingJobs] = useState(0);
  const [government, setGovernmentJobs] = useState(0);
  const [accountingFinance, setAccountingFinanceJobs] = useState(0);
  const [healthCare, setHealthCareJobs] = useState(0);
  const [cateringTourism, setCateringTourismJobs] = useState(0);
  const [educationTraining, setEducationTrainingJobs] = useState(0);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  const getJobs = async () => {
    const resp = await axiosInstance.get("/job");
    const itSoftwareJobsCount = resp.data.filter(
      (job) => job.category === "IT Software"
    ).length;
    setITSoftwareJobs(itSoftwareJobsCount);
    const bankingJobsCount = resp.data.filter(
      (job) => job.category === "Banking"
    ).length;
    setBankingJobs(bankingJobsCount);
    const governmentJobsCount = resp.data.filter(
      (job) => job.category === "Government"
    ).length;
    setGovernmentJobs(governmentJobsCount);
    const marketingJobsCount = resp.data.filter(
      (job) => job.category === "Marketing Advertising"
    ).length;
    setMarketingAdvertisingJobs(marketingJobsCount);
    const accountingFinanceJobsCount = resp.data.filter(
      (job) => job.category === "Accounting Finance"
    ).length;
    setAccountingFinanceJobs(accountingFinanceJobsCount);
    const healthCareJobsCount = resp.data.filter(
      (job) => job.category === "Health Care"
    ).length;
    setHealthCareJobs(healthCareJobsCount);
    const cateringTourismJobsCount = resp.data.filter(
      (job) => job.category === "Catering Tourism"
    ).length;
    setCateringTourismJobs(cateringTourismJobsCount);
    const educationTrainingJobsCount = resp.data.filter(
      (job) => job.category === "Education Training"
    ).length;
    setEducationTrainingJobs(educationTrainingJobsCount);
  };

  useEffect(() => {
    getJobs();
  }, []);

  const categories = [
    {
      id: 1,
      icon: "uim-layers-alt",
      name: "IT & Software",
      job: ITSoftwareJobs,
    },
    {
      id: 2,
      icon: "uim-airplay",
      name: "Banking",
      job: bankingJobs,
    },
    {
      id: 3,
      icon: "uim-bag",
      name: "Government",
      job: government,
    },
    {
      id: 4,
      icon: "uim-user-md",
      name: "Accounting Finance",
      job: accountingFinance,
    },
    {
      id: 5,
      icon: "uim-hospital",
      name: "Health Care",
      job: healthCare,
    },
    {
      id: 6,
      icon: "uim-telegram-alt",
      name: "Catering Tourism",
      job: cateringTourism,
    },
    {
      id: 7,
      icon: "uim-scenery",
      name: "Education Training",
      job: educationTraining,
    },
    {
      id: 8,
      icon: "uim-android-alt",
      name: "Marketing Advertising",
      job: marketingAdvertising,
    },
  ];
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="section-title text-center">
                <h3 className="title">Job Categories </h3>
              </div>
            </Col>
          </Row>
          <Row>
            {(categories || []).map((item, key) => (
              <Col lg={3} md={6} mt={4} pt={2} key={key}>
                <div className="popu-category-box rounded text-center">
                  <div className="popu-category-icon icons-md">
                    <Icon icon={item.icon} className="text-primary" />
                  </div>
                  <div className="popu-category-content mt-4">
                    <Link
                      to={{
                        pathname: "/joblist",
                        state: { geo: "", categories: item.name },
                      }}
                      className="text-dark stretched-link"
                    >
                      <h5 className="fs-18">{item.name}</h5>
                    </Link>
                    <p className="mb-0">{item.job} Jobs</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <Row>
            <Col lg={12}>
              <div className="mt-5 text-center">
                <Link
                  to="/jobscategories"
                  className="btn btn-primary btn-hover"
                >
                  Browse All Categories <i className="uil uil-arrow-right"></i>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Jobcatogaries;
