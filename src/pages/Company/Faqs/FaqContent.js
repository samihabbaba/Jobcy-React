import React, { useState } from "react";

import {
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import { Link } from "react-router-dom";
import classnames from "classnames";
import AccordianContentLeft from "./AccordianContentLeft";
import AccordianContentRight from "./AccordianContentRight";

const FaqContent = () => {
  //Tab Change
  const [activeTab, setActiveTab] = useState("1");
  const TabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Nav
                className="faq-menu nav-fill nav-pills justify-content-center"
                id="pills-tab"
                role="tablist"
              >
                <NavItem>
                  <NavLink to="#" type="button">
                    General
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
          <Row className="align-items-center mt-5">
            <Col lg={12}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col lg={6}>
                      <div
                        className="accordion accordion-flush faq-box"
                        id="buying"
                      >
                        <AccordianContentLeft />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div
                        className="accordion accordion-flush faq-box"
                        id="generalTwo"
                      >
                        <AccordianContentRight />
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col lg={6}>
                      <div
                        className="accordion accordion-flush faq-box"
                        id="buying"
                      >
                        <AccordianContentLeft />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div
                        className="accordion accordion-flush faq-box"
                        id="buyingTwo"
                      >
                        <AccordianContentRight />
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col lg={6}>
                      <div
                        className="accordion accordion-flush faq-box"
                        id="payment"
                      >
                        <AccordianContentLeft />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div
                        className="accordion accordion-flush faq-box"
                        id="paymentTwo"
                      >
                        <AccordianContentRight />
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Col lg={6}>
                      <div
                        className="accordion accordion-flush faq-box"
                        id="support"
                      >
                        <AccordianContentLeft />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div
                        className="accordion accordion-flush faq-box"
                        id="supportTwo"
                      >
                        <AccordianContentRight />
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
            <Col lg={12}>
              <div className="text-center mt-5">
                <Link to="/contact" className="btn btn-primary btn-hover mt-2">
                  <i className="uil uil-phone"></i> Contact Us
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default FaqContent;