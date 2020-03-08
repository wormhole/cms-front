import User, {UserAdd} from "./user";
import Role, {RoleAdd} from "./role";
import Permission, {PermissionAdd} from "./permission";

const authRouter = {
    "/auth/user": User,
    "/auth/user/add": UserAdd,
    "/auth/role": Role,
    "/auth/role/add": RoleAdd,
    "/auth/permission": Permission,
    "/auth/permission/add": PermissionAdd
};

export default authRouter;