import React, { useState } from "react";
import { Button, Col, Collapse, Input } from "reactstrap";

const Sidebar = ({ sharedVariable, onVariableChange }) => {
  const handleChange = (experience, employeeType, date) => {
    const newValue = { experience, employeeType, date, isTopel: false };
    onVariableChange(newValue);
  };

  const [toggleSecond, setToggleSecond] = useState(true);
  const [toggleThird, setToggleThird] = useState(true);
  const [toggleFourth, setToggleFourth] = useState(true);

  const [experience, setExperience] = useState("");
  const [employmentType, setEmployment] = useState("");
  const [date, setDate] = useState('30');

  return (
    <React.Fragment>
      <Col lg={3}>
        <div className="side-bar mt-5 mt-lg-0">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="experienceOne">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleSecond(!toggleSecond);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  Work experience
                </Button>
              </h2>
              <Collapse isOpen={toggleSecond}>
                <div className="accordion-body">
                  <div className="side-title">
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name=""
                        id="empty2"
                        value={""}
                        checked={experience === ""}
                        onChange={(e) => {
                          setExperience(e.target.value);
                          handleChange(e.target.value, employmentType, date);
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="empty2"
                      >
                        All
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="0-3"
                        id="0-3"
                        value={"0-3"}
                        checked={experience === "0-3"}
                        onChange={(e) => {
                          setExperience(e.target.value);
                          handleChange(e.target.value, employmentType, date);
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="0-3"
                      >
                        0 - 3 Years
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="3-5"
                        id="3-5"
                        value={"3-5"}
                        checked={experience === "3-5"}
                        onChange={(e) => {
                          setExperience(e.target.value);
                          handleChange(e.target.value, employmentType, date);
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="3-5"
                      >
                        3 - 5 Years
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="5+"
                        id="5+"
                        value={"5+"}
                        checked={experience === "5+"}
                        onChange={(e) => {
                          setExperience(e.target.value);
                          handleChange(e.target.value, employmentType, date);
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="5+"
                      >
                        5+ Years
                      </label>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>

            <div className="accordion-item mt-3">
              <h2 className="accordion-header" id="jobType">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleThird(!toggleThird);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  Type of employment
                </Button>
              </h2>
              <Collapse isOpen={toggleThird}>
                <div className="accordion-body">
                  <div className="side-title">
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name=""
                        id="empty1"
                        value={""}
                        checked={employmentType === ""}
                        onChange={(e) => {
                          setEmployment(e.target.value);
                          handleChange(experience, e.target.value, date);
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="empty1"
                      >
                        All
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="Full Time"
                        id="Full Time"
                        value={"Full Time"}
                        checked={employmentType === "Full Time"}
                        onChange={(e) => {
                          setEmployment(e.target.value);
                          handleChange(experience, e.target.value, date);
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="Full Time"
                      >
                        Full Time
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="Intern"
                        id="Intern"
                        value={"Intern"}
                        checked={employmentType === "Intern"}
                        onChange={(e) => {
                          setEmployment(e.target.value);
                          handleChange(experience, e.target.value, date);
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="Intern"
                      >
                        Internship
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="Part Time"
                        id="Part Time"
                        value={"Part Time"}
                        checked={employmentType === "Part Time"}
                        onChange={(e) => {
                          setEmployment(e.target.value);
                          handleChange(experience, e.target.value, date);
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="Part Time"
                      >
                        Part Time
                      </label>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
            <div className="accordion-item mt-3">
              <h2 className="accordion-header" id="datePosted">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleFourth(!toggleFourth);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  Date Posted
                </Button>
              </h2>
              <Collapse isOpen={toggleFourth}>
                <div className="accordion-body">
                  <div className="side-title">
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="24Hours"
                        id="24Hours"
                        value={'1'}
                        checked={date === '1'}
                        onChange={(e) => {
                          setDate(e.target.value);
                          handleChange(
                            experience,
                            employmentType,
                            e.target.value
                          );
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="24Hours"
                      >
                        Last 24 Hours
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="1week"
                        id="1week"
                        value={'7'}
                        checked={date === '7'}
                        onChange={(e) => {
                          setDate(e.target.value);
                          handleChange(
                            experience,
                            employmentType,
                            e.target.value
                          );
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="1week"
                      >
                        Last 1 Week
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name=""
                        id="1month"
                        value={'30'}
                        checked={date === '30'}
                        onChange={(e) => {
                          setDate(e.target.value);
                          handleChange(
                            experience,
                            employmentType,
                            e.target.value
                          );
                        }}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="1month"
                      >
                        Last 1 Month
                      </label>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default Sidebar;
