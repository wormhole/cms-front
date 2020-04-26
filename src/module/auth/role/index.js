import {connect} from "react-redux";
import Role from "./Role";
import Add from "./Add";
import action from "../../../util/action";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        role: state.role
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "role"))
    }
};

export const RoleAdd = withRouter(connect(mapStateToProps, mapActionToProps)(Add));
export default withRouter(connect(mapStateToProps, mapActionToProps)(Role));