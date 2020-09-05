import {connect} from "react-redux";
import Image from "./Image";
import action from "../../../util/action";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        image: state.image
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "image"))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Image));