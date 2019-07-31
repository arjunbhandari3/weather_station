const router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:amazing@cluster0-hyk5s.mongodb.net/test?retryWrites=true&w=majority";

_this = this;

router.get("/", async function (req, res) {
    try {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("weatherdata");
            dbo.collection("data").findOne({}, {
                sort: {
                    $natural: -1
                }
            }, function (err, results) {
                if (err) throw err;
                console.log(results);
                res.send({
                    error: false,
                    data: results,
                    message: "Weather is successfully received."
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
});

module.exports = router;