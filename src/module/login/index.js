import {connect} from 'react-redux';
import Login from './Login.jsx';

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (action) => dispatch(action)
    }
};

export default connect(mapStateToProps, mapActionToProps)(Login);