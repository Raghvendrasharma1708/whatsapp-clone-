import mongoose, { Mongoose } from "mongoose";

const messageSchema = new mongoose.Schema({
    communicationId: {
        type: String,

    },
    reciverID: {
        type: String,
    },
    senderID: {
        type: String
    },
    text: {
        type: String
    },
    type: {
        type: String
    }

}, {
    timestamps: true
})
const message = mongoose.model('Message', messageSchema)

export default message;
