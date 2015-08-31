var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterSchema = new Schema({
    name: String,
    dex_entry: Number
});

if (!monsterSchema.options.toJSON) {
    monsterSchema.options.toJSON = {};
}
monsterSchema.options.toJSON.transform = function (doc, ret, options) {
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