const initState = {
    id: null,
    username: null,
    email: null,
    telephone: null,
    limit: 1,
    ttl: 30,
    lock: 30,
    failure: 5
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