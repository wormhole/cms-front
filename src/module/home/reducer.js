const initState = {
    collapsed: false,
    logoClassName: 'cms-logo',
    marginLeftStyle: {
        marginLeft: 200
    }
}

const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'collapse':
            return {
                ...state,
                collapsed: action.collapsed,
                logoClassName: action.collapsed ? 'cms-logo-collapsed' : 'cms-logo',
                marginLeftStyle: {
                    marginLeft: action.collapsed ? 80 : 200
                }
            }
        default:
            return state;
    }
}

export default homeReducer;