import React from "react";
import {Route} from "react-router-dom";
import Dashboard from "./index";

const DashboardRouter = () => (
    <div>
        <Route exact path="/dashboard" component={Dashboard}/>
    </div>
);

export default DashboardRouter;