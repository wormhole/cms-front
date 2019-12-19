const initState = {
    selectedRowKeys: [],
    pagination: {current: 1, pageSize: 10},
    dataSource: [{
        key: '1',
        username: 'admin1',
        telephone: '18584848467',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '1'
    }, {
        key: '2',
        username: 'admin2',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '1'
    }, {
        key: '3',
        username: 'admin3',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '1'
    }, {
        key: '4',
        username: 'admin4',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '0'
    }, {
        key: '5',
        username: 'admin5',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '0'
    }, {
        key: '6',
        username: 'admin6',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '0'
    }, {
        key: '7',
        username: 'admin7',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '0'
    }, {
        key: '8',
        username: 'admin8',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '1'
    }, {
        key: '9',
        username: 'admin9',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '1'
    }, {
        key: '10',
        username: 'admin10',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '1'
    }, {
        key: '11',
        username: 'admin11',
        telephone: '18584848465',
        email: '363408268@qq.com',
        role: ['admin'],
        enabled: '1'
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
