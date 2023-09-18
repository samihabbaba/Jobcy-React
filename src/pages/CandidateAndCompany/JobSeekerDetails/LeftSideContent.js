import React,{useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

//Import images
import featureImage from "../../../assets/images/featured-job/img-01.png";

const LeftSideContent = () => {
  
  const location = useLocation();

  const jobSeeker = location?.state?.jobSeeker;

  useEffect(() => {
    
    console.log(jobSeeker);
  });
  return (
    <Col lg={4}>
    <div className="image-holder d-flex align-items-center justify-content-center mb-2">
     

    

      <img
        src={jobSeeker?.image?.file}
        className="img-fluid rounded-circle"
        height="200px"
        width="200px"
      />
    </div>
      <Card className="profile-sidebar me-lg-4">
        <CardBody className="p-4">
          <div className="text-center pb-4 border-bottom">
            <h5 className="mb-0">{jobSeeker?.name}</h5>
            <p className="text-muted">{jobSeeker?.title}</p>
            <ul className="candidate-detail-social-menu list-inline mb-0">
              <li className="list-inline-item">
                <a
                  href={"tel:" + jobSeeker?.telephone}
                  target="_blank"
                  className="social-link rounded-3 btn-soft-danger"
                >
                  <i className="uil uil-phone-alt"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href={"https://wa.me/" + jobSeeker?.telephone}
                  target="_blank"
                  className="social-link rounded-3 btn-soft-success"
                >
                  <i className="uil uil-whatsapp"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a
                href={jobSeeker?.linkedIn}
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
                        {jobSeeker?.email}
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <label>Phone Number</label>
                    <div>
                      <p className="text-muted mb-0">
                      {jobSeeker?.telephone}
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <label>Location</label>
                    <div>
                      <p className="text-muted mb-0">
                      {jobSeeker?.location}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
  </Col>
  );
};

export default LeftSideContent;