import communication from "../models/Communication.models.js"
import message from "../models/Message.models.js"

export const newMessage = async (req, res) => {
    try {
        const newMessage = new message(req.body)
        await newMessage.save()
        await communication.findByIdAndUpdate(req.body.communicationId,
            { $push: { message: req.body.text } },
            { new: true });

        res.status(200).json("successfully message sent")

    } catch (error) {
        console.log(error)
    }

}

export const getMessages = async (req, res) => {
    try {
        let messages = await message.find({ communicationId: req.params.id });
        return res.status(200).json(messages)

    } catch (error) {
        res.status(500).json(error)

    }
}   