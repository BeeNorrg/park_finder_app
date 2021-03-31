const User = require('./User');
const Parks = require('./Parks');
const Amenities = require('./Amenities');
const ParkAmenities = require('./ParkAmenities');
const Favorites = require('./Favorites')


Amenities.associate = function(models) {
    Amenities.belongsToMany(models.Parks, {
      through: models.ParkAmenities,
      foreignKey: "amenities_id"
    });
};

Parks.associate = function(models) {
    Parks.belongsToMany(models.Amenities, {
      through: models.ParkAmenities,
      foreignKey: "parks_id"
    });
};

ParkAmenities.belongsTo(Parks, {
    foreignKey: 'parks_id',
    targetKey: 'id'
});

ParkAmenities.belongsTo(Amenities, {
    foreignKey: 'amenities_id',
    targetKey: 'id'
});



module.exports = { 
    User, 
    Parks, 
    Amenities,
    ParkAmenities,
    Favorites, 
};
