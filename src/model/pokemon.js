const mongoose = require('../lib/mongoose');

const schema = new mongoose.Schema({ 
    name: { type: String, required: true, unique: true }, 
    height: { type: Number, required: true }, 
    weight: { type: Number, required: true }
});
const Pokemon = mongoose.model('Pokemon', schema);

module.exports = Pokemon;