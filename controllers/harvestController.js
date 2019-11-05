const Harvest = require("../models/Harvest");
const Farm = require("../models/Farm");
const httpStatusCodes = require("../constants/httpStatusCodes");

module.exports.create = async (req, res, next) => {
  try {
    const { millId, startDate, endDate } = req.body;
    const harvest = await Harvest.create({ millId, startDate, endDate });
    res.status(httpStatusCodes.CREATED).json(harvest);
  } catch (error) {
    next(error);
  }
};

module.exports.get = async (req, res, next) => {
  try {
    const harvest = await Harvest.findByPk(req.params.id, {
      include: Farm
    });
    res.status(httpStatusCodes.OK).json(harvest);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let harvest = await Harvest.findByPk(req.params.id);
    const { startDate, endDate } = req.body;
    harvest.startDate = startDate || harvest.startDate;
    harvest.endDate = endDate || harvest.endDate;
    harvest = await harvest.save();
    res.status(httpStatusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    await Harvest.destroy({ where: { id: req.params.id } });
    res.status(httpStatusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
