import {connect} from 'react-redux';
import Login from './Login.jsx';
import action from './action';

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state))
    }
};

export default connect(mapStateToProps, mapActionToProps)(Login);