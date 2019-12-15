import {connect} from 'react-redux';
import Register from './Register';
import action from '../action';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        register: state.register
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Register));