import React, { useEffect, useState } from 'react'
import "../../style/chat.css"
import { AccountContext } from '../context/AccountProvider'
import { useContext } from 'react'
import ChatContainer from './ChatContainer'



function ChatDialoge() {
    const { modes } = useContext(AccountContext)
    const [theme, setTheme] = useState()
    useEffect(() => {
        // Update theme based on the mode context value
        const themeModes = modes === 'light Mode' ? 'Dark Mode' : 'light Mode'
        setTheme(themeModes)
        // console.log(themeModes)
        document.documentElement.setAttribute('data-theme', themeModes);
    }, [theme]); // Run this effect whenever modes changes

    // console.log(modes)

    return (
        <>
            <section className=''>
                <header className='chat-header'>

                </header>
                <div className='chat-section'>

              
                <ChatContainer />
                </div>

            </section>
        </>
    )
}

export default ChatDialoge