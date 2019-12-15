import {combineReducers} from "redux";

const initState = {
    username: '',
    password: '',
    rememberMe: false,
    vcode: '',
    vcodeApi: '/api/vcode'
};

const reducer = (state = initState, action) => {

    if (action.type === 'save') {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

const loginReducer = combineReducers({
    login: reducer
});

export default loginReducer;