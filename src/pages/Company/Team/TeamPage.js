import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//Import Images
import teamMemberImage1 from "../../../assets/images/user/img-duygu-hoca.PNG";
import teamMemberImage2 from "../../../assets/images/user/img-salahi.PNG";
import teamMemberImage3 from "../../../assets/images/user/img-salih.PNG";
import teamMemberImage4 from "../../../assets/images/user/img-kerim.PNG";
import teamMemberImage5 from "../../../assets/images/user/img-sami.PNG";

const TeamPage = () => {
  const teamPage = [
    {
      id: 1,
      teamMemberImage: teamMemberImage1,
      teamMemberName: "Assoc. Prof. Dr. Duygu Çelik Ertuğrul",
      teamMemberPosition: "Partner & Project Manager & Advisor",
    },
    {
      id: 2,
      teamMemberImage: teamMemberImage2,
      teamMemberName: "Salahi Erensel",
      teamMemberPosition: "Partner & Developer",
    },
    {
      id: 3,
      teamMemberImage: teamMemberImage3,
      teamMemberName: "Salih Topel Kaymakamoğlu",
      teamMemberPosition: "Partner & Developer",
    },
    {
      id: 4,
      teamMemberImage: teamMemberImage4,
      teamMemberName: "Kerim Yusufcan",
      teamMemberPosition: "Partner & Developer",
    },
    {
      id: 5,
      teamMemberImage: teamMemberImage5,
      teamMemberName: "Sami Habbaba",
      teamMemberPosition: "Partner & Developer",
    },
  ];
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row>
            {teamPage.map((teamPageDetails, key) => (
              <Col lg={4} md={6} key={key}>
                <div className="team-box card border-0 mt-4">
                  <div className="team-img position-relative mx-auto">
                    <img
                      src={teamPageDetails.teamMemberImage}
                      alt=""
                      className="img-thumbnail"
                    />
                    <ul className="team-social list-unstyled">
                      <li>
                        <Link to="#">
                          <i className="mdi mdi-facebook"></i>
                        </Link>
                      </li>
                      <li className="my-1">
                        <Link to="#">
                          <i className="mdi mdi-github"></i>
                        </Link>{" "}
                      </li>
                      <li>
                        <Link to="#">
                          <i className="mdi mdi-linkedin"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="team-content card-body text-center">
                    <Link to="#" className="primary-link">
                      <h6 className="fs-17 mb-1">
                        {teamPageDetails.teamMemberName}
                      </h6>
                    </Link>
                    <p className="text-muted mb-0">
                      {teamPageDetails.teamMemberPosition}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default TeamPage;