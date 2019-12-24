const initState = {
    collapsed: false,
    logoTextStyle: {
        display: 'inline'
    }
};

const homeReducer = (state = initState, action) => {

    if (action.type === 'home') {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default homeReducer;