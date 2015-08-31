var _ = require('underscore');
var express = require('express');
var router = express.Router();

var Monster = require('../models/monster');


// define route for all monsters
router.get('/', function (req, res) {
    Monster.find(function (err, monsters) {
        if (err) {
            res.send(err);
        } else {
            res.json(monsters);
        }
    });
});

// define route for monsters
router.get('/:pokemonId', function (req, res) {
    var pokemonId = req.params.pokemonId || null;
    console.log("Pokemon ID: " + pokemonId);

    var handleRequest = function (err, monster) {
        if (err) {
            res.send(err);
        } else {
            res.json(monster);
        }
    };

    if (!_.isUndefined(pokemonId) && !_.isNull(pokemonId)) {
        if (_.isNaN(parseInt(pokemonId))) {
            console.log("Search By Name");
            Monster.findByName(pokemonId, handleRequest);
        } else {
            console.log("Search by Dex Entry");
            Monster.findByDexEntry(pokemonId, handleRequest);
        }
    } else {
        // Invalid Params
        res.json({'message': 'It is all wrong'});
    }
});

module.exports = router;