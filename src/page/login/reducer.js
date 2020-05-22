import getUrl from "../../util/url";

const initState = {
    username: "",
    password: "",
    rememberMe: false,
    code: "",
    codeApi: getUrl("/api/code")
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