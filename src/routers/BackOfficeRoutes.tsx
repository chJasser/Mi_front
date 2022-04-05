import Sidebar from "components/Sidebar/Sidebar.js";
import { Redirect, Route, Switch } from "react-router-dom";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Tablesproducts from "views/admin/Tablesproducts.js";
import Dashboard from "views/admin/Dashboard";
import Footer from "components/Footer/Footer";

export default function BackOfficeRoutes() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 ">
        {/* Header */}

        <div className="px-4 md:px-10 mx-auto w-full ">
          <Switch>
            <Route path="/back-office/dashboard" exact component={Dashboard} />
            <Route path="/back-office/settings" exact component={Settings} />
            <Route path="/back-office/tables" exact component={Tables} />
            <Route
              path="/back-office/productstable"
              exact
              component={Tablesproducts}
            />
            <Redirect from="/back-office" to="/back-office/dashboard" />
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
}
