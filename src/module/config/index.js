import {connect} from "react-redux";
import Config from "./Config";
import action from "../../util/action";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        config: state.config
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "config"))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Config));