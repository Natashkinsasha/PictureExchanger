import Promise from 'bluebird';
import multiparty from 'multiparty';

export default () => (req, res, next) =>
    handleMultipartData(req)
        .then(({data, file, fileLength}) => {
            req.body = {
                ...data,
                file,
                fileLength,
            };
            next();
        })
        .catch(next);


//TODO добавить настройки
function handleMultipartData(req) {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        let data = {};
        let file;
        let fileLength;

        form.on('error', (err) => {
            reject(err);
        });

        form.on('field', (name, value) => {
            try {
                data[name] = JSON.parse(value);
                return true;

            } catch (err) {
                reject(err);
            }
            return reject(new Error('Can not find required field "json"'));
        });

        form.on('part', (part) => {
            part.on('error', err => reject(err));
            file = part;
            fileLength = part.byteCount - part.byteOffset;
            return resolve({data, file, fileLength});
        });

        form.on('close', () => resolve({data, file, fileLength}));

        form.parse(req);
    });
}