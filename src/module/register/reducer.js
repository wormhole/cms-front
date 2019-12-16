const initState = {
    username: '',
    telephone: '',
    email: '',
    password: '',
    checkPassword: '',
    vcode: '',
    vcodeApi: '/api/vcode'
};

const registerReducer = (state = initState, action) => {

    if (action.type === 'register') {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default registerReducer;