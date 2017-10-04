

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _http = require('http');

const _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HttpServer {
  constructor(app) {
    this.start = () => {
      this.server.listen(port, () => log.info(`Server run on port ${port}`));
    };

    this.server = _http2.default.createServer(app);
  }
}
exports.default = HttpServer;
