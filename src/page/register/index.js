import {connect} from 'react-redux';
import Register from './Register';
import action from '../../util/action';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        register: state.register
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state, "register"))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Register));