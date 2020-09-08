const initState = {
    count: {
        file: 0,
        menu: 0,
        user: 0,
        role: 0
    },
    disk: {
        total: 0,
        free: 0,
        used: 0
    },
    mem: {
        total: 0,
        free: 0,
        used: 0
    },
    status: {
        online: 0,
        lock: 0,
        enable: 0,
        disable: 0,
        total: 0
    }
};

const dashboardReducer = (state = initState, action) => {

    if (action.type === "dashboard") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default dashboardReducer;