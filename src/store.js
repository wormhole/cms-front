import {combineReducers, createStore} from 'redux';
import userReducer from "./module/auth/user/reducer";
import roleReducer from "./module/auth/role/reducer";
import personalReducer from "./module/personal/reducer";
import baseReducer from "./module/manage/base/reducer";
import dashboardReducer from "./module/dashboard/reducer";
import loginReducer from "./page/login/reducer";
import registerReducer from "./page/register/reducer";
import homeReducer from "./page/home/reducer";
import imageReducer from "./module/manage/image/reducer";

const rootReducer = combineReducers({
    user: userReducer,
    role: roleReducer,
    personal: personalReducer,
    base: baseReducer,
    dashboard: dashboardReducer,
    login: loginReducer,
    register: registerReducer,
    home: homeReducer,
    image: imageReducer
});

const store = createStore(rootReducer);
export default store;
