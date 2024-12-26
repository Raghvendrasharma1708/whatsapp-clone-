import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    iss: {
        type: String
    },
    aud: {
        type: String
    },
    azp: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email_verified: {
        type: Boolean
    },
    exp: {
        type: Number
    },
    family_name: {
        type: String,
    },
    given_name: {
        type: String,
        require: true,

    },
    username: {
        type: String,
        require: true,
        trim: true,
        index: true
    },
    iat: {
        type: Number,
    },
    jti: {
        type: String
    },
    name: {
        type: String,
        require: true,

    },
    nbf: {
        type: Number
    },
    picture: {
        type: String,
        require: true,
        trim: true
    },
    sub: {
        type: String,
        require: true
    },

})

const User = mongoose.model('User', userSchema)
export default User;