const Mill = require("../models/Mill");
const httpStatusCodes = require("../constants/httpStatusCodes");

module.exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const mill = await Mill.create({ name });
    res.status(httpStatusCodes.CREATED).json(mill.toJSON());
  } catch (error) {
    next(error);
  }
};

module.exports.list = async (req, res, next) => {
  try {
    let mills = await Mill.findAll();
    mills = mills.map(mill => mill.toJSON());
    res.status(httpStatusCodes.OK).json(mills);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let mill = await Mill.findByPk(req.params.id);
    mill.name = req.body.name;
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
