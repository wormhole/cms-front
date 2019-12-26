import User, {AddPage} from "./user";
import React from "react";
import {Route} from "react-router-dom";

const AuthRouter = () => (
    <div>
        <Route exact path="/auth/user" component={User}/>
        <Route exact path="/auth/user/add" component={AddPage}/>
    </div>
);

export default AuthRouter;