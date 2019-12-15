import {combineReducers, createStore} from 'redux';
import loginReducer from "./login/reducer";

const rootReducer = combineReducers({
    login: loginReducer
});

const store = createStore(rootReducer);
export default store;