const initState = {
    collapsed: false
};

const homeReducer = (state = initState, action) => {

    if (action.type === 'save') {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default homeReducer;