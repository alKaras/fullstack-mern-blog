const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema(
    {
        nickname: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            require: true,
            default: "reader"
        },
    },
    {
        collection: "users",
    }
)

const User = mongoose.model("users", userModelSchema);
module.exports = User;