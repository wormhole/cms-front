const initState = {
    username: '',
    telephone: '',
    email: '',
    password: '',
    checkPassword: '',
    vcode: '',
    vcodeApi: process.env.NODE_ENV === 'production' ? '/vcode' : '/api/vcode'
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