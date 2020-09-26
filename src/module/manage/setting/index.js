import {connect} from "react-redux";
import Setting from "./Setting";
import action from "../../../util/action";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        setting: state.setting
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "setting"))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Setting));