import React, { Suspense } from "react";
import NavBar from "../CommonLayout/NavBar";
import Footer from "../CommonLayout/Footer";
import StyleSwitcher from "../CommonLayout/StyleSwitcher";
import ScrolltoTop from "../../components/ScrolltoTop";

const Layout = (props) => {
    return (
        <React.Fragment>
            <Suspense>
                <div>
                    <NavBar />
                    <div className="main-content">
                        <div className="page-content">{props.children}</div>
                    </div>
                    <ScrolltoTop />
                    <Footer />
                    <StyleSwitcher />
                </div>
            </Suspense>
        </React.Fragment>
    );
};

export default Layout;