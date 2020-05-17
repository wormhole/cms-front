const initState = {
    title: null,
    copyright: null,
    head: null,
    file: []
};

const websiteReducer = (state = initState, action) => {

    if (action.type === "website") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default websiteReducer;