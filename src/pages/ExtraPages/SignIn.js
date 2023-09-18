import React from "react";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import MetaTags from "react-meta-tags";
import signInImage from "../../assets/images/auth/sign-in.png";
import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("/auth/sign-in", {
          username,
          password,
        })
        .then(
          (response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response);
            window.location.href = "/";
          },
          (err) => {
            setErrorMessage("Invalid username or password");
            console.log(err);
          }
        );
    } catch (error) {
      // Handle error, e.g., display error message
      console.error("Error signing in:", error);
    }
  };
  return (
    <Form onSubmit={handleSubmit} className="auth-form">
      <React.Fragment>
        <div>
          <div className="main-content">
            <div className="page-content">
              <MetaTags>
                <title>Sign In | CareerHub</title>
              </MetaTags>
              <section className="bg-auth">
                <Container>
                  <Row className="justify-content-center">
                    <Col xl={10} lg={12}>
                      <Card className="auth-box">
                        <Row className="g-0">
                          <Col lg={6} className="text-center">
                            <CardBody className="p-4">
                              <div className="mt-5">
                                <img
                                  src={signInImage}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                            </CardBody>
                          </Col>
                          <Col lg={6}>
                            <CardBody className="auth-content p-5 h-100 text-white">
                              <div className="w-100">
                                <div className="text-center mb-4">
                                  <h5>Welcome Back !</h5>
                                  <p className="text-white-70">
                                    Sign in to continue to CareerHub.
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
                                    id="usernameInput"
                                    placeholder="Enter your username"
                                    required
                                    value={username}
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="passwordInput"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <FormControl
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <div className="mb-4">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheckDefault"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      Remember me
                                    </label>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <button
                                    type="submit"
                                    className="btn btn-white btn-hover w-100"
                                  >
                                    Sign In
                                  </button>
                                  {errorMessage && (
                                    <div className="mt-3 text-center text-danger ">
                                      {errorMessage}
                                    </div>
                                  )}
                                </div>
                                <div className="mt-4 text-center">
                                  <p className="mb-0">
                                    Don't have an account ?{" "}
                                    <Link
                                      to="/signup"
                                      className="fw-medium text-white text-decoration-underline"
                                    >
                                      {" "}
                                      Sign Up{" "}
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

export default SignIn;
