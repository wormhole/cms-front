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
    loading: false,
    transferModalShow: false,
    transferData: [],
    transferTargetKeys: [],
    userId: null
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
