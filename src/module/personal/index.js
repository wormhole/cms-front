import {connect} from "react-redux";
import Personal from "./Personal";
import action from "../../util/action";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        personal: state.personal
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "personal"))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Personal));