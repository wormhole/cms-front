const initState = {
    collapsed: false,
    logoTextStyle: {display: "inline"},
    username: null,
    menus: [],
    title: null,
    copyright: null,
    head: null,
    showModal: false,
    oldPassword: null,
    newPassword: null,
    checkPassword: null,
    loaded: false
};

const homeReducer = (state = initState, action) => {

    if (action.type === "home") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default homeReducer;