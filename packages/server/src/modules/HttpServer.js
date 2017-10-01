import http from 'http';
import deasync from 'deasync';
import config from 'node-config-env-value';

import logger from '../lib/logger';

export default class HttpServer {

    constructor(app) {
        this.server = http.createServer(app);
    }

    start = () => {
        const port = config.get('server.port');
        let done = false;
        this.server.listen(port, () => {
            done = true;
        });
        deasync.loopWhile(()=>(!done));
        logger.state(`Server run on port ${port}`)
    };
}
