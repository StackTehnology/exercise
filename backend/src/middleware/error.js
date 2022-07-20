const logger = require("../../utils/logConfig");

const errorHandler = async (err, req, res, next) => {
   logger.error(err);
  res.status(500).json({ message: "Something went wrong, we have already received notification we will fix it soon!!!" });
};

module.exports = { errorHandler };