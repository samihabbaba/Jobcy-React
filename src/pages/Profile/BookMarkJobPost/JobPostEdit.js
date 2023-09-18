import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
} from "reactstrap";
import axios from "axios";
import { getUserData } from "../../../helpers/helper";
import { FormControl, Form } from "react-bootstrap";
axios.defaults.baseURL = "http://localhost:3000";

const user = getUserData();

const JobPostEdit = () => {
  //Job Required Variables
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("0-3");
  const [location, setLocation] = useState("Famagusta");
  const [salary, setSalary] = useState("");
  const [qualification, setQualification] = useState("");
  const [industry, setIndustry] = useState("");
  const [position, setPosition] = useState("");
  const [employeeType, setEmployeeType] = useState("Full Time");
  const [jobDescription, setJobDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState([]);
  const [newResponsibility, setNewResponsibility] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [skills, setSkills] = useState([]);
  const [category, setCategory] = useState("Accounting Finance");

  //Getting required parameters from object
  const companyId = user.company?.companyId;
  const authToken = user?.access_token;

  //Getting bearer token
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const addResponsibility = () => {
    if (newResponsibility.trim() !== "") {
      setResponsibilities((prevResponsibilities) => [
        ...prevResponsibilities,
        newResponsibility.trim(),
      ]);
      setNewResponsibility(""); // Reset the input field after adding
    }
  };

  const removeResponsibility = (index) => {
    setResponsibilities((prevResponsibilities) =>
      prevResponsibilities.filter((_, i) => i !== index)
    );
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills((prevSkills) => [...prevSkills, newSkill.trim()]);
      setNewSkill(""); // Reset the input field after adding
    }
  };

  const removeSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const addRequirement = () => {
    if (newRequirement.trim() !== "") {
      setRequirements((prevRequirements) => [
        ...prevRequirements,
        newRequirement.trim(),
      ]);
      setNewRequirement(""); // Reset the input field after adding
    }
  };

  const removeRequirement = (index) => {
    setRequirements((prevRequirements) =>
      prevRequirements.filter((_, i) => i !== index)
    );
  };

  //Post Job Modal
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(!modal);

  const handlePostJob = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post("/job", {
        companyId,
        title,
        experience,
        location,
        salary,
        qualification,
        industry,
        position,
        employeeType,
        jobDescription,
        responsibilities,
        requirements,
        skills,
        category,
      });
      openModal();
      console.log(experience)
      window.location.href="/managejobs"
    } catch (error) {
      // Handle error, e.g., display error message
      console.error("Error While Posting New Job", error);
    }
  };

  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="bg-soft-primary p-3">
                <h5 className="mb-0 fs-17">Post a New Job!</h5>
              </div>
            </Col>
          </Row>
          <Form onSubmit={handlePostJob} className="job-post-form shadow mt-4">
            <div className="job-post-content box-shadow-md rounded-3 p-4">
              <Row className="row">
                <Col lg={12}>
                  <div className="mb-4">
                    <Label htmlFor="jobtitle" className="form-label">
                      Job Title
                    </Label>
                    <FormControl
                      type="text"
                      className="form-control"
                      id="jobtitle"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="mb-4">
                    <Label htmlFor="jobdescription" className="form-label">
                      Job Description
                    </Label>
                    <FormControl
                      type="text"
                      className="form-control"
                      id="jobdescription"
                      rows="3"
                      placeholder="Enter Job Description"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label
                      htmlFor="choices-single-categories"
                      className="form-label"
                    >
                      Categories
                    </label>
                    <select
                      className="form-select"
                      data-trigger=""
                      name="choices-single-categories"
                      id="choices-single-categories"
                      aria-label="Default select example"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Accounting Finance">
                        Accounting & Finance
                      </option>
                      <option value="Banking">Banking</option>
                      <option value="Purchasing Manager">
                        Purchasing Manager
                      </option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Education Training">
                        Education & Training
                      </option>
                      <option value="Marketing Advertising">
                        Marketing & Advertising
                      </option>
                      <option value="Catering Tourism">
                        Catering & Tourism
                      </option>
                      <option value="Government">Government</option>
                      <option value="Defence">Defence</option>
                      <option value="Teaching">Teaching</option>
                      <option value="Retail Customer Services">
                        Retail & Customer Services
                      </option>
                      <option value="Diploma">Diploma</option>
                      <option value="Health Care">Health Care</option>
                      <option value="Manufacturing Production">
                        Manufacturing & Production
                      </option>
                      <option value="Arts Media">Arts & Media</option>
                      <option value="IT Software">IT & Software</option>
                      <option value="Logistics Transportation">
                        Logistics & Transportation{" "}
                      </option>
                      <option value="Sports Jobs">Sports Jobs</option>
                      <option value="Forest Worker">Forest Worker</option>
                      <option value="Animal Care Worker">
                        Animal Care Worker
                      </option>
                      <option value="Digital Marketing">
                        Digital Marketing
                      </option>
                      <option value="Administrative Officer">
                        Administrative Officer
                      </option>
                      <option value="Garage Services">Garage Services</option>
                    </select>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label
                      htmlFor="choices-single-location"
                      className="form-label"
                    >
                      Employee Type
                    </label>
                    <select
                      className="form-select"
                      name="choices-single-employeeType"
                      id="choices-single-employeeType"
                      aria-label="Default select example"
                      value={employeeType}
                      onChange={(e) => setEmployeeType(e.target.value)}
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label htmlFor="salary" className="form-label">
                      Salary($)
                    </label>
                    <FormControl
                      type="number"
                      className="form-control"
                      id="salary"
                      placeholder="Salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label htmlFor="qualification" className="form-label">
                      Qualification
                    </label>
                    <Input
                      type="text"
                      className="form-control"
                      id="qualification"
                      placeholder="Qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label
                      htmlFor="choices-single-location"
                      className="form-label"
                    >
                      Location
                    </label>
                    <select
                      className="form-select"
                      name="choices-single-location"
                      id="choices-single-location"
                      aria-label="Default select example"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="Famagusta">Famagusta</option>
                      <option value="Nicosia">Nicosia</option>
                      <option value="Kyrenia">Kyrenia</option>
                      <option value="Morphou">Morphou</option>
                      <option value="Lefka">Lefka</option>
                      <option value="Iskele">Iskele</option>
                    </select>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label
                      htmlFor="choices-single-location"
                      className="form-label"
                    >
                      Experience
                    </label>
                    <select
                      className="form-select"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    >
                      <option value="0-3">0 - 3 Years</option>
                      <option value="3-5">3 - 5 Years</option>
                      <option value="5+">5+ Years</option>
                    </select>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label htmlFor="sector" className="form-label">
                      Sector{" "}
                    </label>
                    <Input
                      type="text"
                      className="form-control"
                      id="sector"
                      placeholder="Sector"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label htmlFor="position" className="form-label">
                      Position{" "}
                    </label>
                    <Input
                      type="text"
                      className="form-control"
                      id="position"
                      placeholder="Position"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label htmlFor="responsibilities" className="form-label">
                      Responsibilities{" "}
                    </label>
                    <div className="responsibilities-input">
                      <input
                        type="text"
                        className="form-control"
                        id="responsibilities"
                        placeholder="Responsibilities"
                        value={newResponsibility}
                        onChange={(e) => setNewResponsibility(e.target.value)}
                      />
                      <button
                        className="btn btn-blue mt-1" type="button"
                        onClick={addResponsibility}
                      >
                        Add
                      </button>

                      {responsibilities.map((responsibility, index) => (
                        <span
                          key={index}
                          className="badge bg-soft-success ms-2"
                        >
                          {responsibility}
                          <button
                            className="badge bg-soft-danger" type="button"
                            onClick={() => removeResponsibility(index)}
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label htmlFor="requirements" className="form-label">
                      Requirements{" "}
                    </label>
                    <div className="requirements-input">
                      <input
                        type="text"
                        className="form-control"
                        id="requirements"
                        placeholder="Requirements"
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                      />
                      <button
                        className="btn btn-blue mt-1" type="button"
                        onClick={addRequirement}
                      >
                        Add
                      </button>

                      {requirements.map((requirements, index) => (
                        <span
                          key={index}
                          className="badge bg-soft-success ms-2"
                        >
                          {requirements}
                          <button
                            className="badge bg-soft-danger "
                            type="button"
                            onClick={() => removeRequirement(index)}
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <label htmlFor="skills" className="form-label">
                      Job Skills{" "}
                    </label>
                    <div className="skills-input">
                      <input
                        type="text"
                        className="form-control"
                        id="skills"
                        placeholder="Job Skills"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                      />
                      <button className="btn btn-blue mt-1" onClick={addSkill} type="button">
                        Add
                      </button>

                      {skills.map((skills, index) => (
                        <span
                          key={index}
                          className="badge bg-soft-success ms-2"
                        >
                          {skills}
                          <button
                            className="badge bg-soft-danger" type="button"
                            onClick={() => removeSkill(index)}
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="d-flex flex-wrap align-items-start gap-1 justify-content-end">
                    <Link to="/" className="btn btn-success">
                      Back
                    </Link>
                    <Link className="btn btn-blue" onClick={handlePostJob}>
                      Post Now <i className="mdi mdi-send"></i>
                    </Link>
                  </div>
                  <div className="modal-dialog modal-dialog-centered">
                    <Modal
                      isOpen={modal}
                      toggle={openModal}
                      centered
                      tabIndex="-1"
                    >
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Job Post
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={openModal}
                        ></button>
                      </div>
                      <ModalBody>
                        <div>
                          <p>
                            {" "}
                            Your Job is Posted Successfully!
                          </p>
                        </div>
                      </ModalBody>
                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={openModal}
                          className="btn btn-primary btn-sm"
                        >
                          Close
                        </button>
                      </div>
                    </Modal>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default JobPostEdit;
