import React from "react";
import AuthRouter from "./auth/AuthRouter";
import PersonalRouter from "./personal/PersonalRouter";
import ConfigRouter from "./config/ConfigRouter";

const Router = () => {
    return (
        <div>
            <AuthRouter/>
            <PersonalRouter/>
            <ConfigRouter/>
        </div>
    )
};

export default Router;