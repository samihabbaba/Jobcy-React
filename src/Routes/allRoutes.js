import React from "react";
/** Add Route Component */
//Home Section
const Layout1 = React.lazy(() => import("../pages/Home/Layout1/Layout1"));

//Company Section
const AboutUs = React.lazy(() => import("../pages/Company/AboutUs/AboutUs"));
const Team = React.lazy(() => import("../pages/Company/Team/Team"));
const Pricing = React.lazy(() => import("../pages/Company/Pricing/Pricing"));
const PrivacyAndPolicy = React.lazy(() =>
  import("../pages/Company/PrivacyAndPolicy/PrivacyAndPolicy")
);
const Faqs = React.lazy(() => import("../pages/Company/Faqs/Faqs"));

//Jobs Section
const JobList = React.lazy(() => import("../pages/Jobs/JobList/JobList"));
const JobDetails = React.lazy(() =>
  import("../pages/Jobs/JobDetails/JobDetails")
);
const JobsCategories = React.lazy(() =>
  import("../pages/Jobs/JobsCategories/JobsCategories")
);

//Candidate and Company Section
const CompanyDetails = React.lazy(() =>
  import("../pages/CandidateAndCompany/CompanyDetails/CompanyDetails")
);

const JobApplicants = React.lazy(() =>
  import("../pages/CandidateAndCompany/JobApplicants/JobApplicants")
); 

const JobApplicantionResponse = React.lazy(() =>
  import("../pages/CandidateAndCompany/JobApplicationResponse/JobApplicationResponse")
); 

const JobSeekerDetails = React.lazy(() =>
  import("../pages/CandidateAndCompany/JobSeekerDetails/JobSeekerDetails")
);

//const Contacts
const Contact = React.lazy(() => import("../pages/Contact/Contact"));

//const AuthPages
const SignIn = React.lazy(() => import("../pages/ExtraPages/SignIn"));
const SignUp = React.lazy(() => import("../pages/ExtraPages/SignUp"));
const SignOut = React.lazy(() => import("../pages/ExtraPages/SignOut"));
const Error404 = React.lazy(() => import("../pages/ExtraPages/Error404"));


//profile section(User Profile)
const BookMarkJobPost = React.lazy(() =>
  import("../pages/Profile/BookMarkJobPost/BookMarkJobPost")
);
const ManageJobs = React.lazy(() =>
  import("../pages/Profile/ManageJobs/ManageJobs")
);
const BookMarkJobs = React.lazy(() =>
  import("../pages/Profile/BookMarkJobs/BookMarkJobs")
);
const BookMarkJobPostEdit = React.lazy(() =>
  import ("../pages/Profile/BookMarkJobPost/BookMarkJobPostEdit")
  );
const MyProfile = React.lazy(() =>
  import("../pages/Profile/MyProfile/MyProfile")
);

const userRoutes = [
  //profile Section(User Profile)
  { path: "/bookmarkjobpost", component: BookMarkJobPost },
  {path : "/bookmarkjobpostedit", component : BookMarkJobPostEdit},
  { path: "/myprofile", component: MyProfile },
  { path: "/bookmarkjobs", component: BookMarkJobs },
  { path: "/managejobs", component: ManageJobs },

  

  //Contact
  { path: "/contact", component: Contact },

  //Candidate and Company Section
  { path: "/companydetails", component: CompanyDetails },
  { path: "/jobseekerdetails", component: JobSeekerDetails },
  { path: "/jobapplicants", component: JobApplicants },
  { path: "/jobapplicationresponse", component: JobApplicantionResponse },

  //Jobs Section
  { path: "/jobscategories", component: JobsCategories },
  { path: "/jobdetails", component: JobDetails },
  { path: "/joblist", component: JobList },

  //Company Section
  { path: "/faqs", component: Faqs },
  { path: "/privacyandpolicy", component: PrivacyAndPolicy },
  { path: "/pricing", component: Pricing },
  { path: "/team", component: Team },
  { path: "/aboutus", component: AboutUs },

  //Home Section
  { path: "/", component: Layout1 },
];

const authRoutes = [
  { path: "/error404", component: Error404 },
  { path: "/signout", component: SignOut },
  { path: "/signup", component: SignUp },
  { path: "/signin", component: SignIn },
];
export { userRoutes, authRoutes };
