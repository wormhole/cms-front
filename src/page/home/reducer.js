const initState = {
    collapsed: false,
    logoTextStyle: {
        display: 'inline'
    },
    user: {
        username: null,
        roles: [],
        permissions: []
    },
    config: {
        title: null,
        copyright: null
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