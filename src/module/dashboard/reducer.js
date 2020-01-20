const initState = {
    count: []
};

const dashboardReducer = (state = initState, action) => {

    if (action.type === 'dashboard') {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default dashboardReducer;
