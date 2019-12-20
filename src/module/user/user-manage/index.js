import {connect} from 'react-redux';
import UserManage from './UserManage';
import action from './action';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        userManage: state.userManage
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(UserManage));