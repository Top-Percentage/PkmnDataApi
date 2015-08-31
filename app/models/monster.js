var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterSchema = new Schema({
    generation: Number,
    name: String,
    dex_entry: Number,
    type: [String],
    capture_rate: Number,
    base_egg_steps: Number,
    base_happiness: Number,
    experience_growth: Number,
    egg_groups: [String],
    base_stats: {
        hp: Number,
        attack: Number,
        defense: Number,
        special_attack: Number,
        special_defense: Number,
        speed: Number
    }
});

if (!monsterSchema.options.toJSON) {
    monsterSchema.options.toJSON = {};
}
monsterSchema.options.toJSON.transform = function (doc, ret) {
    // remove the _id of every document before returning the result
    delete ret._id;
};

monsterSchema.statics.findByName = function (name, cb) {
    return this.find({name: new RegExp(name, 'i')}, cb);
};

monsterSchema.statics.findByDexEntry = function (dex_entry, cb) {
    return this.find({dex_entry: parseInt(dex_entry)}, cb);
};

module.exports = mongoose.model('Monster', monsterSchema);