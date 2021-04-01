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


// Get parks that match filter
router.post('/filter-parks', async (req, res) => {
    try {
        searchArray = req.body // Need format - discuss with Brandon
        let searchObject = searchArray;

        let amenitiesArray = []; 

        for (let i = 0; i < searchObject.searchArray.length; i++) {
            amenitiesArray.push(searchObject.searchArray[i]);
        }

        if (amenitiesArray.length == 1) {
            const filteredParks = await sequelize.query('SELECT name, address, latitude, longitude FROM parks INNER JOIN park_amenities ON parks.id = park_amenities.parks_id INNER JOIN amenities ON amenities.id = park_amenities.amenities_id WHERE park_amenities.amenities_id IN ($amenities)', {
                bind: { amenities: amenitiesArray[0] },
                type: QueryTypes.SELECT
            })
    
            // console.log(filteredParks);
            res.status(200).json(filteredParks);
        } else if (amenitiesArray.length == 2) {
            const filteredParks = await sequelize.query('SELECT name, address, latitude, longitude FROM parks INNER JOIN park_amenities ON parks.id = park_amenities.parks_id INNER JOIN amenities ON amenities.id = park_amenities.amenities_id WHERE park_amenities.amenities_id IN ($amenities)', {
                bind: { amenities: amenitiesArray[0, 1] },
                type: QueryTypes.SELECT
            })
    
            console.log(filteredParks);
            res.status(200).json(filteredParks);
        } else if (amenitiesArray.length == 3) {
            const filteredParks = await sequelize.query('SELECT name, address, latitude, longitude FROM parks INNER JOIN park_amenities ON parks.id = park_amenities.parks_id INNER JOIN amenities ON amenities.id = park_amenities.amenities_id WHERE park_amenities.amenities_id IN ($amenities)', {
                bind: { amenities: amenitiesArray[0, 1, 2] },
                type: QueryTypes.SELECT
            })
    
            console.log(filteredParks);
            res.status(200).json(filteredParks);
        } else if (amenitiesArray.length == 4) {
            const filteredParks = await sequelize.query('SELECT name, address, latitude, longitude FROM parks INNER JOIN park_amenities ON parks.id = park_amenities.parks_id INNER JOIN amenities ON amenities.id = park_amenities.amenities_id WHERE park_amenities.amenities_id IN ($amenities)', {
                bind: { amenities: amenitiesArray[0, 1, 2, 3] },
                type: QueryTypes.SELECT
            })
    
            console.log(filteredParks);
            res.status(200).json(filteredParks);
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;