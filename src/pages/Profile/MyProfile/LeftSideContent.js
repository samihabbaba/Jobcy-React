import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { Card, CardBody, Col } from "reactstrap";
import RcIf, { RcElse } from "rc-if";
import axios from "axios";
import {
  getUserData,
  getFile,
  setCompanyLocal,
  setSeekerLocal,
  getCompanyLocal,
  getSeekerLocal,
} from "../../../helpers/helper";
import teamMemberImage5 from "../../../assets/images/user/img-01.jpg";
axios.defaults.baseURL = "http://localhost:3000";

const user = getUserData();

const companyId = user?.company?.companyId;

const jobSeekerId = user?.jobSeeker?.jobSeekerId;

const LeftSideContent = () => {
  const checkDate = (date) => {
    console.log(date)
    if (date) {
      return new Date(date).getFullYear();
    } else {
      return null;
    }
  };

  const [jobSeeker, setJobSeeker] = useState(getSeekerLocal() || null);
  const [companyy, setCompanyy] = useState(getCompanyLocal() || null);
  const [company, setCompany] = useState(getCompanyLocal() || null);
  const [companyName, setCompanyName] = useState(companyy?.companyName || "");
  const [companyTelephone, setCompanyTelephone] = useState(
    companyy?.telephone || ""
  );
  const [companyLinkedin, setCompanyLinkedin] = useState(
    companyy?.linkedId || ""
  );
  const [companyOwner, setCompanyOwner] = useState(companyy?.owner || "");
  const [companyEstablished, setCompanyEstablished] = useState(
    checkDate(companyy?.established)
  );
  const [companyEmployees, setCompanyEmployees] = useState(
    companyy?.employees || ""
  );
  const [companyEmail, setCompanyEmail] = useState(
    companyy?.companyEmail || ""
  );
  const [companyLocation, setCompanyLocation] = useState(
    companyy?.location || ""
  );
  const [companyWebsite, setCompanyWebsite] = useState(companyy?.website || "");
  const [companySector, setCompanySector] = useState(companyy?.sector || "");
  const [jobSeekerName, setJobSeekerName] = useState(jobSeeker?.name || "");
  const [jobSeekerTitle, setJobSeekerTitle] = useState(jobSeeker?.title || "");
  const [jobSeekerTelephone, setJobSeekerTelephone] = useState(
    jobSeeker?.telephone || ""
  );
  const [jobSeekerLinkedin, setJobSeekerLinkedin] = useState(
    jobSeeker?.linkedIn || ""
  );
  const [jobSeekerEmail, setJobSeekerEmail] = useState(jobSeeker?.email || "");
  const [jobSeekerLocation, setJobSeekerLocation] = useState(
    jobSeeker?.location || ""
  );
  const authToken = user?.access_token;

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const axiosFile = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
  });



  const getCompanyById = async () => {
    const resp = await axiosInstance.get(`/company/${companyId}`);
    const companyData = resp.data;
    setCompanyy({ ...companyData });
    setCompanyLocal(companyData);
    if (companyData.image) {
      const file = await getFile(companyData.image.fileId);
      const url = window.URL.createObjectURL(file);
      setUserImg(url);
    }
  };

  const getJobSeekerById = async () => {
    const resp = await axiosInstance.get(`/job-seeker/${jobSeekerId}`);
    const jobSeekerdata = resp.data;
    setJobSeeker({ ...jobSeekerdata });
    setSeekerLocal(jobSeekerdata);
    console.log(jobSeeker, resp.data);
    if (jobSeekerdata.image) {
      const file = await getFile(jobSeekerdata.image.fileId);
      const url = window.URL.createObjectURL(file);
      setUserImg(url);
    }
  };

  let uploadedFile;

  const [userImg, setUserImg] = useState(teamMemberImage5);

  const handleFileChange = async (file) => {
    const input = file.currentTarget;

    let formData = new FormData();
    formData.append("file", input.files[0]);

    await axiosFile.post(`/file`, formData).then(async (res) => {
      uploadedFile = res.data;

      console.log(uploadedFile);
      if (companyId) {
        let objToSend = { ...companyy };
        objToSend.image = uploadedFile;
        await axiosInstance.put(`/company`, objToSend).then((x) => {
          console.log(x);
        });
      } else if (jobSeekerId) {
        let objToSend = { ...jobSeeker };
        objToSend.image = uploadedFile;
        await axiosInstance.put(`/job-seeker`, objToSend).then((x) => {
          console.log(x);
        });
      }
    });

    var reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      setUserImg(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  };

  useEffect(async () => {
    if (user.role === "jobSeeker") {
      await getJobSeekerById();
    } else if (user.role == "company") {
      await getCompanyById();
    }
  }, []);

  return (
    <React.Fragment>
      <Col lg={4}>
        <div className="image-holder d-flex align-items-center justify-content-center mb-2">
          <input
            className="d-none"
            id="select-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <label
            htmlFor="select-image"
            className="social-link rounded-3 btn-primary p-3"
            style={{ opacity: "0.5", position: "absolute", cursor: "pointer" }}
          >
            <i className="uil uil-edit "></i>
          </label>

          <img
            src={userImg}
            className="img-fluid rounded-circle"
            height="200px"
            width="200px"
          />
        </div>
        <RcIf if={user?.role === "jobSeeker"}>
          <Card className="profile-sidebar me-lg-4">
            <CardBody className="p-4">
              <div className="text-center pb-4 border-bottom">
                <h5 className="mb-0">{jobSeekerName}</h5>
                <p className="text-muted">{jobSeekerTitle}</p>
                <ul className="candidate-detail-social-menu list-inline mb-0">
                  <li className="list-inline-item">
                    <a
                      href={"tel:" + jobSeekerTelephone}
                      target="_blank"
                      className="social-link rounded-3 btn-soft-danger"
                    >
                      <i className="uil uil-phone-alt"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href={"https://wa.me/" + jobSeekerTelephone}
                      target="_blank"
                      className="social-link rounded-3 btn-soft-success"
                    >
                      <i className="uil uil-whatsapp"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href={jobSeekerLinkedin}
                      target="_blank"
                      className="social-link rounded-3 btn-soft-primary"
                    >
                      <i className="uil uil-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <h5 className="fs-17 fw-bold mb-3">Contacts</h5>
                <div className="profile-contact">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <div className="d-flex">
                        <label>Email</label>
                        <div>
                          <p className="text-muted text-break mb-0">
                            {jobSeekerEmail}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <label>Phone Number</label>
                        <div>
                          <p className="text-muted mb-0">
                            {jobSeekerTelephone}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <label>Location</label>
                        <div>
                          <p className="text-muted mb-0">{jobSeekerLocation}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </RcIf>
        <RcIf if={user?.role === "company"}>
          <Card className="profile-sidebar me-lg-4">
            <CardBody className="p-4">
              <div className="text-center pb-4 border-bottom">
                <h5 className="mb-0">{companyName}</h5>
                <p className="text-muted">{companySector}</p>
                <ul className="candidate-detail-social-menu list-inline mb-0">
                  <li className="list-inline-item">
                    <a
                      href={"tel:" + companyTelephone}
                      target="_blank"
                      className="social-link rounded-3 btn-soft-danger"
                    >
                      <i className="uil uil-phone-alt"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href={"https://wa.me/" + companyTelephone}
                      target="_blank"
                      className="social-link rounded-3 btn-soft-success"
                    >
                      <i className="uil uil-whatsapp"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href={companyLinkedin}
                      target="_blank"
                      className="social-link rounded-3 btn-soft-primary"
                    >
                      <i className="uil uil-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <h5 className="fs-17 fw-bold mb-3">Company Information</h5>
                <div className="profile-contact">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <div className="d-flex">
                        <label>Owner</label>
                        <div>
                          <p className="text-muted text-break mb-0">
                            {companyOwner}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <label>Established</label>
                        <div>
                          <p className="text-muted text-break mb-0">
                            {companyEstablished || ''}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <label>Employees</label>
                        <div>
                          <p className="text-muted mb-0">{companyEmployees}</p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <h5 className="fs-17 fw-bold mb-3">Contact</h5>
                      <div className="d-flex">
                        <label>Email</label>
                        <div>
                          <p className="text-muted text-break mb-0">
                            {companyEmail}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <label>Phone Number</label>
                        <div>
                          <p className="text-muted mb-0">{companyTelephone}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <label>Location</label>
                        <div>
                          <p className="text-muted mb-0">{companyLocation}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <label>Website</label>
                        <div>
                          <p className="text-muted mb-0">
                            <a href={"https://" + companyWebsite}>
                              {companyWebsite}
                            </a>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </RcIf>
      </Col>
    </React.Fragment>
  );
};

export default LeftSideContent;
