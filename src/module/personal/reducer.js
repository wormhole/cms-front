const initState = {
    id: null,
    username: null,
    email: null,
    telephone: null
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