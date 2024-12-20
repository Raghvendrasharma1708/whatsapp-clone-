import mongoose from "mongoose";

const CommunicationSchema = new mongoose.Schema({
    members: {
        type: [String], // Changed from Array to [String] to specify an array of strings
        required: true  // Ensure members array is required
    },
    message: {
        type: String,

    }
}, {
    timestamps: true,
})

// Create an index on the 'members' field to improve query performance
CommunicationSchema.index({ members: 1 });



const communication = mongoose.model('Communiaction', CommunicationSchema)

export default communication;   