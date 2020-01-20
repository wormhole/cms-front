import React from "react";
import AuthRouter from "./auth/AuthRouter";
import PersonalRouter from "./personal/PersonalRouter";
import ConfigRouter from "./config/ConfigRouter";
import DashboardRouter from "./dashboard/DashboardRouter";

const Router = () => {
    return (
        <div>
            <AuthRouter/>
            <PersonalRouter/>
            <ConfigRouter/>
            <DashboardRouter/>
        </div>
    )
};

export default Router;