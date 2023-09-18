import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Card,
  Col,
  Input,
  Row,
  CardBody,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useState } from "react";
import { FormControl, Form } from "react-bootstrap";
import { generateRandomCode } from "../../helpers/helper";
import MetaTags from "react-meta-tags";
import axios from "axios";
import Modal from "react-modal";
import signUpImage from "../../assets/images/auth/sign-up.png";

const randomCode = generateRandomCode();

const SignUp = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobSeeker");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [telephone, setTelephone] = useState("");
  const [code, setCode] = useState("");
  const openModal2 = () => setShowModal2(!showModal2);

  const customModalStyles = {
    content: {
      width: "500px",
      height: "300px",
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: "10px",
      outline: "none",
      padding: "20px",
    },
    closeBtn: {
      position: "absolute",
      top: "10px",
      right: "15px",
      cursor: "pointer",
      fontSize: "20px",
      fontWeight: "bold",
    },
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const showAuthenticationModal = async () => {
    if (telephone && username && password) {

      // 1

      // setShowModal2(true);
      // await axiosInstance
      //   .post("/user/sms", {
      //     telephone: telephone,
      //     message: `Your code is ${randomCode} .`,
      //   })
      //   .then((resp) => {
      //     if (resp.status === 201) {
      //       console.log(resp.data);
      //     }
      //   });



      // 2

      console.log("THIS IS THE CODE " + randomCode);
      setShowModal2(true);
      
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Number(randomCode) === Number(code)) {
      await axiosInstance
        .post("/user", {
          username,
          password,
          role,
          telephone,
        })
        .then(
          () => {
            setShowModal2(false);
            setShowModal(true);
          },
          () => {
            setShowModal(false);
            setShowModal2(false);
            setErrorMessage(
              "Username already exists! Please try another username!"
            );
          }
        );
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setShowModal2(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="auth-form">
      <React.Fragment>
        <div>
          <div className="main-content">
            <div className="page-content">
              <MetaTags>
                <title>Sign Up | CareerHub</title>
              </MetaTags>
              <section className="bg-auth">
                <Container>
                  <Row className="justify-content-center">
                    <Col xl={10} lg={12}>
                      <Card className="auth-box">
                        <Row className="align-items-center">
                          <Col lg={6} className="text-center">
                            <CardBody className="p-4">
                              <div className="mt-5">
                                <img
                                  src={signUpImage}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                            </CardBody>
                          </Col>
                          <Col lg={6}>
                            <CardBody className="auth-content p-5 text-white">
                              <div className="w-100">
                                <div className="text-center">
                                  <h5>Let's Get Started</h5>
                                  <p className="text-white-70">
                                    Sign Up and get access to all the features
                                    of CareerHub
                                  </p>
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="usernameInput"
                                    className="form-label"
                                  >
                                    Username
                                  </label>
                                  <FormControl
                                    type="text"
                                    className="form-control"
                                    required
                                    id="usernameInput"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="emailInput"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <FormControl
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="phoneNumberInput"
                                    className="form-label"
                                  >
                                    Phone Number
                                  </label>
                                  <FormControl
                                    type="text"
                                    className="form-control"
                                    id="telephoneInput"
                                    placeholder="+90 XXX XXXX"
                                    required
                                    value={telephone}
                                    onChange={(e) =>
                                      setTelephone(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="mb-3">
                                  <div
                                    className="form-check"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    <label>
                                      <input
                                        type="radio"
                                        name="option"
                                        className="form-check-input"
                                        id="flexCheckDefault"
                                        checked={role === "jobSeeker"}
                                        value="jobSeeker"
                                        onChange={handleChange}
                                      />
                                      Job Seeker
                                    </label>
                                    <label>
                                      <input
                                        type="radio"
                                        name="option"
                                        className="form-check-input"
                                        id="flexCheckDefault"
                                        checked={role === "company"}
                                        value="company"
                                        onChange={handleChange}
                                      />
                                      Company
                                    </label>
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="form-check">
                                    <Input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheckDefault"
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      I agree to the{" "}
                                      <Link
                                        to="#"
                                        className="text-white text-decoration-underline"
                                      >
                                        Terms and conditions
                                      </Link>
                                    </label>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <button
                                    type="button"
                                    className="btn btn-white btn-hover w-100"
                                    onClick={showAuthenticationModal}
                                  >
                                    Sign Up
                                  </button>
                                  {errorMessage && (
                                    <div className="mt-3 text-center text-danger ">
                                      {errorMessage}
                                    </div>
                                  )}
                                  <Modal
                                    isOpen={showModal2}
                                    onRequestClose={handleCloseModal}
                                    style={customModalStyles}
                                    contentLabel="Sign Up Modal"
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          flexDirection: "column",
                                          alignItems: "center",
                                        }}
                                      >
                                        <h2>2FA Authentication</h2>
                                        <FormControl
                                          type="text"
                                          className="form-control"
                                          id="validationcode"
                                          placeholder="Validation Code"
                                          required
                                          value={code}
                                          onChange={(e) =>
                                            setCode(e.target.value)
                                          }
                                        />
                                      </div>

                                      <div>
                                        <button
                                          className="btn btn-blue btn-hover w-100 mt-2 mb-1"
                                          onClick={handleSubmit}
                                        >
                                          Send
                                        </button>
                                      </div>
                                      <div
                                        style={customModalStyles.closeBtn}
                                        onClick={handleCloseModal}
                                      >
                                        X
                                      </div>
                                    </div>
                                  </Modal>
                                  <Modal
                                    isOpen={showModal}
                                    onRequestClose={handleCloseModal}
                                    style={customModalStyles}
                                    contentLabel="Sign Up Modal"
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          flexDirection: "column",
                                          alignItems: "center",
                                        }}
                                      >
                                        <h2>Thank you for registration!</h2>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="64"
                                          height="64"
                                          viewBox="0 0 24 24"
                                          fill="#008000"
                                        >
                                          <path d="M9 16.172l-4.586-4.586-1.414 1.414 6 6 .586.586.586-.586 10-10-1.414-1.414z" />
                                        </svg>
                                      </div>

                                      <div>
                                        <Link to="/signin">
                                          <button className="btn btn-blue btn-hover w-100 mt-2 mb-1">
                                            Sign in
                                          </button>
                                        </Link>
                                      </div>
                                      <div
                                        style={customModalStyles.closeBtn}
                                        onClick={handleCloseModal}
                                      >
                                        X
                                      </div>
                                    </div>
                                  </Modal>
                                </div>
                                {/* </Form> */}
                                <div className="mt-3 text-center">
                                  <p className="mb-0">
                                    Already a member ?{" "}
                                    <Link
                                      to="/signin"
                                      className="fw-medium text-white text-decoration-underline"
                                    >
                                      {" "}
                                      Sign In{" "}
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </CardBody>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    </Form>
  );
};

export default SignUp;
