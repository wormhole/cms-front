import {connect} from "react-redux";
import Permission from "./Permission";
import Add from "./Add";
import action from "../../../util/action";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        permission: state.permission
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "permission"))
    }
};

export const PermissionAdd = withRouter(connect(mapStateToProps, mapActionToProps)(Add));
export default withRouter(connect(mapStateToProps, mapActionToProps)(Permission));