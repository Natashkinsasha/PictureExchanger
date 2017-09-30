import { Router } from 'express';

export default class PictureRouter extends Router{

    constructor({pictureController}){
        super();
        return this
            .post('/find', pictureController.find)
            .post('/save', pictureController.save)
            .get('/tags/popular', pictureController.getPopularTags)
    }

}