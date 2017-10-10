import UserDTO from '../dto/UserDTO';


//TODO Добавить индексы
//TODO Добавить валидацию
export default class UserDAO {

    constructor({db}) {
        this.db = db;
    }

    findOrCreateViaFacebook = ({facebook}) => {
        return db.collection('users')
            .findOneAndUpdate(
                {'facebook.id': user.facebook.id},
                {
                    update: {
                        $set: {facebook}
                    },
                    new: true,
                    upsert: true,
                }
            )
            .then((user) => {
                return user && new UserDTO(user);
            });
    };

    create = (user) => {
        return this.db.collection('users')
            .insertOne(user)
            .then(() => {
                return new UserDTO(user);
            })
    };

    findByEmail = ({email}) => {
        return this.db.collection('users', {promoteBuffers: true})
            .findOne({email})
            .then((user) => {
                return user && new UserDTO(user);
            });
    };

    findByNickname = ({nickname}) => {
        return this.db.collection('users', {promoteBuffers: true})
            .findOne({nickname})
            .then((user) => {
                return user && new UserDTO(user);
            });
    };
}