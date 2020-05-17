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
    show: false,
    url: null
};

const imageReducer = (state = initState, action) => {

    if (action.type === "image") {
        return {
            ...state,
            ...action.state,
        };
    } else {
        return state;
    }
};

export default imageReducer;