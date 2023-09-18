import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getUserData } from "../../../helpers/helper";

//Import Images
import jobImages2 from "../../../assets/images/featured-job/img-02.png";

axios.defaults.baseURL = "http://localhost:3000";

const RightSideContent = () => {
  const user = getUserData();
  const authToken = user?.access_token;
  const location = useLocation();

  const selectedJob = location?.state?.selectedJobDetails;

  let selectedJobId;
  let companyId;

  if (selectedJob && selectedJob.job && selectedJob.job.jobId) {
    selectedJobId = selectedJob.job.jobId;

    console.log(selectedJobId);
  } else if (selectedJob && selectedJob.jobId) {
    selectedJobId = selectedJob.jobId;
    console.log(selectedJobId);
  }
  if (selectedJob && selectedJob.job && selectedJob.job.companyId) {
    companyId = selectedJob.job.companyId;

    console.log(companyId);
  } else if (selectedJob && selectedJob.companyId) {
    companyId = selectedJob.companyId;
    console.log(companyId);
  }

  if (selectedJobId == null) {
    window.location.href = "/error404";
  }
  const companyDetails = async (companyId) => {
    const resp = await axiosInstance.get(`/company/${companyId}`);
    await axiosInstance
      .get(`/file/${resp.data.image.fileId}`, {
        responseType: "blob",
      })
      .then((res) => {
        const blobUrl = window.URL.createObjectURL(res.data);
        resp.data.imageSrc = blobUrl;
        const compData = JSON.stringify(resp.data);
        const destinationUrl = `/companydetails?company=${compData}`;
        window.location.href = destinationUrl;
      });
  };

  const img = async () => {
    const resp = await axiosInstance.get(`/company/${companyId}`);
    await axiosInstance
      .get(`/file/${resp.data.image.fileId}`, {
        responseType: "blob",
      })
      .then((res) => {
        const blobUrl = window.URL.createObjectURL(res.data);
        selectedJob.imageSrc = blobUrl;
        console.log(selectedJob.imageSrc);
      });
  };

  const [job, setJob] = useState();
  const checkDateYear = (date) => {
    console.log(date);

    if (date) {
      return new Date(date).getFullYear();
    } else {
      return "";
    }
  };
  const checkDate = (date) => {
    console.log(date);
    if (date) {
      const formattedDate = new Date(date);
      const year = formattedDate.getFullYear();
      const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
      const day = String(formattedDate.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    } else {
      return "";
    }
  };
  useEffect(() => {
    img();
    console.log(selectedJob);
  });

  //Getting bearer token
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  useEffect(() => {
    const getJobById = async () => {
      try {
        const response = await axiosInstance.get(`/job/${selectedJobId}`);
        const responseData = response?.data;
        console.log(responseData);
        setJob(responseData);
      } catch (error) {
        console.error("Error fetching job", error);
      }
    };
    getJobById();
  }, []);

  return (
    <React.Fragment>
      <div className="side-bar ms-lg-4">
        <Card className="job-overview">
          <CardBody className="p-4">
            <h6 className="fs-17">Job Overview</h6>
            <ul className="list-unstyled mt-4 mb-0">
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-user icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Job Title</h6>
                    <p className="text-muted mb-0">{job?.title}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-star-half-alt icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Experience</h6>
                    <p className="text-muted mb-0">{job?.experience}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-location-point icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Location</h6>
                    <p className="text-muted mb-0">{job?.location}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-usd-circle icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Salary</h6>
                    <p className="text-muted mb-0">{job?.salary}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-graduation-cap icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Qualification</h6>
                    <p className="text-muted mb-0">{job?.qualification}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-building icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Industry</h6>
                    <p className="text-muted mb-0">{job?.industry}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-history icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Date Posted</h6>
                    <p className="text-muted mb-0">
                      {checkDate(job?.createdAt)}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card className="company-profile mt-4">
          <CardBody className="p-4">
            <div className="text-center">
            

              <div className="mt-4">
                <h6 className="fs-17 mb-1">{job?.company?.companyName}</h6>
                <p className="text-muted">
                  {checkDateYear(job?.company?.established)}
                </p>
              </div>
            </div>
            <ul className="list-unstyled mt-4">
              <li>
                <div className="d-flex">
                  <i className="uil uil-phone-volume text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Phone</h6>
                    <p className="text-muted fs-14 mb-0">
                      {job?.company?.telephone}
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-envelope text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Email</h6>
                    <p className="text-muted fs-14 mb-0">
                      {job?.company?.companyEmail}
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-globe text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Website</h6>
                    <p className="text-muted fs-14 text-break mb-0">
                      {job?.company?.website}
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-map-marker text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Location</h6>
                    <p className="text-muted fs-14 mb-0">
                      {job?.company?.location}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <div className="mt-4">
              <button
                type="button"
                className="btn btn-blue w-100 "
                style={{ border: "0px" }}
                onClick={() => companyDetails(job?.company?.companyId)}
              >
                <i className="mdi mdi-eye"></i> View Company
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default RightSideContent;
