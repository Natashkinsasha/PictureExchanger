import NewPictureDTO from '../dto/NewPictureDTO';

export default class PictureService {

    constructor({pictureDAO, pictureStorageService}) {
        this.pictureDAO = pictureDAO;
        this.pictureStorageService = pictureStorageService;
    }

    save = ({pictureData, name, tags, description, isPrivate = true}) => {
        return this.pictureStorageService.save({pictureData})
            .then((url) => {
                return this.pictureDAO
                    .create(new NewPictureDTO({name, tags, description, isPrivate, url}))
            })

    };

    find = ({name, onlyMy = false, tags, sortBy = 'uploadDate', page = 1, count = 10}) => {
        if (name) {
            return this.pictureDAO.findByName({name, sortBy, page, count, onlyMy});
        } else if (tags) {
            return this.pictureDAO.findByTags({tags, sortBy, page, count, onlyMy});
        }
        return this.pictureDAO.find({sortBy, page, count, onlyMy});

    };

    remove = ({id}) => {
        return this.pictureDAO
            .remove({id})
            .then((url) => {
                return this.pictureStorageService.remove({url})
            })
    };

    getPopularTags = ({count}) => {
        return this.pictureDAO.getPopularTags({count});
    };

}