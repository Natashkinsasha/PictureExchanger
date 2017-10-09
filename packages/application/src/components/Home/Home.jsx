import React from 'react';
import {connect} from 'react-redux';

import PictureGallery from './PictureGallery.jsx';


const Home = () => {
    return (
        <PictureGallery/>
    );
};

export default connect()(Home);