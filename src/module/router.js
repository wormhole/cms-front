import User, {UserAdd} from "./auth/user";
import Role, {RoleAdd} from "./auth/role";
import Base from "./manage/base";
import Dashboard from "./dashboard";
import Personal from "./personal";
import Image from "./manage/image";
import Page403 from "./error/403";
import Page500 from "./error/500";

const router = {
    "/auth/user": User,
    "/auth/user/add": UserAdd,
    "/auth/role": Role,
    "/auth/role/add": RoleAdd,
    "/manage/base": Base,
    "/manage/image": Image,
    "/dashboard": Dashboard,
    "/personal": Personal,
    "/error/403": Page403,
    "/error/500": Page500
};

export default router;