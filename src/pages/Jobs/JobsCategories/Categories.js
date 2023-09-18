import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import axios from "axios";

const Categories = () => {
  const [accountingFinance, setAccountingFinance] = useState(0);
  const [banking, setBanking] = useState(0);
  const [purchasingManager, setPurchasingManager] = useState(0);
  const [projectManager, setProjectManager] = useState(0);
  const [educationTraining, setEducationTraining] = useState(0);
  const [marketingAdvertising, setMarketingAdvertising] = useState(0);
  const [cateringTourism, setCateringTourism] = useState(0);
  const [government, setGovernment] = useState(0);
  const [defence, setDefence] = useState(0);
  const [teaching, setTeaching] = useState(0);
  const [retailCustomerServices, setRetailCustomerServices] = useState(0);
  const [diploma, setDiploma] = useState(0);
  const [healthCare, setHealthCare] = useState(0);
  const [manufacturingProduction, setManufacturingProduction] = useState(0);
  const [artsMedia, setArtsMedia] = useState(0);
  const [ITSoftware, setITSoftware] = useState(0);
  const [logisticsTransportation, setLogisticsTransportation] = useState(0);
  const [sports, setSports] = useState(0);
  const [forest, setForest] = useState(0);
  const [animalCare, setAnimalCare] = useState(0);
  const [digitalMarketing, setDigitalMarketing] = useState(0);
  const [administrativeOfficer, setAdministrativeOfficer] = useState(0);
  const [garageServices, setGarageServices] = useState(0);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  const getJobs = async () => {
    const resp = await axiosInstance.get("/job");
    const itSoftwareJobsCount = resp.data.filter(
      (job) => job.category === "IT Software"
    ).length;
    setITSoftware(itSoftwareJobsCount);
    const accountingFinanceCount = resp.data.filter(
      (job) => job.category === "Accounting Finance"
    ).length;
    setAccountingFinance(accountingFinanceCount);
    const bankingCount = resp.data.filter(
      (job) => job.category === "Banking"
    ).length;
    setBanking(bankingCount);
    const purchasingManagerJobsCount = resp.data.filter(
      (job) => job.category === "Purchasing Manager"
    ).length;
    setPurchasingManager(purchasingManagerJobsCount);
    const projectManagerCount = resp.data.filter(
      (job) => job.category === "Project Manager"
    ).length;
    setProjectManager(projectManagerCount);
    const educationTrainingCount = resp.data.filter(
      (job) => job.category === "Education Training"
    ).length;
    setEducationTraining(educationTrainingCount);
    const marketingAdvertisingJobsCount = resp.data.filter(
      (job) => job.category === "Marketing Advertising"
    ).length;
    setMarketingAdvertising(marketingAdvertisingJobsCount);
    const cateringTourismJobsCount = resp.data.filter(
      (job) => job.category === "Catering Tourism"
    ).length;
    setCateringTourism(cateringTourismJobsCount);
    const governmentJobsCount = resp.data.filter(
      (job) => job.category === "Government"
    ).length;
    setGovernment(governmentJobsCount);
    const defenceJobsCount = resp.data.filter(
      (job) => job.category === "Defence"
    ).length;
    setDefence(defenceJobsCount);
    const teachingJobsCount = resp.data.filter(
      (job) => job.category === "Teaching"
    ).length;
    setTeaching(teachingJobsCount);
    const retailCustomerServicesJobsCount = resp.data.filter(
      (job) => job.category === "Retail Customer Services"
    ).length;
    setRetailCustomerServices(retailCustomerServicesJobsCount);
    const diplomaJobsCount = resp.data.filter(
      (job) => job.category === "Diploma"
    ).length;
    setDiploma(diplomaJobsCount);
    const healthCareJobsCount = resp.data.filter(
      (job) => job.category === "Health Care"
    ).length;
    setHealthCare(healthCareJobsCount);
    const manufacturingProductionJobsCount = resp.data.filter(
      (job) => job.category === "Manufacturing Production"
    ).length;
    setManufacturingProduction(manufacturingProductionJobsCount);
    const artsMediaJobsCount = resp.data.filter(
      (job) => job.category === "Arts Media"
    ).length;
    setArtsMedia(artsMediaJobsCount);
    const logisticsTransportationJobsCount = resp.data.filter(
      (job) => job.category === "Logistics Transportation"
    ).length;
    setLogisticsTransportation(logisticsTransportationJobsCount);
    const sportsJobsCount = resp.data.filter(
      (job) => job.category === "Sports"
    ).length;
    setSports(sportsJobsCount);
    const forestJobsCount = resp.data.filter(
      (job) => job.category === "Forest"
    ).length;
    setForest(forestJobsCount);
    const animalCareJobsCount = resp.data.filter(
      (job) => job.category === "Animal Care"
    ).length;
    setAnimalCare(animalCareJobsCount);
    const digitalMarketingJobsCount = resp.data.filter(
      (job) => job.category === "Digital Marketing"
    ).length;
    setDigitalMarketing(digitalMarketingJobsCount);
    const administrativeOfficerJobsCount = resp.data.filter(
      (job) => job.category === "Administrative Officer"
    ).length;
    setAdministrativeOfficer(administrativeOfficerJobsCount);
    const garageServicesJobsCount = resp.data.filter(
      (job) => job.category === "Garage Services"
    ).length;
    setGarageServices(garageServicesJobsCount);
  };

  useEffect(() => {
    getJobs();
  }, []);

  const categories = [
    {
      id: 1,
      jobCategories: [
        {
          id: 1,
          jobName: "Accounting Finance",
          jobNumbers: accountingFinance,
        },
        {
          id: 2,
          jobName: "Banking",
          jobNumbers: banking,
        },
        {
          id: 3,
          jobName: "Purchasing Manager",
          jobNumbers: purchasingManager,
        },
        {
          id: 4,
          jobName: "Project Manager",
          jobNumbers: projectManager,
        },
        {
          id: 5,
          jobName: "Education Training",
          jobNumbers: educationTraining,
        },
        {
          id: 6,
          jobName: "Marketing Advertising",
          jobNumbers: marketingAdvertising,
        },
        {
          id: 7,
          jobName: "Catering Tourism",
          jobNumbers: cateringTourism,
        },
        {
          id: 8,
          jobName: "Arts Media",
          jobNumbers: artsMedia,
        },
      ],
    },
    {
      id: 2,
      jobCategories: [
        {
          id: 1,
          jobName: "Government",
          jobNumbers: government,
        },
        {
          id: 2,
          jobName: "Defence",
          jobNumbers: defence,
        },
        {
          id: 3,
          jobName: "Teaching",
          jobNumbers: teaching,
        },
        {
          id: 4,
          jobName: "Retail Customer Services",
          jobNumbers: retailCustomerServices,
        },
        {
          id: 5,
          jobName: "Diploma",
          jobNumbers: diploma,
        },
        {
          id: 6,
          jobName: "Health Care",
          jobNumbers: healthCare,
        },
        {
          id: 7,
          jobName: "Manufacturing Production",
          jobNumbers: manufacturingProduction,
        },
        {
          id: 8,
          jobName: "Garage Services",
          jobNumbers: garageServices,
        },
      ],
    },
    {
      id: 3,
      jobCategories: [
        {
          id: 1,
          jobName: "IT Software",
          jobNumbers: ITSoftware,
        },
        {
          id: 2,
          jobName: "Logistics Transportation",
          jobNumbers: logisticsTransportation,
        },
        {
          id: 3,
          jobName: "Sports Jobs",
          jobNumbers: sports,
        },
        {
          id: 4,
          jobName: "Forest Worker",
          jobNumbers: forest,
        },
        {
          id: 5,
          jobName: "Animal Care Worker",
          jobNumbers: animalCare,
        },
        {
          id: 6,
          jobName: "Digital Marketing",
          jobNumbers: digitalMarketing,
        },
        {
          id: 7,
          jobName: "Administrative Officer",
          jobNumbers: administrativeOfficer,
        },
      ],
    },
  ];
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="text-center mb-5">
                <h4>Browse Job By Categories</h4>
              </div>
            </Col>
          </Row>
          <Row>
            {categories.map((category, key) => (
              <Col lg={4} key={key}>
                <Card className="job-Categories-box bg-light border-0">
                  <CardBody className="p-4">
                    <ul className="list-unstyled job-Categories-list mb-0">
                      {(category.jobCategories || []).map(
                        (jobCategoriesDetails, key) => (
                          <li key={key}>
                            <Link
                              to={{
                                pathname: "/joblist",
                                state: {
                                  geo: "",
                                  categories: jobCategoriesDetails.jobName,
                                },
                              }}
                              className="primary-link"
                            >
                              {jobCategoriesDetails.jobName}{" "}
                              <span className="badge bg-soft-info float-end">
                                {jobCategoriesDetails.jobNumbers}
                              </span>
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Categories;
