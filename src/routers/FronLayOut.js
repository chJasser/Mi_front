
import Footer from "components/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import MediaRunningContainer from "containers/MediaRunningContainer/MediaRunningContainer";
import MediaRunningContainerForSafari from "containers/MediaRunningContainer/MediaRunningContainerForSafari";
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import isSafariBrowser from "utils/isSafariBrowser";
// reactstrap components

// core components
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
// import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "./routes.js";
import ScrollToTop from "./ScrollToTop";

const FrontLayout = (props) => {


    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/front") {
                return (
                    <Route
                        path={prop.path}
                        component={prop.component}
                        exact={!!prop.exact}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    return (
        <>
            <ScrollToTop />
            <HeaderContainer />
            <Switch>
                {getRoutes(routes)}
                {/* <Redirect from="*" to="/" /> */}
                <Route component={Page404} />
            </Switch>
            <Footer />
            {isSafariBrowser() ? (
                <MediaRunningContainerForSafari />
            ) : (
                <MediaRunningContainer />
            )}

        </>
    );
};

export default FrontLayout;
