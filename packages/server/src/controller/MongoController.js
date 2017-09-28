
export default class MongoController{

    constructor({mongoService}){
        this.mongoService = mongoService;
    }

    clear = (req, res, next) => {
        return this.mongoService.clear()
            .then(() => res.status(200).end())
            .catch(next)
    };

    remove = (req, res, next) => {
        const { id } = req.query;
        return this.mongoService
            .remove({id, collection})
            .then(() => res.status(200).end())
            .catch(next);
    };
}