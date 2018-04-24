const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cacheSchema = new Schema({
    location: {
        type: {type: String},
        coordinates: [
            {type: Number}
        ]
    },
    clue: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

cacheSchema.index({ location: "2dsphere" });
const Cache = mongoose.model("Cache", cacheSchema);

module.exports = Cache;