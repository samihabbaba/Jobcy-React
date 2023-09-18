import React, { useState } from "react";
import { Collapse } from "reactstrap";

const AccordianContentRight = () => {
  //Collapse Tab

  const [isCollapseFourth, setIsCollapseFourth] = useState(false);
  const toggleFourth = () => setIsCollapseFourth(!isCollapseFourth);

  const [isCollapseFifth, setIsCollapseFifth] = useState(false);
  const toggleFifth = () => setIsCollapseFifth(!isCollapseFifth);

  const [isCollapseSixth, setIsCollapseSixth] = useState(false);
  const toggleSixth = () => setIsCollapseSixth(!isCollapseSixth);
  return (
    <React.Fragment>
      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="generalfour">
          <button
            className="accordion-button"
            onClick={toggleFourth}
            type="button"
          >
            How can companies post job listings on your website?
          </button>
        </h2>
        <Collapse isOpen={isCollapseFourth} id="general-four">
          <div className="accordion-body">
            To post job listings, companies need to create an employer account
            on our platform. Once registered, they can access their dashboard
            and select the option to post a job. Fill in the necessary details
            about the job, including the title, description, requirements, and
            application process. After review, the job listing will be made
            visible to our vast pool of job seekers.
          </div>
        </Collapse>
      </div>

      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="generalfive">
          <button
            className="accordion-button"
            onClick={toggleFifth}
            type="button"
          >
            What measures do you take to ensure the privacy of user data?
          </button>
        </h2>
        <Collapse isOpen={isCollapseFifth} id="general-five">
          <div className="accordion-body">
            We take privacy and security seriously. We employ industry-standard
            encryption protocols to protect user data. Additionally, we adhere
            to strict privacy policies and ensure that user information is
            handled in accordance with applicable data protection laws. We never
            share personal information with third parties without explicit
            consent.
          </div>
        </Collapse>
      </div>

      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="generalsix">
          <button
            className="accordion-button"
            onClick={toggleSixth}
            type="button"
          >
            How can I edit or update my job application materials?
          </button>
        </h2>
        <Collapse isOpen={isCollapseSixth} id="general-six">
          <div className="accordion-body">
            To edit or update your job application materials, log in to your
            account and navigate to your profile or dashboard. Look for the
            section where you can manage your documents or application
            materials. From there, you can upload new versions of your resume,
            cover letter, or other relevant documents. Make sure to save your
            changes, and the updated materials will be available for future job
            applications.
          </div>
        </Collapse>
      </div>
    </React.Fragment>
  );
};

export default AccordianContentRight;