import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import RightSideContent from './RightSideContent';
import Section from './Section';
import MetaTags from "react-meta-tags";



const JobApplicationResponse = () => {
    return (
        <React.Fragment>
            <MetaTags>
            <title>Job Applicantion Response | CareerHub</title>
            </MetaTags>
            <Section/>
            <section className="section">
            <Container>
            <Row>
            <RightSideContent/>            
            </Row>
            </Container>
            </section>
        </React.Fragment>
    )
}

export default JobApplicationResponse