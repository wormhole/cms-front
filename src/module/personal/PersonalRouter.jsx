import React from "react";
import {Route} from "react-router-dom";
import Personal from "../personal";

const PersonalRouter = () => (
    <div>
        <Route exact path="/personal" component={Personal}/>
    </div>
);

export default PersonalRouter;