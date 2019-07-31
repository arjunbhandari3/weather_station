var mongoose = require('mongoose');

var WeatherSchema = new mongoose.Schema({
    temperature: {
        type: Number,
    },
    Pressure: {
        type: Number,
    },
    Humidity: {
        type: Number,
    },
    Altitude: {
        type: Number,
    },
    time: {
        type: Date,
    }
});

const WeatherData = mongoose.model('weatherdata', WeatherSchema);

module.exports = WeatherData;