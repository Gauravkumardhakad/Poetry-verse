const mongoose = require("mongoose");

const poemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Poem", poemSchema);
