
export default class RedisController{

    constructor({redisService}){
        this.redisService = redisService;
    }

    clear = (req, res, next) => {
        return this.redisService
            .clear()
            .then(() => res.status(200).end())
            .catch(next)
    };

    remove = (req, res, next) => {
        const { key } = req.query;
        return this.redisService.remove({key})
            .then(() => res.status(200).end())
            .catch(next);
    };
}