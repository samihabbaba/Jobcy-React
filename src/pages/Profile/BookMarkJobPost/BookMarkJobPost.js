import React from 'react'
import JobPostEdit from './JobPostEdit';
import Section from './Section';
import { getUserData } from "../../../helpers/helper";

const user = getUserData();

if(user?.role !== "company"){
    console.log(user)
  window.location.href = "/error404"
}

const BookMarkJobPost = () => {
    return (
        <React.Fragment>
            <Section/>
            <JobPostEdit/>
        </React.Fragment>
    )
}

export default BookMarkJobPost;
