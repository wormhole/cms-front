const initState = {
    selectedRowKeys: [],
    keyValue: null,
    params: {
        key: null,
        sort: null,
        order: null,
        roleIds: []
    },
    pagination: {current: 1, pageSize: 10},
    dataSource: [],
    filters: [],
    loading: false,
    transferModalShow: false,
    transferData: [],
    transferTargetKeys: [],
    userId: null,
    user: {
        id: null,
        username: null,
        email: null,
        telephone: null,
        limit: 1,
        ttl: 30,
        lock: 30,
        failure: 5,
        password: null,
        checkPassword: null
    }
};

const userReducer = (state = initState, action) => {

    if (action.type === "user") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default userReducer;