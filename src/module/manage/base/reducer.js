const initState = {
    title: null,
    copyright: null,
    head: null,
    file: []
};

const baseReducer = (state = initState, action) => {

    if (action.type === "base") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default baseReducer;