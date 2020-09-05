import {connect} from "react-redux";
import Base from "./Base";
import action from "../../../util/action";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        base: state.base
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "base"))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Base));