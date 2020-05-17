import {connect} from "react-redux";
import Website from "./Website";
import action from "../../../util/action";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        website: state.website
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "website"))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Website));