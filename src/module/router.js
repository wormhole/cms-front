import authRouter from "./auth/authRouter";
import dashboardRouter from "./dashboard/dashboardRouter";
import PersonalRouter from "./personal/personalRouter";
import configRouter from "./config/configRouter";

const router = {
    ...authRouter,
    ...configRouter,
    ...dashboardRouter,
    ...PersonalRouter
};

export default router;