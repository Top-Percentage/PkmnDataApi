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

// define route for fetching monster by dex number
router.get('/dex/:dexId', function (req, res) {
    var dexId = req.params.dexId || null;
    if (!_.isUndefined(dexId) && !_.isNull(dexId) && !_.isNaN(dexId)) {
        Monster.findByDexEntry(dexId, function (err, monster) {
            if (err) {
                res.send(err);
            } else {
                res.json(monster);
            }
        });
    } else {
        // Invalid Params
        res.json({'message': 'It is all wrong'});
    }
});

// define route for monster by its name
router.get('/name/:name', function (req, res) {
    var name = req.params.name || null;
    if (!_.isUndefined(name) && !_.isNull(name)) {
        Monster.findByName(name, function (err, monster) {
            if (err) {
                res.send(err);
            } else {
                res.json(monster);
            }
        });
    } else {
        // Invalid Params
        res.json({'message': 'It is all wrong'});
    }
});

module.exports = router;