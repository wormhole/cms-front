import getUrl from "../../util/url";

const initState = {
    username: "",
    password: "",
    captcha: "",
    captchaApi: getUrl("/captcha")
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