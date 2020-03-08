import authRouter from "./auth/authRouter";
import configRouter from "./config/configRouter";
import dashboardRouter from "./dashboard/dashboardRouter";
import PersonalRouter from "./personal/personalRouter";

const router = {
    ...authRouter,
    ...configRouter,
    ...dashboardRouter,
    ...PersonalRouter
};

export default router;