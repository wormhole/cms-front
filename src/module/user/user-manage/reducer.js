const initState = {
    selectedRowKeys: [],
    dataSource: [{
        key: 'id',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }]
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