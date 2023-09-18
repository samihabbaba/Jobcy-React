/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getUserData } from "../../../helpers/helper";
import { useState } from "react";

const LeftSideContent = () => {
  const user = getUserData();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const [companyData, setCompanyData] = useState(
    JSON.parse(params.get("company"))
  );
  const [companyImg, setCompanyImg] = useState("");

  const authToken = user?.access_token;
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const checkDate = (date) => {
    console.log(date);
    if (date) {
      return new Date(date).getFullYear();
    } else {
      return "";
    }
  };
 
  const img = async () => {
    const resp = await axiosInstance.get(`/file/${companyData.image.fileId}`, {
      responseType: "blob",
    });
    // .then((res) => {
    //   ;
    //   companyData.image.file2 = blobUrl;
    // });

    const blobUrl = window.URL.createObjectURL(resp.data);
    setCompanyImg(blobUrl);
    console.log(companyImg)
  };

  useEffect(() => {
    img();
    if (!companyData) {
      window.location.href = "/error404";
    }
  },[]);

  return (
    <React.Fragment>
      <Col lg={4}>
        <Card className="side-bar">
          <CardBody className="p-4">
            <div className="candidate-profile text-center">
              <img
                src={companyImg}
                alt="no img"
                className="avatar-lg rounded-circle"
              />
              <h6 className="fs-18 mb-1 mt-4">{companyData?.companyName}</h6>
              <p className="text-muted mb-4">
                {checkDate(companyData?.established)}
              </p>
              <ul className="candidate-detail-social-menu list-inline mb-0">
                <li className="list-inline-item">
                  <a
                    href={"tel:" + companyData?.telephone}
                    target="_blank"
                    className="social-link rounded-3 btn-soft-danger"
                  >
                    <i className="uil uil-phone-alt"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href={"tel:" + companyData?.telephone}
                    target="_blank"
                    className="social-link rounded-3 btn-soft-success"
                  >
                    <i className="uil uil-whatsapp"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href={"tel:" + companyData?.linkedId}
                    target="_blank"
                    className="social-link rounded-3 btn-soft-primary"
                  >
                    <i className="uil uil-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </CardBody>

          <CardBody className="candidate-profile-overview border-top p-4">
            <h6 className="fs-17 fw-semibold mb-3">Profile Overview</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <div className="d-flex">
                  <label className="text-dark">Owner </label>
                  <div>
                    <p className="text-muted mb-0">{companyData?.owner}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <label className="text-dark">Employees</label>
                  <div>
                    <p className="text-muted mb-0">{companyData?.employees}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <label className="text-dark">Location</label>
                  <div>
                    <p className="text-muted mb-0">{companyData?.location}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <label className="text-dark">Website</label>
                  <div>
                    <p className="text-muted text-break mb-0">
                      {companyData?.website}
                    </p>
                  </div>
                </div>
              </li>
              <li></li>
            </ul>
          </CardBody>
          <CardBody className="p-4 border-top">
            <div className="ur-detail-wrap">
              <div className="ur-detail-wrap-header">
                <h6 className="fs-17 fw-semibold mb-3">Working Days</h6>
              </div>
              <div className="ur-detail-wrap-body">
                <ul className="working-days">
                  <li>
                    Monday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Tuesday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Wednesday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Thursday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Friday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Saturday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Sunday<span className="text-danger">Close</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default LeftSideContent;
