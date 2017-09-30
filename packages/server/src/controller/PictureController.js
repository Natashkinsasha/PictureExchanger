export default class PictureController {

    constructor({pictureService}) {
        this.pictureService = pictureService;
    }

    save = (req, res, next) => {
        const {pictureData, name, tags, description, isPrivate} = req.body;
        return this.pictureService.save({pictureData, name, tags, description, isPrivate})
            .then((picture) => {
                return res.status(200).json(picture);
            })
            .catch(next);
    };

    find = (req, res, next) => {
        const {name, onlyMy, tags, sortBy, page, count} = req.body;
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