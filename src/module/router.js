import User, {UserAdd} from "./auth/user";
import Role, {RoleAdd} from "./auth/role";
import Permission, {PermissionAdd} from "./auth/permission";
import Website from "./config/website";
import Dashboard from "./dashboard";
import Personal from "./personal";
import Image from "./file/image";
import Page403 from "./error/403";
import Page500 from "./error/500";

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
    "/error/403": Page403,
    "/error/500": Page500
};

export default router;