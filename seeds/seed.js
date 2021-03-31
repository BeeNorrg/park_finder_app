const sequelize = require('../config/connection');
const { User, Parks, Amenities, ParkAmenities } = require('../models');

const userData = require('./userData.json');
const parksData = require('./parksData.json');
const amenitiesData = require('./amenitiesData.json');
const parkamenditiesData = require('./parkamenditiesData.json');

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

  await Amenities.bulkCreate(amenitiesData, {
    individualHooks: false,
    returning: true,
  });

  await ParkAmenities.bulkCreate(parkamenditiesData, {
    individualHooks: false,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
