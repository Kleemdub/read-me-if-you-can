const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: { type : String },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    encryptedPassword: { type: String },
    role: { 
        type: String, 
        enum: ["normal", "admin"],
        default: "normal"
    },
    googleID: {type: String},
    score: {type: Number, default: 0}
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;