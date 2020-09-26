const initState = {
    title: null,
    copyright: null,
    head: null,
    file: []
};

const settingReducer = (state = initState, action) => {

    if (action.type === "setting") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default settingReducer;