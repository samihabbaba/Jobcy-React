import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const PrivacyAndPolicyPage = () => {
  const privacyandpolicyPage = [
    {
      id: 1,
      policyTitle: "Use for CareerHub",
      policyRules: [
        {
          id: 1,
          policyInnerRule:
            "At CareerHub, we are committed to protecting the privacy and personal information of our users, including both job seekers and companies. This Privacy Policy outlines how we collect, use, and safeguard the information provided to us through our job search website. By using our platform, you consent to the practices described in this policy.",
        },
      ],
    },
    {
      id: 2,
      policyTitle: "Information We Use",
      policyRules: [
        {
          id: 1,
          policyInnerRule:
            " For Job Seekers: We may collect personal information such as your name, contact details, resume, cover letter, and employment history.",
        },
        {
          id: 2,
          policyInnerRule:
            " For Companies: We may collect personal information such as your company name, contact details, and job listings.",
        },
      ],
    },
    {
      id: 3,
      policyTitle: "Use of Information",
      policyRules: [
        {
          id: 1,
          policyInnerRule:
            " For Job Seekers : We use the information provided to connect you with relevant job opportunities and facilitate the application process.Your personal information may be shared with companies for the purpose of job applications.",
        },
        {
          id: 2,
          policyInnerRule:
            " For Companies: We use the information provided to display your job listings, manage applications, and facilitate communication with job seekers.Your company information may be visible to job seekers on our platform.",
        },
      ],
    },
    {
      id: 4,
      policyTitle: "Data Security",
      policyRules: [
        {
          id: 1,
          policyInnerRule:
            " We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
        },
        {
          id: 2,
          policyInnerRule:
            " However, no method of transmission or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.",
        },
      ],
    },
    {
      id: 5,
      policyTitle: "Cookies and Tracking Technologies",
      policyRules: [
        {
          id: 1,
          policyInnerRule:
            " We may use cookies and similar tracking technologies to enhance your experience on our website, analyze usage patterns, and personalize content and advertisements.",
        },
      ],
    },
    {
      id: 6,
      policyTitle: "Third-Party Links",
      policyRules: [
        {
          id: 1,
          policyInnerRule:
            "Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage users to review the privacy policies of those third parties.",
        },
      ],
    },
  ];
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            {privacyandpolicyPage.map((privacyandpolicyDetails, key) => (
              <Col lg={12} key={key}>
                <h5 className="mb-4">{privacyandpolicyDetails.policyTitle}</h5>
                <ul className="about-list list-unstyled text-muted mb-4 pb-2">
                  {privacyandpolicyDetails.policyRules.map(
                    (privacyandpolicyInner, key) => (
                      <li key={key}>{privacyandpolicyInner.policyInnerRule}</li>
                    )
                  )}
                </ul>
              </Col>
            ))}
            <div className="text-end">
              <Link to="#" className="btn btn-primary">
                <i className="uil uil-print"></i> Print
              </Link>
            </div>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default PrivacyAndPolicyPage;