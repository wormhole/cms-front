import {connect} from 'react-redux';
import UserManage from './UserManage';
import action from './action';
import {withRouter} from 'react-router-dom';
import UserAdd from "./UserAdd";

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

export const Add = withRouter(connect(mapStateToProps, mapActionToProps)(UserAdd));
export default withRouter(connect(mapStateToProps, mapActionToProps)(UserManage));