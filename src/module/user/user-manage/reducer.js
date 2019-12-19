const initState = {
    selectedRowKeys: [],
    pagination: {current: 1, pageSize: 5},
    dataSource: [{
        key: '1',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }, {
        key: '2',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }, {
        key: '3',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }, {
        key: '4',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }, {
        key: '5',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }, {
        key: '6',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }, {
        key: '7',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }, {
        key: '8',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }, {
        key: '9',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }, {
        key: '10',
        username: 'admin',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '可用'
    }, {
        key: '11',
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