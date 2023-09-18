import React from 'react';
import Section from '../../Company/Pricing/Section';
import PricingPage from '../../Company/Pricing/PricingPage';
import Cta from '../../Company/Pricing/Cta';
import MetaTags from "react-meta-tags";
import { getUserData } from "../../../helpers/helper";

const user = getUserData();

if(user?.role != "company"){
    window.location.href = "/error404"
}

const Pricing = () => {
    return (
        <React.Fragment>
            <MetaTags>
            <title>Pricing | CareerHub</title>
            </MetaTags>
            <Section/>
            <PricingPage/>
            <Cta/>
        </React.Fragment>
    )
}

export default Pricing