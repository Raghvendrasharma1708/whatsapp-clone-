import communication from "../models/Communication.models.js";

export const newCommunication = async (req, res) => {
    try {
        const senderId = req.body.senderId;
        const reciverId = req.body.reciverId;



        const exist = await communication.findOne({ members: { $all: [reciverId, senderId] } })

        if (exist) {
            return res.status(200).json('communication already exist ')
        }

        const newCommunication = new communication({
            members: [senderId, reciverId]
        });
        await newCommunication.save()

        return res.status(200).json('communication  saved successfully');
    } catch (error) {
        return res.status(500).json(error)

    }


}



export const getCommunication = async (req, res) => {
    try {
        const senderId = req.body.senderId;
        const reciverId = req.body.reciverId;

        let Communication = await communication.findOne({ members: { $all: [senderId, reciverId] } })
        return res.status(200).json(Communication)
    } catch (error) {
        return res.status(500).json("error to get the data in mongodb", error)

    }
}