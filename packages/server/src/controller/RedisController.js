
export default class RedisController{

    constructor({redisService}){
        this.redisService = redisService;
    }

    clear = () => {
        return this.redisService.clear();
    };

    remove = ({key}) => {
        return this.redisService.remove({key});
    };
}