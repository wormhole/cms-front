const initState = {
    id: null,
    username: null,
    email: null,
    telephone: null,
    limit: 1,
    ttl: 1,
    lock: 1,
    failure: 3
};

const personalReducer = (state = initState, action) => {

    if (action.type === "personal") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default personalReducer;