const User = require("../models/User");
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

exports.signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}