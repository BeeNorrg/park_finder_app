const User = require('./User');
const Parks = require('./Parks');
const Amenities = require('./Amenities');
const Token = require('./Token')
const Favorites = require('./Favorites')


Token.belongsTo(Parks, {
    foreignKey: 'parks_id',
    through: {
        model: Token,
        unique: false
    }
});

Token.belongsTo(Amenities, {
    foreignKey: 'amenities_id',
    through: {
        model: Token,
        unique: false
    }
});

Favorites.belongsTo(User, {
    foreignKey: 'user_id'
});

Favorites.belongsTo(Parks, {
    foreignKey: 'parks_id',
})

// Amenities belongsTo Parks
Amenities.belongsTo(Parks, {
    foreignKey: 'parks_id'
});

// Parks have many Amenities
Parks.hasMany(Amenities, {
    foreignKey: 'parks_id'
});


module.exports = { 
    User, 
    Parks, 
    Amenities,
    Token,
    Favorites, 
};
