const Farm = require("../models/Farm");
const Field = require("../models/Field");
const Harvest = require("../models/Harvest");
const Mill = require("../models/Mill");
const httpStatusCodes = require("../constants/httpStatusCodes");
const photos = require("../helpers/photos");
const notFound = require("../helpers/notFound");

module.exports.create = async (req, res, next) => {
  try {
    const { name, harvestId } = req.body;
    const image = await photos.random("mill");
    const farm = await Farm.create({ name, harvestId, image });
    res.status(httpStatusCodes.CREATED).json(farm);
  } catch (error) {
    next(error);
  }
};

module.exports.get = async (req, res, next) => {
  try {
    const farm = await Farm.findByPk(req.params.id, {
      include: [
        Field,
        {
          model: Harvest,
          include: Mill
        }
      ]
    });
    notFound(farm);

    res.status(httpStatusCodes.OK).json(farm);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let farm = await Farm.findByPk(req.params.id);
    notFound(farm);

    farm.name = req.body.name || farm.name;
    farm = await farm.save();
    res.status(httpStatusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    await Farm.destroy({ where: { id: req.params.id } });
    res.status(httpStatusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
