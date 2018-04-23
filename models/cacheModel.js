const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cacheModel = new Schema({
    coordinates: {type: [Number], required: true },
    clue: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const Cache = mongoose.model("Cache", movieSchema);

module.exports = Cache;