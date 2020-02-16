const initState = {
    selectedRowKeys: [],
    keyValue: null,
    params: {
        key: null,
        sort: null,
        order: null,
        permissionIds: []
    },
    pagination: {current: 1, pageSize: 10},
    dataSource: [],
    filters: [],
    loading: false,
    transferModalShow: false,
    transferData: [],
    transferTargetKeys: [],
    roleId: null,
    edit: {
        id: null,
        name: null,
        description: null
    }
};

const roleReducer = (state = initState, action) => {

    if (action.type === 'role') {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default roleReducer;
