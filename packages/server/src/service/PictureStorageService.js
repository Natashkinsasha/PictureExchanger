import Promise from 'bluebird';
import shortid from 'shortid';

export default class PictureStorageService{

    constructor(){

    }

    save = () => {
        return Promise.resolve(shortid.generate());
    };

}