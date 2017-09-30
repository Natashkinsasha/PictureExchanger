
export default class MongoController{

    constructor({mongoService}){
        this.mongoService = mongoService;
    }

    clear = (req, res, next) => {
        const { collection } = req.query;
        return this.mongoService.clear({collection})
            .then(() => res.status(200).end())
            .catch(next)
    };

    remove = (req, res, next) => {
        const { id, collection } = req.query;
        return this.mongoService
            .remove({id, collection})
            .then(() => res.status(200).end())
            .catch(next);
    };
}