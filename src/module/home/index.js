import {connect} from 'react-redux';
import Home from './Home.jsx';
import collapseAction from './action';

const mapStateToProps = (state) => {
    return {
        home: state.home
    }
}

const mapActionToProps = (dispatch) => {
    return {
        onCollapse: (collapsed) => dispatch(collapseAction(collapsed))
    }
}

export default connect(mapStateToProps, mapActionToProps)(Home);