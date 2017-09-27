export default class RedisDao{

    constructor({redisClient}){
        this.redisClient = redisClient;
    }

    clear = () => {
        return this.redisClient.flushdb();
    };

    remove = ({key}) => {
        return this.redisClient.del(key);
    };

}