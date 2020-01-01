const initState = {
    username: '',
    password: '',
    rememberMe: false,
    vcode: '',
    vcodeApi: process.env.NODE_ENV === 'production' ? '/vcode' : '/api/vcode'
};

const loginReducer = (state = initState, action) => {

    if (action.type === 'login') {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default loginReducer;