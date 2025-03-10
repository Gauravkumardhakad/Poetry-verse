const mongoose = require("mongoose");

const poemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    likes: { type: Number, default: 0 },  // New field for likes
    comments: [                           // New field for comments
        {
            username: { type: String, required: true },
            comment: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model("Poem", poemSchema);
