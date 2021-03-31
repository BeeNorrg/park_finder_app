const router = require('express').Router();
const { Amenities, Favorites, Parks, ParkAmenities, User } = require('../../models');
const sequelize = require('../../config/connection');
const { QueryTypes } = require('sequelize');

// Get all parks and attached amenities
router.get('/parks', async (req, res) => {
    try {
        const allParks = await Parks.findAll({
            include: [{ model: Amenities }]
        });
        res.status(200).json(allParks);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Get parks that are favorites of the user
router.get('/user-parks/:id', async (req, res) => {
    try {
        const userParks = await User.findByPk(req.session.user_id, {
            include: [{
                model: Favorites,    
                attributes: ['parks_id'],
                model: Parks,
                attributes: ['name', 'address']
            }]
        });
        res.status(200).json(userParks);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Get parks that match filter
router.post('/filter-parks', async (req, res) => {
    try {

        var amenitiesArray = '3, 14' // Need format - discuss with Brandon
        const filteredParks = await sequelize.query('SELECT name, address FROM parks INNER JOIN park_amenities ON parks.id = park_amenities.parks_id INNER JOIN amenities ON amenities.id = park_amenities.amenities_id WHERE park_amenities.amenities_id IN ($amenities)', {
            bind: { amenities: amenitiesArray },
            type: QueryTypes.SELECT
        })

        console.log(filteredParks);
        res.status(200).json(filteredParks);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

});

module.exports = router;