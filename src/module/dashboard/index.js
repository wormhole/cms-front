import {connect} from "react-redux";
import Dashboard from "./DashBoard";
import action from "../../util/action";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "dashboard"))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Dashboard));