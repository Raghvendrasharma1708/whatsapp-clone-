import React, { useContext, useEffect } from 'react'
import SideBar from './SideBar'
import ChatBar from './ChatBar'
import ProfilePage from '../user/ProfilePage'
import EmptyChatDisplay from './EmptyChatDisplay'
import { AccountContext } from '../context/AccountProvider'


function ChatContainer() {

    const { person, isChatOpen } = useContext(AccountContext)


    console.log(person)


    return (
        <>
            <section className='chat-container '>

                <SideBar />



                {Object.keys(person).length && isChatOpen ? <ChatBar /> : <EmptyChatDisplay />}



            </section>
        </>
    )
}

export default ChatContainer