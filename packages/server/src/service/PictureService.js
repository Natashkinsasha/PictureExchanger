import NewPictureDTO from '../dto/NewPictureDTO';

export default class PictureService {

    constructor({pictureDao, pictureStorageService}) {
        this.pictureDao = pictureDao;
        this.pictureStorageService = pictureStorageService;
    }

    save = ({pictureData, name, tags, description, isPrivate = true, owner}) => {
        return this.pictureStorageService.save({pictureData})
            .then((url) => {
                return this.pictureDao
                    .create(new NewPictureDTO({name, tags, description, isPrivate, url, owner}))
            })

    };

    find = ({name, onlyMy = false, tags, sortBy = 'uploadDate', page = 1, count = 10, owner}) => {
        return this.pictureDao.find({name, onlyMy, tags, sortBy, page, count, owner});

    };

    remove = ({id}) => {
        return this.pictureDao
            .remove({id})
            .then((url) => {
                return this.pictureStorageService.remove({url})
            })
    };

    getPopularTags = ({count}) => {
        return this.pictureDao.getPopularTags({count});
    };

}