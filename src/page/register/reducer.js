const initState = {
    username: "",
    telephone: "",
    email: "",
    password: "",
    checkPassword: "",
    code: "",
    role: "customer",
    codeApi: process.env.NODE_ENV === "production" ? "/code" : "/api/code"
};

const registerReducer = (state = initState, action) => {

    if (action.type === "register") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default registerReducer;