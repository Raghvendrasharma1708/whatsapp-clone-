import { Router } from "express";
import { adduser, getUsers } from "../controllers/user-controller.js";
import { newCommunication, getCommunication } from "../controllers/communication-contorller.js";
import { getMessages, newMessage } from "../controllers/message-controller.js";




const route = Router();

route.post('/add', adduser)
route.get('/users', getUsers)
route.post('/communication/add', newCommunication)
route.post('/communication/get', getCommunication)
route.post('/message/add', newMessage)
route.get('/message/get/:id', getMessages)


export default route;