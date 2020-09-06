import getUrl from "../../util/url";

const initState = {
    username: "",
    telephone: "",
    email: "",
    password: "",
    checkPassword: "",
    captcha: "",
    captchaApi: getUrl("/captcha")
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