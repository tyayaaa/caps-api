const connection = require('../config/database')

//========================================================================================================
//get all place
const place = (req, res) => {
    connection.query(
        'SELECT * FROM Place_destination',
        function (err, rows) {
            if (err) {
                res.status(500).json('Internal Server Error')
            } else {
                res.status(200).json(rows)
            }
        }
    )
}

//get place by name
const placeByName = (req, res) => {
    const placeName = req.params.place_name;

    connection.query(
        'SELECT place_id, place_name, city FROM Place_destination WHERE place_name = ?',
        [placeName],
        function (err, rows) {
            if (err) {
                res.status(500).json('Internal Server Error');
            } else {
                res.status(200).json(rows);
            }
        }
    )
}


//get place detail
const detailPlace = (req, res) => {
    const placeId = req.params.place_id;

    connection.query(
        'SELECT * FROM Place_destination WHERE place_id = ?',
        [placeId],
        function (err, rows) {
            if (err) {
                res.status(500).json('Internal Server Error');
            } else {
                res.status(200).json(rows);
            }
        }
    )
}


//get popular place
//nanti ganti sama popularity based recommendation ml(?)
const popularPlace = (req, res) => {
    connection.query(
        'SELECT * FROM Place_destination WHERE rating > 4.5',
        function (err, rows) {
            if (err) {
                res.status(500).json('Internal Server Error')
            } else {
                res.status(200).json(rows)
            }
        }
    )
}

module.exports = {place, placeByName, detailPlace, popularPlace}