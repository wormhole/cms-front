import {combineReducers, createStore} from 'redux';
import loginReducer from "./login/reducer";
import registerReducer from "./register/reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer
});

const store = createStore(rootReducer);
export default store;