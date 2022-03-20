import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "components/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import PageArchive from "containers/PageArchive/PageArchive";
import PageAuthor from "containers/PageAuthor/PageAuthor";
import PageSearch from "containers/PageSearch/PageSearch";
import PageSingle from "containers/PageSingle/PageSingle";
import PageSingleHasSidebar from "containers/PageSingle/PageSingleHasSidebar";
import PageSingleTemplate2 from "containers/PageSingle/PageSingleTemp2";
import PageSingleTemp2Sidebar from "containers/PageSingle/PageSingleTemp2Sidebar";
import PageSingleTemplate3 from "containers/PageSingle/PageSingleTemp3";
import PageSingleTemp3Sidebar from "containers/PageSingle/PageSingleTemp3Sidebar";
import PageAbout from "containers/PageAbout/PageAbout";
import PageContact from "containers/PageContact/PageContact";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageForgotPass from "containers/PageForgotPass/PageForgotPass";
import PageDashboard from "containers/PageDashboard/PageDashboard";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import PageHome from "containers/PageHome/PageHome";
// import PageHomeDemo2 from "containers/PageHome/PageHomeDemo2";
// import PageHomeDemo3 from "containers/PageHome/PageHomeDemo3";
// import PageAuthorV2 from "containers/PageAuthor/PageAuthorV2";
// import PageHomeDemo4 from "containers/PageHome/PageHomeDemo4";
import PageSearchV2 from "containers/PageSearch/PageSearchV2";
import MediaRunningContainer from "containers/MediaRunningContainer/MediaRunningContainer";
import PageSingleGallery from "containers/PageSingleGallery/PageSingleGallery";
import PageSingleProduct from "containers/PageSingleGallery/PageSingleProduct";
import PageSingleAudio from "containers/PageSingleAudio/PageSingleAudio";
import PageSingleVideo from "containers/PageSingleVideo/PageSingleVideo";
import PageArchiveVideo from "containers/PageArchive/PageArchiveVideo";
import PageArchiveAudio from "containers/PageArchive/PageArchiveAudio";
// import PageHomeDemo5 from "containers/PageHome/PageHomeDemo5";
// import PageHomeDemo6 from "containers/PageHome/PageHomeDemo6";
import MediaRunningContainerForSafari from "containers/MediaRunningContainer/MediaRunningContainerForSafari";
import isSafariBrowser from "utils/isSafariBrowser";
import PageHomeDemo7 from "containers/PageHome/PageHomeDemo7";

import RestPasswordComponent from "../containers/PageForgotPass/ResetPasswordComponent.js";
import PagePassword from "containers/PageSignUp/PagePassword";
import AuthRoute from "../routers/AuthRoute";
import PageSeller from "../components/SectionBecomeAnSeller/BecomeAnSeller";
import PageBecomeStudent from "../components/SectionBecomeAnStudent/PageBecomeStudent";
import PageTeacher from "../components/SectionBecomeAnTeacher/BecomeAnTeacher.js";
import BecomeSellerRoute from "../routers/BecomeSellerRoute";
import BecomeStudentRoute from "../routers/BecomeStudentRoute";
import BecomeTeacherRoute from "../routers/BecomeTeacherRoute";
import CustomProductsPage from "containers/customProduct/CustomProductsPage";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/#", exact: true, component: PageHome },
  { path: "/archive/:slug", component: PageArchive },
  { path: "/archive-video/:slug", component: PageArchiveVideo },
  { path: "/archive-audio/:slug", component: PageArchiveAudio },
  //
  { path: "/author/:slug", component: PageAuthor },
  // { path: "/author-v2/:slug", component: PageAuthorV2 },
  //
  { path: "/single/:slug", component: PageSingleTemp3Sidebar },
  {
    path: "/single-sidebar/:slug",
    component: PageSingleTemplate3,
  },
  {
    path: "/single-template-2/:slug",
    component: PageSingleTemplate2,
  },
  {
    path: "/single-2-sidebar/:slug",
    component: PageSingleTemp2Sidebar,
  },
  {
    path: "/single-template-3/:slug",
    component: PageSingle,
  },
  {
    path: "/single-3-sidebar/:slug",
    component: PageSingleHasSidebar,
  },
  // {
  //   path: "/single-gallery/",
  //   component: PageSingleGallery,
  // },
  {
    path: "/single-gallery/:slug",
    component: PageSingleProduct,
  },
  {
    path: "/single-audio/:slug",
    component: PageSingleAudio,
  },
  {
    path: "/single-video/:slug",
    component: PageSingleVideo,
  },

  { path: "/search", component: PageSearch },
  { path: "/search-v2", component: PageSearchV2 },
  { path: "/about", component: PageAbout },
  { path: "/contact", component: PageContact },
  // { path: "/custom", component: CustomProductsPage },

  { path: "/page404", component: Page404 },
  { path: "/login", typeRoute: "auth", component: PageLogin },
  { path: "/signup", typeRoute: "auth", component: PageSignUp },
  {
    path: "/forgot-pass",
    exact: true,
    typeRoute: "auth",
    component: PageForgotPass,
  },
  { path: "/dashboard", component: PageDashboard },
  { path: "/subscription", component: PageSubcription },

  { path: "/forgot-pass/:email", component: RestPasswordComponent },
  { path: "/passport/register", component: PagePassword },

  { path: "/home-demo-7", component: PageHomeDemo7 },
  {
    path: "/forgot-pass/:email",

    typeRoute: "auth",
    component: RestPasswordComponent,
  },
  {
    path: "/passport/register",
    typeRoute: "auth",
    exact: true,
    component: PagePassword,
  },
  {
    path: "/become-teacher",
    exact: true,
    typeRoute: "teacher",
    component: PageTeacher,
  },
  {
    path: "/become-seller",
    exact: true,
    typeRoute: "seller",
    component: PageSeller,
  },

  {
    path: "/become-student",
    exact: true,
    typeRoute: "student",
    component: PageBecomeStudent,
  },

  //
];

const Routes = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_LRT_OR_RTL}>
      <ScrollToTop />
      <HeaderContainer />
      <Switch>
        {pages.map(({ component, path, exact, typeRoute }) => {
          if (typeRoute === "auth") {
            return (
              <AuthRoute
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          } else if (typeRoute === "seller") {
            return (
              <BecomeSellerRoute
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          } else if (typeRoute === "student") {
            return (
              <BecomeStudentRoute
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          } else if (typeRoute === "teacher") {
            return (
              <BecomeTeacherRoute
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          } else {
            return (
              <Route
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          }
        })}
        <Route component={Page404} />
      </Switch>
      <Footer />
      {/* MEDIA */}

      {/* //is Safari on an apple touch-screen device */}
      {isSafariBrowser() ? (
        <MediaRunningContainerForSafari />
      ) : (
        <MediaRunningContainer />
      )}
    </BrowserRouter>
  );
};

export default Routes;
