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
        } else if (existedNick) {
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
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            usid: user._id,
            email: user.email,
            role: user.role
        }, config.jwt.TOKEN, {
            expiresIn: config.jwt.EXPIRESIN,
        })

        if (res.status(200)) {
            return res.json({
                user: user,
                userRole: user.role,
                token: `Bearer ${token}`
            });
        }
    } else {
        return res.status(401).json({ message: "Пароль не вірний" });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            res.status(404).json({
                message: "Користувача не знайдено"
            })
        }
        const token = jwt.sign({
            usid: user._id,
            email: user.email,
            role: user.role
        }, config.jwt.TOKEN, {
            expiresIn: config.jwt.EXPIRESIN,
        })
        return res.status(200).json({
            user: user,
            token: `Bearer ${token}`
        })
    } catch (error) {
        res.status(404).json({ message: "Не вдалось знайти користувача" });
    }
}

module.exports = {
    login,
    register,
    getUser
}