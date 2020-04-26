const initState = {
    original: {
        title: null,
        copyright: null
    },
    title: {
        id: null,
        key: null,
        value: null
    },
    copyright: {
        id: null,
        key: null,
        value: null
    },
    head: {
        file: [],
        url: null
    }
};

const configReducer = (state = initState, action) => {

    if (action.type === "config") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default configReducer;