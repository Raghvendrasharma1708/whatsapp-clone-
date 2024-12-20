import React, { useState, useRef, useEffect } from 'react'
import { createContext } from 'react'
import { io } from "socket.io-client"
export const AccountContext = createContext(null);
function AccountProvider({ children }) {



    const [accounts, setAccount] = useState();
    const [person, setPerson] = useState([]);
    const [modes, setModes] = useState("Dark Mode");
    const [Logout, setLogout] = useState();
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [activeUsers, setActiveUsers] = useState([]);
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    const [newMessageFlag, setNewMessageFlag] = useState(false)
    const [checked, setChecked] = React.useState();
    const [updatedUser, setUpdatedUser] = useState([]);


    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:9000')

        socket.current.on('getusers', (users) => {
            setActiveUsers(users);
            console.log(users)

        });

        socket.current.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });
        return () => {
            socket.current.disconnect();
        };
    }, [])


    return (
        <>
            <AccountContext.Provider value={
                {
                    accounts,
                    setAccount,

                    modes,
                    setModes,

                    person,
                    setPerson,

                    setLogout,
                    socket,


                    activeUsers,
                    setActiveUsers,


                    isChatOpen,
                    setIsChatOpen,

                    isMobileScreen,
                    setIsMobileScreen,

                    checked,
                    setChecked,

                    newMessageFlag,
                    setNewMessageFlag,

                    updatedUser,
                    setUpdatedUser,
                }
            } >
                {children}
            </AccountContext.Provider>
        </>
    )
}

export default AccountProvider