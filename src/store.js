import {combineReducers, createStore} from 'redux';
import loginReducer from "./page/login/reducer";
import registerReducer from "./page/register/reducer";
import homeReducer from "./page/home/reducer";
import userReducer from "./module/auth/user/reducer";
import roleReducer from "./module/auth/role/reducer";
import permissionReducer from "./module/auth/permission/reducer";
import personalReducer from "./module/personal/reducer";
import configReducer from "./module/config/reducer";
import dashboardReducer from "./module/dashboard/reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    home: homeReducer,
    user: userReducer,
    role: roleReducer,
    permission: permissionReducer,
    personal: personalReducer,
    config: configReducer,
    dashboard: dashboardReducer,
});

const store = createStore(rootReducer);
export default store;
