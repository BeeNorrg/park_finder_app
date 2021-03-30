const router = require('express').Router();
const { User, Parks, Amenities, ParkAmenities} = require('../models');
const withAuth = require('../utils/auth');

// Renders homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
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