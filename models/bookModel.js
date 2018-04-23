const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ["pending", "cached", "found"],
        default: "normal"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cache: {
        type: Schema.Types.ObjectId,
        ref: "Cache"
    }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;