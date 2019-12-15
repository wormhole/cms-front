const initState = {
    username: '',
    password: '',
    rememberMe: false,
    vcode: '',
    vcodeApi: '/api/vcode'
};

const loginReducer = (state = initState, action) => {

    if (action.type === 'save') {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default loginReducer;