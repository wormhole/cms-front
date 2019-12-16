const initState = {
    username: '',
    password: '',
    rememberMe: false,
    vcode: '',
    vcodeApi: '/api/vcode'
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