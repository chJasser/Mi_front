import PageSeller from "components/SectionBecomeAnSeller/BecomeAnSeller";
import PageBecomeStudent from "components/SectionBecomeAnStudent/PageBecomeStudent";
import PageTeacher from "components/SectionBecomeAnTeacher/BecomeAnTeacher";
import Page404 from "containers/Page404/Page404";
import PageAbout from "containers/PageAbout/PageAbout";
import PageArchive from "containers/PageArchive/PageArchive";
import PageArchiveAudio from "containers/PageArchive/PageArchiveAudio";
import PageArchiveVideo from "containers/PageArchive/PageArchiveVideo";
import PageAuthor from "containers/PageAuthor/PageAuthor";
import PageContact from "containers/PageContact/PageContact";
import PageDashboard from "containers/PageDashboard/PageDashboard";
import PageForgotPass from "containers/PageForgotPass/PageForgotPass";
import RestPasswordComponent from "containers/PageForgotPass/ResetPasswordComponent";
import PageHome from "containers/PageHome/PageHome";
import PageHomeDemo7 from "containers/PageHome/PageHomeDemo7";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSearch from "containers/PageSearch/PageSearch";
import PageSearchV2 from "containers/PageSearch/PageSearchV2";
import PagePassword from "containers/PageSignUp/PagePassword";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageSingle from "containers/PageSingle/PageSingle";
import PageSingleHasSidebar from "containers/PageSingle/PageSingleHasSidebar";
import PageSingleTemplate2 from "containers/PageSingle/PageSingleTemp2";
import PageSingleTemp2Sidebar from "containers/PageSingle/PageSingleTemp2Sidebar";
import PageSingleTemplate3 from "containers/PageSingle/PageSingleTemp3";
import PageSingleTemp3Sidebar from "containers/PageSingle/PageSingleTemp3Sidebar";
import PageSingleAudio from "containers/PageSingleAudio/PageSingleAudio";
import PageSingleGallery from "containers/PageSingleGallery/PageSingleGallery";
import PageSingleVideo from "containers/PageSingleVideo/PageSingleVideo";
import PageSubcription from "containers/PageSubcription/PageSubcription";


var routes = [

    { path: "/", exact: true, layout: "/front", component: PageHome },
    { path: "/#", exact: true, layout: "/front", component: PageHome },
    { path: "/archive/:slug", layout: "/front", component: PageArchive },
    { path: "/archive-video/:slug", layout: "/front", component: PageArchiveVideo },
    { path: "/archive-audio/:slug", layout: "/front", component: PageArchiveAudio },
    { path: "/author/:slug", layout: "/front", component: PageAuthor },
    // { path: "/author-v2/:slug", component: PageAuthorV2 },
    //
    { path: "/single/:slug", layout: "/front", component: PageSingleTemp3Sidebar },
    {
        path: "/single-sidebar/:slug",
        component: PageSingleTemplate3,
        layout: "/front"
    },
    {
        path: "/single-template-2/:slug",
        component: PageSingleTemplate2,
        layout: "/front"
    },
    {
        path: "/single-2-sidebar/:slug",
        component: PageSingleTemp2Sidebar,
        layout: "/front"
    },
    {
        path: "/single-template-3/:slug",
        component: PageSingle,
        layout: "/front"
    },
    {
        path: "/single-3-sidebar/:slug",
        component: PageSingleHasSidebar,
        layout: "/front"
    },
    {
        path: "/single-gallery/:slug",
        component: PageSingleGallery,
        layout: "/front"
    },
    {
        path: "/single-audio/:slug",
        component: PageSingleAudio,
        layout: "/front"
    },
    {
        path: "/single-video/:slug",
        component: PageSingleVideo,
        layout: "/front"
    },


    {
        path: "/search", component: PageSearch, layout: "/front"
    },
    {
        path: "/search-v2", component: PageSearchV2, layout: "/front"
    },
    { path: "/about", exact: true, component: PageAbout,layout: "/front" },
    { path: "/contact", component: PageContact,layout: "/front" },
    { path: "/page404", component: Page404,layout: "/front" },
    { path: "/login", typeRoute: "auth", component: PageLogin,layout: "/front" },
    { path: "/signup", typeRoute: "auth", component: PageSignUp,layout: "/front" },
    {
        path: "/forgot-pass",
        exact: true,
        typeRoute: "auth",
        component: PageForgotPass,
        layout: "/front"
    },
    { path: "/dashboard", component: PageDashboard,layout: "/front" },
    { path: "/subscription", component: PageSubcription,layout: "/front" },
    //
    // { path: "/home-demo-2", component: PageHomeDemo2 },
    // { path: "/home-demo-3", component: PageHomeDemo3 },
    // { path: "/home-demo-4", component: PageHomeDemo4 },
    // { path: "/home-demo-5", component: PageHomeDemo5 },
    // { path: "/home-demo-6", component: PageHomeDemo6 },
    // { path: "/home-demo-7", component: PageHomeDemo7 },



    // { path: "/forgot-pass/:email", component: RestPasswordComponent,layout: "/front" },
    // { path: "/passport/register", component: PagePassword,layout: "/front" },

    { path: "/home-demo-7", component: PageHomeDemo7,layout: "/front" },
    {
        path: "/forgot-pass/:email",
        layout: "/front",
        typeRoute: "auth",
        component: RestPasswordComponent,
    },
    {
        path: "/passport/register",
        typeRoute: "auth",
        layout: "/front",
        exact: true,
        component: PagePassword,
    },
    {
        path: "/become-teacher",
        exact: true,
        typeRoute: "teacher",
        component: PageTeacher,
        layout: "/front"
    },
    {
        path: "/become-seller",
        exact: true,
        typeRoute: "seller",
        component: PageSeller,
        layout: "/front"
    },

    {
        path: "/become-student",
        exact: true,
        typeRoute: "student",
        component: PageBecomeStudent,
        layout: "/front"
    },
    // {
    //     path: "/index",
    //     name: "Dashboard",
    //     icon: "ni ni-tv-2 text-primary",
    //     component: Index,
    //     layout: "/admin",
    // },
    // {
    //     path: "/icons",
    //     name: "Icons",
    //     icon: "ni ni-planet text-blue",
    //     component: Icons,
    //     layout: "/admin",
    // },
    // {
    //     path: "/maps",
    //     name: "Maps",
    //     icon: "ni ni-pin-3 text-orange",
    //     component: Maps,
    //     layout: "/admin",
    // },
    // {
    //     path: "/user-profile",
    //     name: "User Profile",
    //     icon: "ni ni-single-02 text-yellow",
    //     component: Profile,
    //     layout: "/admin",
    // },
    // {
    //     path: "/tables",
    //     name: "Tables",
    //     icon: "ni ni-bullet-list-67 text-red",
    //     component: Tables,
    //     layout: "/admin",
    // },
    // {
    //     path: "/login",
    //     name: "Login",
    //     icon: "ni ni-key-25 text-info",
    //     component: Login,
    //     layout: "/auth",
    // },
    // {
    //     path: "/register",
    //     name: "Register",
    //     icon: "ni ni-circle-08 text-pink",
    //     component: Register,
    //     layout: "/auth",
    // },
];
export default routes;
