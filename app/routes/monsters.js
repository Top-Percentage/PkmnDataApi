var _ = require('underscore');
var express = require('express');
var router = express.Router();

var Monsters = require('../models/monsters');

// define route for all monsters
router.get('/', function (req, res) {
    Monsters.find(function (err, monsters) {
        if (err) {
            res.status(500).send({
              code: 500,
              message: 'Failed to retrieve list of Pokemon'
            });
        } else {
          res.json(monsters);
        }
    });
});

// define route for fetching monster from dex id
router.get('/dex/:dexId', function(req, res){
  var dexId = req.params.dexId || null;
  dexId = parseInt(dexId);
  if (!_.isUndefined(dexId) && !_.isNull(dexId) && !_.isNaN(dexId)) {
        Monsters.findByDexId(dexId, function (err, monster) {
            if (err) {
                res.send({
                  code: 500,
                  message: 'Failed to retrieve the Pokemon for ' + dexId
                });
            } else {
                if(monster.length > 0) {
                  res.json(monster[0]);
                } else {
                  res.status(404).send({
                    message: 'Pokemon not found'
                  });
                }
            }
        });
    } else {
      res.status(400).send({
        message: 'Invalid Dex ID supplied'
      });
    }
});

// define route for fetching monster by name
router.get('/name/:name', function (req, res) {
    var name = req.params.name || null;
    if (!_.isUndefined(name) && !_.isNull(name)) {
        Monsters.findByName(name, function (err, monster) {
            if (err) {
                res.send({
                  code: 500,
                  message: 'Failed to retrieve the Pokemon for ' + name
                });
            } else {
              if(monster.length > 0) {
                res.json(monster[0]);
              } else {
                res.status(404).send({
                  message: 'Pokemon not found'
                });
              }
            }
        });
    } else {
      res.status(400).send({
        message: 'Invalid name supplied'
      });
    }
});

module.exports = router;
