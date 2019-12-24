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
    editUser: {
        id: null,
        username: null,
        email: null,
        telephone: null,
        password: null,
        checkPassword: null
    }
};

const userManageReducer = (state = initState, action) => {

    if (action.type === 'user-manage') {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default userManageReducer;
