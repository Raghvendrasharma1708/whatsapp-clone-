

import { Avatar, Dialog, DialogContent, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Search } from '@mui/icons-material';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { getCommunication, getMessages, getUsers, newMessage } from '../../service/api.js';
import MicIcon from '@mui/icons-material/Mic';
import AddIcon from '@mui/icons-material/Add';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AccountContext } from '../context/AccountProvider';
import PersonalChatMenu from './menu/PersonalChatMenu';
import Picker from 'emoji-picker-react';
import { formatDate } from '../../utils/common-utils.js';
import ChatBarMenu from './menu/ChatBarMenu.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MobileScreenChatBox() {

    const { accounts, person, activeUsers, socket, setIsMobileScreen } = useContext(AccountContext)
    const [users, setUses] = useState({})
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([])
    const [communicate, setCommuniate] = useState({})
    const [newMessageFlag, setNewMessageFlag] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [File, setFile] = useState();
    const [incommingMessage, setIncommingMessage] = useState(null);




    const emojiButtonRef = useRef(null);
    const chatEndRef = useRef(null);

    const currentUserId = accounts.sub

    useEffect(() => {
        if (socket && socket.current) {
            socket.current.on('getMessage', (data) => {
                if (data.senderID !== currentUserId) {
                    setMessages((prev) => [...prev, { ...data, createdAt: Date.now() }]);
                }
            });
        }
    }, [socket, currentUserId]);


    useEffect(() => {
        const getCommunicationDetails = async () => {
            let data = await getCommunication
                ({
                    senderId: accounts.sub,
                    reciverId: person.sub
                })
            console.log(data);
            setCommuniate(data)
        }
        person.sub && getCommunicationDetails();

    }, [newMessageFlag, person.sub, accounts.sub])

    useEffect(() => {
        incommingMessage && communicate?.members?.includes(incommingMessage.senderID) &&
            setMessages(prev => [...prev, incommingMessage]);

    }, [incommingMessage, communicate])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsers(person.sub);
                setUses(response)

            } catch (error) {
                console.log("error to fetch the personal user data", error.message)
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        const checkOnlineStatus = () => {
            const isUserOnline = activeUsers?.find(user => user.sub === person.sub);
            setShowStatus(false);  // Hide the status before changing it
            setTimeout(() => {
                setIsOnline(isUserOnline ? true : false);
                setShowStatus(true);  // Show the status after a delay
            }, 1300);  // 1.7 seconds delay
        };
        checkOnlineStatus();
    }, [activeUsers, person.sub]);



    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(communicate._id)
            // console.log(data)
            setMessages(data)

        }
        communicate._id && getMessageDetails()
        scrollToBottom();

    }, [communicate._id, newMessageFlag])


    useEffect(() => {
        scrollToBottom(); // Scroll to the bottom when messages state changes
    }, [messages]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };



    const sendText = async (e) => {
        // console.log(e);
        const code = e.keycode || e.which;

        if (code === 13 && text.trim()) {
            let message = {
                senderID: accounts.sub,
                reciverID: person.sub,
                communicationId: communicate._id,
                type: 'text',
                text: text,
                createdAt: Date.now()
            }
            // console.log(message);
            if (socket && socket.current) {
                socket.current.emit('sendMessage', message);
                console.log('Message sent:', message);
            }

            await newMessage(message)
            // setMessages((prev) => [...prev, message]);
            setText('')
            setNewMessageFlag(prev => !prev)

        }
        console.log(newMessageFlag)

    }



    const onEmojiClick = (emojiObject) => {
        setText((prevText) => prevText + emojiObject.emoji);
    };


    const HandleBackToChat = () => {
        setIsMobileScreen(false)
    }

    return (


        <>


            <div className='chat  d-flex flex-column  bg-dark  d-md-none '>


                <div className='chatbar-header bg-black d-flex justify-content-between align-items-center text-white  p-1' >
                    <div className="left-chatHeader d-flex justify-content-between align-items-center  ">
                        <div className="chat-header-avatar 2 d-flex align-items-center justify-content-center ">
                            <ArrowBackIcon sx={{ margin: '5px', marginRight: '22px', cursor: 'pointer' }} onClick={HandleBackToChat} />
                            <Avatar src={person.picture} />
                        </div>
                        <div className="chatbar-username">
                            <p className='username' >{person.name}</p>

                            <p className={`user-current-status ${!showStatus ? 'hidden' : ''}`}>
                                {isOnline ? 'online' : 'offline'}
                            </p>
                        </div>


                    </div>
                    <div className="right-chatHeader d-flex align-items-center text-white">
                        <div className="chat-search">
                            <IconButton>
                                <Search className='sidebar-icons' />
                            </IconButton>
                        </div>
                        <div className="chat-options">
                            <IconButton>
                                <ChatBarMenu className="sidebar-icons" />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="chatbar-body  p-2 " style={{ overflowY: 'auto', flexGrow: 1 }}>

                    <div style={{ marginBottom: '5px' }} className='p-3'>

                        {messages?.map((message, index) => (
                            <>



                                <p key={index} className={`p-2 chatbar-message message-enter  ${message?.senderID === currentUserId ? "chat-reciver" : ""}`} >{message.text}  <span>{formatDate(message.createdAt)}</span></p>


                            </>
                        ))}
                        <div ref={chatEndRef} />


                    </div>


                </div>

                <Dialog open={showEmojiPicker} onClose={() => setShowEmojiPicker(false)} PaperProps={{
                    style: {
                        position: 'relative',
                        left: 'auto',
                    },
                }}
                    anchorEl={emojiButtonRef.current}>

                    <Picker className='picker' onEmojiClick={onEmojiClick} />

                </Dialog>

                <div className="chatbar-footer d-flex p-2 align-items-center" >

                    <div className="more-user-options p-2">
                        {/* <AddIcon className='sidebar-icons' />
                         */}
                        <PersonalChatMenu file={File} setFile={setFile} text={text} setText={setText} />
                    </div>

                    <div className="user-message-input  p-2 d-flex">
                        <div className="emogy">
                            <EmojiEmotionsIcon className='sidebar-icons' sx={{ cursor: 'pointer' }}
                                onClick={() => setShowEmojiPicker((val) => !val)} />

                        </div>
                        <div className="user-input">
                            <input
                                type="text"
                                placeholder=' Type a message'
                                onChange={(e) => setText(e.target.value)}
                                onKeyPress={(e) => sendText(e)}
                                value={text}
                            />
                        </div>
                    </div>

                    <div className="user-audio">
                        <MicIcon className='sidebar-icons' />
                    </div>
                </div>
            </div >
        </>
    )
}

export default MobileScreenChatBox