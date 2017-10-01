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
        const {name, onlyMy, tags, sortBy, page, count} = req.query;
        return this.pictureService.find({name, onlyMy, tags, sortBy, page, count})
            .then((pictures) => {
                return res.status(200).json(pictures);
            })
            .catch(next);
    };

    getPopularTags = () => {
        const {count} = req.query;
        return this.pictureService.getPopularTags({count})
            .then((tags) => {
                return res.status(200).json(tags);
            })
            .catch(next);
    }

}