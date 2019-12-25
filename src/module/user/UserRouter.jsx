import UserManage, {Add} from "./user-manage";
import React from "react";
import {Route} from "react-router-dom";

const UserRouter = () => (
    <Route path="/user">
        <Route exact path="/user/user-manage" component={UserManage}/>
        <Route exact path="/user/user-manage/add" component={Add}/>
    </Route>
);

export default UserRouter;