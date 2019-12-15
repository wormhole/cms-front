import {combineReducers} from "redux";

const initState = {
    'username': '',
    'password': '',
    'remeber-me': false,
    'vcode': '',
};

const save = (state = initState, action) => {

    if (action === null || action === undefined) {
        return {
            ...state,
            ...action,
        }
    } else {
        return state;
    }
};

const loginReducer = combineReducers({
    login: save
});

export default loginReducer;