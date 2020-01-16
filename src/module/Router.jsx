import React from "react";
import AuthRouter from "./auth/AuthRouter";
import PersonalRouter from "./personal/PersonalRouter";

const Router = () => {
    return (
        <div>
            <AuthRouter/>
            <PersonalRouter/>
        </div>
    )
};

export default Router;