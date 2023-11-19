const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema(
    {
        nickname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: "reader"
        },
    },
    {
        collection: "users",
    }
)

const User = mongoose.model("users", userModelSchema);
module.exports = User;