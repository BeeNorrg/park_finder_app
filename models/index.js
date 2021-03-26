const User = require('./User');
const Parks = require('./Parks');
const Amenities = require('./Amenities');
const Token = require('./Token')
const Favorites = require('./Favorites')


// Amenities belongsTo Parks
Amenities.belongsTo(Parks, {
    foreignKey: 'parks_id'
})

// Parks have many Amenities
Parks.hasMany(Amenities, {
    foreignKey: 'parks_id'
});


//Favorites belongs to User


// User has many favorites 




module.exports = { 
    User, 
    Parks, 
    Amenities,
    Token,
    Favorites, 
};
