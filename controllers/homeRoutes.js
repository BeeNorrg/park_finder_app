const router = require('express').Router();
const { User, Parks, Amenities, ParkAmenities} = require('../models');
const withAuth = require('../utils/auth');



// we have 2 get routes for the home page - also put the login requirement back on
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });
    const parkData = await Parks.findAll();
    const parkAmenitiesData = await ParkAmenities.findAll({
      include: [{model: Amenities}],
      attributes: {exclude: ['id', 'amenities_id']},
  });

    const api_key = process.env.API_KEY;
    const maps = `https://maps.googleapis.com/maps/api/js?key=${api_key}&callback=initMap&libraries=&v=weekly`
    
    const users = userData.map((project) => project.get({ plain: true }));
    const parks = parkData.map((project) => project.get({ plain: true }));
    const parkAmenities = parkAmenitiesData.map((project) => project.get({ plain: true }));

    // console.log(parks)
    // console.log(users)
    console.log(parkAmenities)

    res.render('homepage', {
      logged_in: req.session.logged_in,
      parkAmenities,
      api_key,
      parks,
      maps,
      users,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/results', async (req,res) => {
  try {
    const parkAmenitiesData = await ParkAmenities.findAll();

    const parks = parkAmenitiesData.map((project) => project.get({ plain: true }));
    console.log(parks)
    res.render('results', {
      parks,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});






  

module.exports = router;
