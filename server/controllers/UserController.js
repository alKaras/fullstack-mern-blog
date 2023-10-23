const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const register = async (req, res) => {
    const { nickname, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({ email });
        const existedNick = await User.findOne({ nickname });
        if (oldUser) {
            return res.status(401).json({ message: "Користувач уже існує, введіть інші дані" });
        } else if (nickname) {
            return res.status(401).json({ message: "Користувач з таким ім'ям існує. Введіть інші дані" })
        } else {
            const newUser = await User.create({
                nickname,
                email,
                password: encryptedPassword
            });
            const user = await newUser.save();
            return res.status(200).json({
                user: user,
            })
        }
    } catch (error) {
        return res.status(401).json({ message: "Не вдалось створити аккаунт" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "Користувача не знайдено, введіть іншу пошту" });
    }
}