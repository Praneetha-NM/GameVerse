const express = require("express");
const router = new express.Router();
const User = require('../models/User');
const auth = require("../middleware/auth");

// Input validation helper
const isValidEmail = (email) => typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post("/login", async (req, res) => {
    try {
        const { email } = req.body;
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        const user_exists = await User.findOne({ email });

        if (user_exists) {
            const existingToken = user_exists?.tokens?.length ? user_exists.tokens[0].token : null;
            return res.status(200).json({ user: user_exists, token: existingToken });
        }

        const user = new User(req.body);
        const token = await user.generateAuthToken();
        const saved_user = await user.save();

        console.log(saved_user);
        return res.status(200).json({ user: saved_user, token });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: e.message });
    }
});

router.get("/user-detail", auth, async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.get("/scores", async (req, res) => {
    try {
        const topUsers = await User.find({})
            .sort({ total: -1 })
            .limit(50)
            .select('-password -tokens');
        res.status(200).send(topUsers);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.post("/update-score", auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.email });
        console.log("Decoded email from token:", req.email);
        console.log("Authorization Header:", req.headers.authorization);
        if (!user) {
            return res.status(404).json({ Error: "User not found. Check if the token contains the correct email." });
        }

        const { game, score: scoreStr, level: levelStr } = req.body;

        if (!['WDLE', 'TETRIS', '2048', 'BKOUT'].includes(game)) {
            return res.status(400).json({ error: "Invalid game type." });
        }

        const score = parseInt(scoreStr, 10);
        if (isNaN(score)) {
            return res.status(400).json({ error: "Invalid score format." });
        }

        let level;
        if (levelStr !== undefined) {
            level = parseInt(levelStr, 10);
            if (isNaN(level)) {
                return res.status(400).json({ error: "Invalid level format." });
            }
        }

        if (game === 'WDLE') {
            user.wordle.points += 6 - score;
            user.total += 6 - score;
        } else if (game === 'TETRIS') {
            user.tetris.highScore = Math.max(user.tetris.highScore, score);
            if(level !== undefined){
                user.tetris.maxLevelReached = Math.max(user.tetris.maxLevelReached, level);
            }
            user.tetris.points += score;
            user.total += score;
        } else if (game === '2048') {
            user.tzfe.highScore = Math.max(user.tzfe.highScore, score);
            user.tzfe.points += score;
            user.total += score;
        } else if (game === 'BKOUT') {
            user.breakout.points += score;
            user.breakout.highScore = Math.max(score, user.breakout.highScore);
            user.total += score;
        }

        const saved_user = await user.save();
        res.status(200).send({ user: saved_user });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

module.exports = router;