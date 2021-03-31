const router = require('express').Router();
const { Amenities, Favorites, Parks, ParkAmenities, User } = require('../../models');

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
router.post('/filter-parks/:searchOption', async (req, res) => {
    try {
        const filteredParks = await Amenities.findAll({
            include: [{ model: Parks },{ model: ParkAmenities }]
        },
        {
            where: {
                amenities_name: req.params.searchOption
            }
        });
        res.status(200).json(filteredParks);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

// Routing
// app.post("/api/query", function(req, res) {
//     var array;
//     console.log(req.body);
//     array = req.body["skillIds[]"];
//     db.Employee.findAll({
//       include: [
//         {
//           model: db.Skills,
//           required: true,
//           attributes: ["skill"],
//           // You will need to enable this
//          // through: { where: { idSkills: array } }
//         }
//       ]
//     }).then(function(result) {
//       var barray = [];
//       for (var i = 0 ; i< result.length; i++){
//         if (result[i].Skills.length === array.length){
//           barray.push(result[i]);
//         }
//       }
//       res.json(barray);
//     });
//   });

// Plain JS Code
// $(document).on("submit", ".search", function (e) {
//     e.preventDefault();
//     $("#results").empty();
//     var array = [];
//     // Each selected CHeckbox id will be added to the array
//     $("select[name='skill_ids[]']").each(function () {
//         array.push($(this).val());
//     })
//     $.post("/api/query", { skillIds: array }).then(function (response) {
//         console.log(response);
//         for (var i = 0; i < response.length; i++) {
//         //ADD HTML
//         }
//     });
// });