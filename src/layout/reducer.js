const initState = {
    collapsed: false,
    logoTextStyle: {
        display: 'inline'
    },
    user: {
        username: null,
        email: null,
        telephone: null,
        roles: [],
        permissions: []
    }
};

const layoutReducer = (state = initState, action) => {

    if (action.type === 'layout') {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default layoutReducer;