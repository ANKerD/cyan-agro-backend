const Mill = require("../models/Mill");
const Harvest = require("../models/Harvest");
const httpStatusCodes = require("../constants/httpStatusCodes");

module.exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const image = await photos.random("mill");
    const mill = await Mill.create({ name, image });
    res.status(httpStatusCodes.CREATED).json(mill);
  } catch (error) {
    next(error);
  }
};

module.exports.list = async (req, res, next) => {
  try {
    const mills = await Mill.findAll();
    res.status(httpStatusCodes.OK).json(mills);
  } catch (error) {
    next(error);
  }
};

module.exports.get = async (req, res, next) => {
  try {
    const mill = await Mill.findByPk(req.params.id, {
      include: Harvest
    });
    res.status(httpStatusCodes.OK).json(mill);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let mill = await Mill.findByPk(req.params.id);
    mill.name = req.body.name || mill.name;
    mill = await mill.save();
    res.status(httpStatusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    await Mill.destroy({ where: { id: req.params.id } });
    res.status(httpStatusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
