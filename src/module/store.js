import {combineReducers, createStore} from 'redux';
import loginReducer from "./login/reducer";
import registerReducer from "./register/reducer";
import homeReducer from "./home/reducer";
import userReducer from "./auth/user/reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    home: homeReducer,
    user: userReducer
});

const store = createStore(rootReducer);
export default store;