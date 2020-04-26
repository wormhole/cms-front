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
    edit: {
        id: null,
        name: null,
        description: null
    }
};

const permissionReducer = (state = initState, action) => {

    if (action.type === "permission") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default permissionReducer;