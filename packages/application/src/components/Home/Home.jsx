import React from 'react';
import {connect} from 'react-redux';

import PictureGallery from './PictureGallery.jsx';


const Home = (props) => {
    return (
        <PictureGallery {...props}/>
    );
};

export default connect()(Home);