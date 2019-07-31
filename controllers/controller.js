var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:amazing@cluster0-hyk5s.mongodb.net/test?retryWrites=true&w=majority";
const request = require('request');
const moment = require('moment');
var config = require('../config/config');

_this = this;

exports.getHomePage = async function (req, res) {
    try {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("weatherdata");
            dbo.collection("data").findOne({}, {
                sort: {
                    $natural: -1
                }
            }, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.render("index", {
                    result,
                    title: "Weather Station"
                });
                db.close();
            });
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}

exports.getAboutPage = async function (req, res, next) {
    return res.render("about", {
        title: "About - Weather Station"
    });
}

exports.getWeatherPage = async function (req, res, next) {
    return res.render('getweather', {
        weather: null,
        error: null,
        title: "Check Weather - Weather Station"
    });
}

exports.getLocationData = async function (req, res, next) {
    let lat = req.body.lat;
    let lon = req.body.lon;

    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${config.open_weather_map_api}`;

    request(url, function (err, response, body) {
        if (err) {
            res.render('getweather', {
                weather: null,
                title: "Check Weather - Weather Station",
                error: "Error! Please check your internet connection."
            });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('getweather', {
                    weather: null,
                    title: "Check Weather - Weather Station",
                    error: 'Error, Please try again!!!'
                });
            } else {
                let city = `${weather.name}`;
                let latitude = `${weather.coord.lat}`;
                let longitude = `${weather.coord.lon}`;
                let temp = `${weather.main.temp} \xB0C`;
                let pressure = `${weather.main.pressure} hPa`;
                let humidity = `${weather.main.humidity} %`;
                let speed = `${weather.main.speed} m/s`;
                let rainfall = `${weather.rain} mm`;
                let cloudiness = `${weather.clouds.all} %`;
                let time = moment(weather.time).format("dddd, DD MMM, YYYY, hh:mm:ss A");

                res.render('getweather', {
                    weather: response,
                    title: "Check Weather - Weather Station",
                    time: time,
                    city: city,
                    temp: temp,
                    latitude: latitude,
                    longitude: longitude,
                    pressure: pressure,
                    humidity: humidity,
                    speed: speed,
                    rainfall: rainfall,
                    cloudiness: cloudiness,
                    error: null
                });
            }
        }
    });
}

exports.getWeatherData = async function (req, res, next) {
    let city = req.body.city;
    let unit = req.body.unit;

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${config.open_weather_map_api}`;

    request(url, function (err, response, body) {
        if (err) {
            res.render('getweather', {
                weather: null,
                title: "Check Weather - Weather Station",
                error: "Error! Please check your internet connection."
            });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('getweather', {
                    weather: null,
                    title: "Check Weather - Weather Station",
                    error: 'Error, Please try again!!!'
                });
            } else {
                var unit1;
                if (unit == 'metric') {
                    unit1 = "\xB0C";
                } else if (unit == 'imperial') {
                    unit1 = "\xB0F";
                } else {
                    unit1 = "K";
                }
                let city = `${weather.name}`;
                let latitude = `${weather.coord.lat}`;
                let longitude = `${weather.coord.lon}`;
                let temp = `${weather.main.temp} ${unit1}`;
                let pressure = `${weather.main.pressure} hPa`;
                let humidity = `${weather.main.humidity} %`;
                let speed = `${weather.main.speed} m/s`;
                let rainfall = `${weather.rain} mm`;
                let cloudiness = `${weather.clouds.all} %`;
                let time = moment(weather.time).format("dddd, DD MMM, YYYY, hh:mm:ss A");

                res.render('getweather', {
                    weather: response,
                    title: "Check Weather - Weather Station",
                    time: time,
                    city: city,
                    temp: temp,
                    latitude: latitude,
                    longitude: longitude,
                    pressure: pressure,
                    humidity: humidity,
                    speed: speed,
                    rainfall: rainfall,
                    cloudiness: cloudiness,
                    error: null
                });
            }
        }
    })
}