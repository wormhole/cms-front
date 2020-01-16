import {withRouter} from 'react-router-dom';
import Home from './Home';
import action from "../../util/action";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        home: state.home
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "home"))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Home));
