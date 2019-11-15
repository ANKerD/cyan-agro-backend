require("dotenv").config();

const moment = require("moment");
const photos = require("./helpers/photos");
const db = require("./models/db");
const Field = require("./models/Field");
const Farm = require("./models/Farm");
const Harvest = require("./models/Harvest");
const Mill = require("./models/Mill");

(async () => {
  try {
    await db.authenticate();
    await db.sync({ force: true });
    console.log("Connection has been established successfully.");

    const image = await photos.random("mill");
    const mill = await Mill.create({ name: "California", image });

    const harvest = await Harvest.create({
      startDate: moment().subtract(1, "days"),
      millId: mill.id
    });

    for (let i = 2; i <= 200; i += 10) {
      await Harvest.create({
        endDate: moment().subtract(i, "days"),
        startDate: moment().subtract(i + 1, "days"),
        millId: mill.id
      });
    }

    const mills = ["São José", "São Fernando", "Caico", "Areia", "Queimadas"];
    mills.forEach(async name => {
      try {
        const image = await photos.random("mill");
        await Mill.create({ name, image });
      } catch (error) {
        console.log(error);
      }
    });

    const farms = ["São Jerônimo", "Ramada", "Bestas brabas", "Jurema"];
    farms.forEach(async (name, index) => {
      harvestId = 1;
      const image = await photos.random("mill");
      await Farm.create({ name, image, harvestId });
      const field = await Field.create({
        farmId: 1,
        latitude: -15.7997669 + index,
        longitude: -47.8629319 - index
      });
    });

    // await Harvest.create({
    //   startDate: "2013/7/1",
    //   millId: 4
    // });
    // const ret = await Harvest.findAll({ where: { millId: 4 } });
    // console.log(ret.map(x => x.toJSON()));

    // for (let i = 0; i < 10; ++i) {

    //     const farm = await Farm.create({name: 'Ramada'});
    //     const field = await Field.create({latitude: 4.11, longitude: 98, farmId: farm.id});
    // }
    // Farm.destroy({ where: {id: 7}});
    // console.log((await Field.findAll()).map(d => d.toJSON()));
    setTimeout(async () => {
      await Field.create({
        farmId: 1,
        latitude: -6.244594,
        longitude: -37.163051
      });
      db.close();
    }, 4000);
  } catch (err) {
    console.log("Error while connecting to database.", err);
    process.kill(process.pid);
  }
})();
