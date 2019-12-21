const initState = {
    selectedRowKeys: [],
    keyValue: null,
    key: null,
    sort: null,
    order: null,
    roles: [],
    pagination: {current: 1, pageSize: 10},
    dataSource: [],
    loading: false
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
