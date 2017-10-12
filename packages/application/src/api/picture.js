import axios from 'axios'


export default {
    getPopularTags: ({count = 8}) => {
        return axios.get('/api/picture/tags/popular', {
            query: {
                count,
            }
        });
    },
    getPictures: ({}) => {
        return axios.get('/api/picture');
    },
}