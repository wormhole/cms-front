import User, {UserAdd} from "./user";
import Role, {RoleAdd} from "./role";
import Permission, {PermissionAdd} from "./permission";
import React from "react";
import {Route} from "react-router-dom";

const AuthRouter = () => (
    <div>
        <Route exact path="/auth/user" component={User}/>
        <Route exact path="/auth/user/add" component={UserAdd}/>
        <Route exact path="/auth/role" component={Role}/>
        <Route exact path="/auth/role/add" component={RoleAdd}/>
        <Route exact path="/auth/permission" component={Permission}/>
        <Route exact path="/auth/permission/add" component={PermissionAdd}/>
    </div>
);

export default AuthRouter;