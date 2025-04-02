const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        },
    },
    googleId: {
        type: String,
        unique: true,
        required: true,
    },
    imageUrl: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'
    },
    breakout: {
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
    },
    wordle: {
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
    },
    tetris: {
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
        maxLevelReached: { type: Number, default: 0 }
    },
    tzfe: {  // 2048 game
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
    },
    total: {
        type: Number,
        default: 0
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

// Generate Authentication Token
UserSchema.methods.generateAuthToken = async function () {
    try {
        if (this.tokens.length > 1) this.tokens.splice(0, 1);
        const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET_KEY);
        console.log("🔹 JWT Secret Key:", process.env.JWT_SECRET_KEY);
        this.tokens.push({ token: token });
        return token;
    } catch (e) {
        return e;
    }
};

const User = mongoose.model("gamezone-user", UserSchema);

module.exports = User;
