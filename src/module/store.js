import {combineReducers, createStore} from 'redux';
import loginReducer from "./login/reducer";
import registerReducer from "./register/reducer";
import homeReducer from "./home/reducer";
import userReducer from "./auth/user/reducer";
import roleReducer from "./auth/role/reducer";
import permissionReducer from "./auth/permission/reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    home: homeReducer,
    user: userReducer,
    role: roleReducer,
    permission: permissionReducer
});

const store = createStore(rootReducer);
export default store;