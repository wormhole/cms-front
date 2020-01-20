import React from "react";
import {Route} from "react-router-dom";
import Config from "./index";

const ConfigRouter = () => (
    <div>
        <Route exact path="/config" component={Config}/>
    </div>
);

export default ConfigRouter;