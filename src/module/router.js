import User, {UserAdd} from "./auth/user";
import Role, {RoleAdd} from "./auth/role";
import Permission, {PermissionAdd} from "./auth/permission";
import Website from "./config/website";
import Dashboard from "./dashboard";
import Personal from "./personal";
import Image from "./file/image";
import NoPermission from "./error/403";

const router = {
    "/auth/user": User,
    "/auth/user/add": UserAdd,
    "/auth/role": Role,
    "/auth/role/add": RoleAdd,
    "/auth/permission": Permission,
    "/auth/permission/add": PermissionAdd,
    "/config/website": Website,
    "/dashboard": Dashboard,
    "/personal": Personal,
    "/file/image": Image,
    "/error/403": NoPermission
};

export default router;