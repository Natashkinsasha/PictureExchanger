

export default class RedisService {
    constructor({redisDao}){
        this.redisDao = redisDao;
    }

    clear = () => {
        return this.redisDao.clear();
    };

    remove = ({key}) => {
        return this.redisDao.remove({key});
    };
}