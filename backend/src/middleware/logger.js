const morgan =  require("morgan");
const Logger = require("../../utils/logConfig");

const morganMiddleware = morgan(":method :url :status :res[content-length] - :response-time ms", { stream: Logger.stream }
);

module.exports = morganMiddleware;