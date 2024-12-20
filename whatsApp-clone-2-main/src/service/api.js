import axios from "axios";

const url = "https://localhost:8000";

export const addUser = async (data) => {


    try {
        await axios.post(`${url}/add`, data)
        console.log(data);

    } catch (error) {
        console.log("error to  post the request to database", error)
    }
}

export const getUsers = async () => {
    try {
        console.log('Fetching users from API..');

        let response = await axios.get(`${url}/users`)
        console.log('Users retrieved:', response.data);
        return response.data

    } catch (error) {
        console.log("erroe to get the data from database ", error)
    }
}

export const setCommunication = async (data) => {
    try {
        await axios.post(`${url}/communication/add`, data)


    } catch (error) {
        console.log("error to get the setCommunication from users ", error)
    }
}
export const getCommunication = async (data) => {
    try {
        let response = await axios.post(`${url}/communication/get`, data)
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log("error to get the getCommunication from users ", error)
    }
}

export const newMessage = async (data) => {
    try {
        await axios.post(`${url}/message/add`, data)

    } catch (error) {
        console.log("error to get new messagee", error)

    }
}
export const getMessages = async (id) => {
    try {
        let response = await axios.get(`${url}/message/get/${id}`);
        return response.data;

    } catch (error) {
        console.log("error while getMessage", error)

    }
}
export const uploadFile = async (data) => {
    try {
        return await axios.post(`${url}/file/upload`, data);


    } catch (error) {
        console.log("error while uploadFile", error)

    }
}




