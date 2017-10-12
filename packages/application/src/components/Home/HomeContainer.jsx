import React from 'react';
import Promise from 'bluebird';
import {connect} from 'react-redux';

import Home from './Home.jsx';
import {getPictures, getPopularTags} from "../../actions/pictures";

class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getPopularTags();
    }

    render = () => {
        return (
            <Home {...this.props}/>
        );
    }
}

export default connect(
    undefined,
    (dispatch) => ({
        getPictures: ({})=>{
            return dispatch(getPictures({}));
        },
        getPopularTags: ()=>{
            return dispatch(getPopularTags());
        }
    })
)
(HomeContainer);