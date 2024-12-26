import React, { useEffect, useState } from 'react'
import "../style/style.css"
import LoginDialogbox from './accounts/LoginDialogbox'
import Switch from '@mui/material/Switch';
import ChatDialoge from './chats/ChatDialoge.jsx'

import { useContext } from 'react';
import { AccountContext } from './context/AccountProvider';


function Messenger({ client_id }) {
    const [isTrue, setIstrue] = useState("light Mode")

    const { accounts, setAccount, checked, setChecked } = useContext(AccountContext)
    const { setModes } = useContext(AccountContext)



    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (!checked) {
            setIstrue("Dark Mode")
            setModes("Dark Mode")
        } else {
            setIstrue("light Mode")
            setModes("light Mode")
        }
    };

    document.documentElement.setAttribute('data-theme', isTrue === 'Dark Mode' ? 'Dark Mode' : 'light Mode');


    // console.log(accounts);


    return (
        <>
            {!accounts ? (<>
                <section className='header'>
                    <div className=" ">
                        <div className=" ">
                            <div className="col-12  d-flex  align-items-center">
                                <div className=" inner-header col-6  d-flex align-items-center    ">
                                    <div className="whatsapp-icon p-2">
                                        <img className='whatsapp-image' src="../images/whatsapp-icon.png" alt=" whatsapp-icon" />
                                    </div>
                                    <div className="whatsapp-text p-2"> <p>WHATSAPP WEB</p></div>
                                </div>
                                <div style={{ justifyContent: 'right' }} className="col-6 d-flex align-items-center p-3">

                                    <Switch
                                        checked={checked}
                                        className='toggle-here'
                                        sx={
                                            {
                                                color: 'green'
                                            }
                                        }
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}

                                    />
                                    <span className='toggle-button'> {isTrue}</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
                <div className="login-section">
                    <LoginDialogbox client_id={client_id} />


                </div></>) : (<>

                    <ChatDialoge />

                </>)}


        </>
    )
}

export default Messenger