import {combineReducers, createStore} from 'redux';
import userReducer from "./module/auth/user/reducer";
import roleReducer from "./module/auth/role/reducer";
import permissionReducer from "./module/auth/permission/reducer";
import personalReducer from "./module/personal/reducer";
import configReducer from "./module/config/reducer";
import dashboardReducer from "./module/dashboard/reducer";
import loginReducer from "./page/login/reducer";
import registerReducer from "./page/register/reducer";
import homeReducer from "./page/home/reducer";

const rootReducer = combineReducers({
    user: userReducer,
    role: roleReducer,
    permission: permissionReducer,
    personal: personalReducer,
    config: configReducer,
    dashboard: dashboardReducer,
    login: loginReducer,
    register: registerReducer,
    home: homeReducer,
});

const store = createStore(rootReducer);
export default store;
