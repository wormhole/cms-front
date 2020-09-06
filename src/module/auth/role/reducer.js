const initState = {
    selectedRowKeys: [],
    keyValue: null,
    params: {
        key: null,
        sort: null,
        order: null
    },
    pagination: {current: 1, pageSize: 10},
    dataSource: [],
    loading: false,
    role: {
        id: null,
        name: null,
        note: null,
        menus: []
    },
    menus: [],

};

const roleReducer = (state = initState, action) => {

    if (action.type === "role") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default roleReducer;