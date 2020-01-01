import {combineReducers, createStore} from 'redux';
import loginReducer from "./login/reducer";
import registerReducer from "./register/reducer";
import layoutReducer from "./layout/reducer";
import userReducer from "./module/auth/user/reducer";
import roleReducer from "./module/auth/role/reducer";
import permissionReducer from "./module/auth/permission/reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    layout: layoutReducer,
    user: userReducer,
    role: roleReducer,
    permission: permissionReducer
});

const store = createStore(rootReducer);
export default store;