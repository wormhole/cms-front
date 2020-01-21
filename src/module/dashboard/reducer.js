const initState = {
    count: [],
    cpu: {},
    mem: {},
    disk: {},
    net: {},
    cpuPlot: null,
    cpuData: null,
    memPlot: null,
    memData: null,
    diskPlot: null,
    diskData: null,
    refresh: null,
    onlineShow: false,
    online: []
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
