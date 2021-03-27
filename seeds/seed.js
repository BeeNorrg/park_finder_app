const sequelize = require('../config/connection');
const { User, Parks, Amenities } = require('../models');

const userData = require('./userData.json');
const parksData = require('./parksData.json');
const amenData = require('./amenData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Parks.bulkCreate(parksData, {
    individualHooks: false,
    returning: true,
  });

  await Amenities.bulkCreate(amenData, {
    individualHooks: false,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
