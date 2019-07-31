var router = require('express').Router();
var controller = require('../controllers/controller.js');

router.get('/', controller.getHomePage);
router.get('/about', controller.getAboutPage);
router.get('/getweather', controller.getWeatherPage);
router.post('/getweather', controller.getWeatherData);
router.get('/checkweather', controller.getWeatherPage);
router.post('/checkweather', controller.getLocationData);

module.exports = router;