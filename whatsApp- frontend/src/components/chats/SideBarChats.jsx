import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountContext } from '../context/AccountProvider';
import { getCommunication, getUsers } from '../../service/api.js';
import { selectChat, deselectChat, clearSelectedChats } from '../features/chats/chatSlice.js';
import { setCommunication } from '../../service/api.js';
import { useMediaQuery } from 'react-responsive';
import { formatDate } from '../../utils/common-utils.js';



function SideBarChats({ searchQueries }) {


    const [users, setUsers] = useState([])
    const [latestMessages, setLatestMessages] = useState({});
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { accounts, socket, setActiveUsers, setIsChatOpen, setIsMobileScreen, newMessageFlag, updatedUser, setUpdatedUser } = useContext(AccountContext)
    const { setPerson } = useContext(AccountContext)
    const dispatch = useDispatch();
    const selectedChatIds = useSelector(state => state.chats.selectedChatIds);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                console.log('Fetching users...');

                const response = await getUsers();

                console.log('Response from getUsers:', response);

                if (isMounted) {
                    const filteredUsers = response.filter(user => user.sub !== accounts.sub);


                    setUsers(filteredUsers);


                }

            } catch (error) {
                console.log("Error fetching data from API: ", error);
            }
        };
        fetchData()


        return () => {
            isMounted = false
        }



    }, [accounts.sub, users.length])







    const getUser = async (user) => {

        setPerson(user)
        await setCommunication({
            senderId: accounts?.sub,
            reciverId: user?.sub
        })
        setIsChatOpen(true);

        setIsMobileScreen(isMobile);

        setUpdatedUser((prevUsers) => {
            const updatedUsers = prevUsers.filter(u => u.sub !== user.sub);
            return [user, ...updatedUsers];
        });

    }
    const handleSelection = (user) => {
        if (selectedChatIds.includes(user.sub)) {
            dispatch(deselectChat(user.sub));
        } else {
            dispatch(selectChat(user.sub));
        }
    };

    const handleDeleteSelected = () => {
        setUsers(users.filter(user => !selectedChatIds.includes(user.sub)));
        dispatch(clearSelectedChats());
    };

    const searchFilteredUsers = users.filter(user =>
        user.name && user.name.toLowerCase().includes(searchQueries.toLowerCase())
    );


    useEffect(() => {
        socket.current.emit('addUsers', accounts);
        socket.current.on('getusers', users => {
            setActiveUsers(users);
        })
    }, [accounts, socket])



    useEffect(() => {
        const fetchLatestMessages = async () => {
            const messages = {};
            for (const user of users) {
                const data = await getCommunication({
                    senderID: accounts.sub,
                    reciverID: user.sub,
                });
                messages[user.sub] = {
                    text: data?.message,
                    timestamp: data?.updatedAt
                };
            }
            setLatestMessages(messages);
        };
        if (users.length > 0) {
            fetchLatestMessages();
        }
    }, [users, accounts.sub, newMessageFlag]);

    useEffect(() => {
        if (searchQueries.length >0) {
            const filtered = updatedUser.filter((user) => user.name.toLowerCase().includes(searchQueries.toLowerCase()));
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchQueries, users]);


    console.log(updatedUser)

    return (


        <>


            <div >



                {filteredUsers.sort((a, b) => b.lastMessageTime - a.lastMessageTime).map((user) => (
                    <>

                        <div className="main-sidebarChat mt-2 text-white d-flex justify-content-between  p-2" onClick={() => getUser(user)}>
                            <div className="sidebarChat-avatar ">
                                <Avatar src={user.picture} sx={{ fontSize: '40px' }} />
                            </div>
                            <div className="Right-sidebarChat d-flex justify-content-between">

                                <div className="setion1">
                                    <div className="user-name text-white">
                                        <p>{user.name}</p>
                                    </div>
                                    <div className="user-details ">
                                        <p>{latestMessages[user?.sub]?.text?.includes('localhost') ? 'media' : latestMessages[user?.sub]?.text || 'No message yet'}</p>
                                    </div>
                                </div>
                                <div className="section2 d-flex flex-column align-items-center">
                                    <div className="user-more-timing">
                                        <p>{latestMessages[user.sub]?.timestamp ? formatDate(latestMessages[user?.sub]?.timestamp) : 'Today'}</p>
                                    </div>
                                    <div className="user-status">
                                        <ExpandMoreIcon className='sidebar-icons' />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                ))}
                {/* </div> */}

                {/* {searchFilteredUsers > 0 ? searchFilteredUsers.map(user =>
                (<>
                    <div className="main-sidebarChat mt-2 text-white d-flex justify-content-between  p-2" onClick={() => getUser(user)}>
                        <div className="sidebarChat-avatar ">
                            <Avatar src={user.picture} sx={{ fontSize: '40px' }} />
                        </div>
                        <div className="Right-sidebarChat d-flex justify-content-between">

                            <div className="setion1">
                                <div className="user-name text-white">
                                    <p>{user.name}</p>
                                </div>
                                <div className="user-details ">
                                    <p>{latestMessages[user?.sub]?.text?.includes('localhost') ? 'media' : latestMessages[user?.sub]?.text || 'No message yet'}</p>
                                </div>
                            </div>
                            <div className="section2 d-flex flex-column align-items-center">
                                <div className="user-more-timing">
                                    <p>{latestMessages[user.sub]?.timestamp ? formatDate(latestMessages[user?.sub]?.timestamp) : 'Today'}</p>
                                </div>
                                <div className="user-status">
                                    <ExpandMoreIcon className='sidebar-icons' />
                                </div>
                            </div>

                        </div>
                    </div>
                </>

                )) : updatedUser.map(user => (
                    <div key={user.sub} className="main-sidebarChat mt-2 text-white d-flex justify-content-between  p-2" onClick={() => getUser(user)}>
                        <div className="sidebarChat-avatar ">
                            <Avatar src={user.picture} sx={{ fontSize: '40px' }} />
                        </div>
                        <div className="Right-sidebarChat d-flex justify-content-between">

                            <div className="setion1">
                                <div className="user-name text-white">
                                    <p>{user.name}</p>
                                </div>
                                <div className="user-details ">
                                    <p>{latestMessages[user?.sub]?.text?.includes('localhost') ? 'media' : latestMessages[user?.sub]?.text || 'No message yet'}</p>
                                </div>
                            </div>
                            <div className="section2 d-flex flex-column align-items-center">
                                <div className="user-more-timing">
                                    <p>{latestMessages[user.sub]?.timestamp ? formatDate(latestMessages[user?.sub]?.timestamp) : 'Today'}</p>
                                </div>
                                <div className="user-status">
                                    <ExpandMoreIcon className='sidebar-icons' />
                                </div>
                            </div>

                        </div>
                    </div>
                ))} */}

            </div >
        </>
    )
}

export default SideBarChats