import React, { useState } from "react";
import { Collapse } from "reactstrap";

const AccordianContentLeft = () => {
  const [isCollapseFirst, setIsCollapseFirst] = useState(false);
  const toggleFirst = () => setIsCollapseFirst(!isCollapseFirst);

  const [isCollapseSecond, setIsCollapseSecond] = useState(false);
  const toggleSecond = () => setIsCollapseSecond(!isCollapseSecond);

  const [isCollapseThird, setIsCollapseThird] = useState(false);
  const toggleThird = () => setIsCollapseThird(!isCollapseThird);

  return (
    <React.Fragment>
      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="buyingone">
          <button
            className="accordion-button"
            onClick={toggleFirst}
            type="button"
          >
            How can I create an account on your job search website?
          </button>
        </h2>
        <Collapse isOpen={isCollapseFirst} id="buying-one">
          <div className="accordion-body">
            To create an account, simply visit our website and visit the on the
            "Sign Up" page. Provide the required information, such as your
            username and a secure password, and you'll be ready to start
            exploring job opportunities or posting job listings.
          </div>
        </Collapse>
      </div>

      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="buyingtwo">
          <button
            className="accordion-button"
            onClick={toggleSecond}
            type="button"
          >
            How can I search for jobs on your platform?
          </button>
        </h2>
        <Collapse isOpen={isCollapseSecond} id="buying-two">
          <div className="accordion-body">
            Searching for jobs is easy. Just use our search bar and enter
            relevant keywords, job titles, or specific locations. You can also
            use advanced filters to refine your search based on criteria such as
            industry, experience level, or salary range. Our platform will
            display a list of relevant job listings matching your preferences.
          </div>
        </Collapse>
      </div>

      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="buyingthree">
          <button
            className="accordion-button"
            onClick={toggleThird}
            type="button"
          >
            How does your platform match job seekers with job listings?
          </button>
        </h2>
        <Collapse isOpen={isCollapseThird} id="buying-three">
          <div className="accordion-body">
            We employ intelligent matching algorithms that analyze various
            factors such as your skills, experience, and preferences to match
            you with the most suitable job listings. By leveraging advanced
            technology, we aim to connect you with opportunities that align with
            your qualifications and career aspirations.
          </div>
        </Collapse>
      </div>
    </React.Fragment>
  );
};

export default AccordianContentLeft;