const initState = {
    username: "",
    password: "",
    rememberMe: false,
    code: "",
    codeApi: process.env.NODE_ENV === "production" ? "/code" : "/api/code"
};

const loginReducer = (state = initState, action) => {

    if (action.type === "login") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default loginReducer;