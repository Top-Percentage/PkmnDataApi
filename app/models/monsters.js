var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterSchema = new Schema({
    'dex': Number,
    'name': String,
    'classification': String,
    'types': [String],
    'regional dex': {
      'Kanto': String,
      'Johto': String,
      'Hoenn': String,
      'Central Kalos': String
    },
    'weight': {
      'metric': String,
      'imperial': String
    },
    'height': {
      'metric': String,
      'imperial': String
    },
    'base stats': {
      'hp': Number,
      'attack': Number,
      'defense': Number,
      'special attack': Number,
      'special defense': Number,
      'speed': Number
    },
    'training': {
     'catch rate': Number,
     'base happiness': Number,
     'base experience': Number,
     'max experience': Number,
     'growth rate': Number,
     'ev yeild': {
       'stat': String,
       'amount': Number
     }
   },
   'breeding': {
      'egg groups': [String],
      'gender': {
        'male': Number,
        'female': Number
      },
      'egg cycles': Number,
      'min egg steps': Number,
      'max egg steps': Number
    },
    'moves': [{
      'name': String,
      'methods': [{
        'how': String,
        'level': Number,
        'games': [String]
      }]
    }]
});

if (!monsterSchema.options.toJSON) {
    monsterSchema.options.toJSON = {};
}
monsterSchema.options.toJSON.transform = function (doc, ret) {
    // remove the _id of every document before returning the result
    delete ret._id;
};

monsterSchema.statics.findByDexId = function(dexId, cb) {
  return this.find({dex: parseInt(dexId)}, cb);
};

monsterSchema.statics.findByName = function(name, cb) {
  return this.find({name: new RegExp(name, 'i')}, cb);
};

module.exports = mongoose.model('Monsters', monsterSchema);
