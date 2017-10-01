import performance from 'performance-nodejs';
import config from 'config';

import log from '../lib/logger';

const perf_logs = config.get('server.perf_logs');

export default {
    start: () => {
        if (perf_logs){
            return performance(data => (
                log.prof({
                    id: nodeId,
                    logType: 'Performance Data',
                    performanceData: data,
                })
            ), 'MB', 5000);
        }
        return true;
    }
}
