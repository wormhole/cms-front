import {connect} from 'react-redux';
import User from './User';
import Add from "./Add";
import action from './action';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state))
    }
};

export const UserAdd = withRouter(connect(mapStateToProps, mapActionToProps)(Add));
export default withRouter(connect(mapStateToProps, mapActionToProps)(User));