var _ = require('underscore');
var express = require('express');
var router = express.Router();

var Monsters = require('../models/monsters');

// define route for all monsters
router.get('/', function (req, res) {
    Monsters.find(function (err, monsters) {
        if (err) {
            res.send(err);
        } else {
          res.json(monsters);
        }
    });
});

module.exports = router;
