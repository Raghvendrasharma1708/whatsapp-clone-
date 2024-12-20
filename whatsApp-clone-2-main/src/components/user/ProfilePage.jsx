import React, { useContext, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import "../../style/profle.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, IconButton, useMediaQuery } from '@mui/material';
import { AccountContext } from '../context/AccountProvider';
import { Tilt } from 'react-tilt'
import { motion } from "framer-motion";



function ProfilePage() {
    const [open, setOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [selectedFile, setSelectedFile] = useState(null);
    const { accounts, setAccounts } = useContext(AccountContext)
    const name = accounts.name;
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };







    const DrawerStyle = {
        left: 25,
        top: 25,
        Height: 90,
        backgroundColor: "#111b21",
        width: 511,

    }
    const mobileDrawerStyle = {
        left: 1, // Adjust left position for mobile view
        top: 22, // Adjust top position for mobile view
        backgroundColor: "#111b21",
        height: "93vh",
        minWidth: 380, // Adjust width for mobile view
    };

    const defaultOptions = {
        reverse: false,  // reverse the tilt direction
        max: 35,     // max tilt rotation (degrees)
        perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale: 1.1,    // 2 = 200%, 1.5 = 150%, etc..
        speed: 1000,   // Speed of the enter/exit transition
        transition: true,   // Set a transition on enter/exit.
        axis: null,   // What axis should be disabled. Can be X or Y.
        reset: true,    // If the tilt effect has to be reset on exit.
        easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    }

    return (
        <div>
            <IconButton onClick={toggleDrawer(true)}><Avatar src={accounts?.picture} /></IconButton>
            <Drawer open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{ sx: isMobile ? mobileDrawerStyle : DrawerStyle }}
                BackdropProps={{ invisible: true }}>
                <div className="user-profile ">

                    <div className="profile-header text-white d-flex  p-3 ">

                        <div className='hidden-div'>

                        </div>
                        <div className='d-flex'>
                            <ArrowBackIcon onClick={toggleDrawer(false)} sx={{ marginRight: '10px', cursor: 'pointer' }} />
                            <h5 className=''>Profile</h5>
                        </div>

                    </div>
                    <motion.div
                        initial={{
                            x: -500
                            , opacity: 0,
                            scale: 1,
                        }}

                        animate={{
                            x: 0,
                            opacity: 1,
                            scale: 1
                        }}
                        transition={{ type: "spring", stiffness: 120 }}
                        className="profile-image     p-5">
                        <Tilt options={defaultOptions} style={{ height: 220, width: 220 }} >
                            <Avatar src={accounts?.picture} style={{ boxSizing: 'border-box' }} className='profile-avatar' />
                        </Tilt>

                        {/* <input type="file" onChange={handleFileChange} />
                        <button onClick={handleFileUpload}>Upload</button>
                        <button onClick={handleProfileImageChange}>Change Profile Image</button> */}
                    </motion.div>
                    <div className="profile-details  p-4">
                        <p className='title-details  '> Your name</p>

                        <input type="text" value={name} />


                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default ProfilePage