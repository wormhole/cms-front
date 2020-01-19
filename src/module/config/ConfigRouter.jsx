import React from "react";
import {Route} from "react-router-dom";
import Config from "../config";

const ConfigRouter = () => (
    <div>
        <Route exact path="/config" component={Config}/>
    </div>
);

export default ConfigRouter;