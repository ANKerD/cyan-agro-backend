require("dotenv").config();
const { default: Unsplash, toJson } = require("unsplash-js");

const fetch = require("node-fetch");
global.fetch = fetch;

const unsplash = new Unsplash({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  secret: process.env.UNSPLASH_SECRET_KEY
});

const photos = {
  random: async query => {
    try {
      const response = await unsplash.photos.getRandomPhoto({ query });
      return (await toJson(response)).urls.small;
    } catch (err) {
      return "https://picsum.photos/300/?random=1";
    }
  }
};

module.exports = photos;
