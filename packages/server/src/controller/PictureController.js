export default class PictureController {

    constructor({pictureService}) {
        this.pictureService = pictureService;
    }

    save = (req, res, next) => {
        const {file: pictureData, name, tags, description, isPrivate} = req.body;
        const owner = req.user.id;
        return this.pictureService.save({pictureData, name, tags, description, isPrivate, owner})
            .then((picture) => {
                return res.status(200).json(picture);
            })
            .catch(next);
    };

    find = (req, res, next) => {
        const {name, tags, sortBy, page, count, onlyMy} = req.query;
        const owner = req.user.id;
        return this.pictureService.find({name, onlyMy, tags, sortBy, page, count, owner})
            .then((pictures) => {
                return res.status(200).json(pictures);
            })
            .catch(next);
    };

    getPopularTags = (req, res, next) => {
        const {count} = req.query || 10;
        return this.pictureService.getPopularTags({count})
            .then((tags) => {
                return res.status(200).json(tags);
            })
            .catch(next);
    }

}