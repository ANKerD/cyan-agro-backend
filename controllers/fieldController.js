const Field = require("../models/Field");
const httpStatusCodes = require("../constants/httpStatusCodes");
const notFound = require("../helpers/notFound");

module.exports.create = async (req, res, next) => {
  try {
    const { latitude, longitude, farmId } = req.body;
    const field = await Field.create({ latitude, longitude, farmId });
    res.status(httpStatusCodes.CREATED).json(field);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let field = await Field.findByPk(req.params.id);
    notFound(field);

    const { latitude, longitude } = req.body;

    field.latitude = latitude || field.latitude;
    field.longitude = longitude || field.longitude;

    field = await field.save();
    res.status(httpStatusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    await Field.destroy({ where: { id: req.params.id } });
    res.status(httpStatusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
