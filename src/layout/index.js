import {withRouter} from 'react-router-dom';
import MainLayout from './MainLayout';
import action from "./action";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        layout: state.layout
    }
};

const mapActionToProps = (dispatch) => {
    return {
        save: (state) => dispatch(action(state))
    }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(MainLayout));
