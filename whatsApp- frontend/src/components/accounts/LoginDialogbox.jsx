import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { addUser } from '../../service/api.js';
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),

    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
function LoginDialogbox({ client_id }) {



    const [open, setOpen] = React.useState(true);
    const { setAccount } = useContext(AccountContext)
    const handleClose = () => {
        setOpen(false);
    };


    const OnLoginSuccess = async (res) => {



        const decode = jwtDecode(res.credential)

        console.log(decode);
        setAccount(decode)
        await addUser(decode)
    }



    const onLoginError = (res) => {
        console.error(res)
    }



    return (
        <>
            <section className=' '>
                <div className="container main-container p-5 ">
                    <div className="">
                        <div className="col-12 d-flex p-3    center-container flex-column flex-md-row    ">
                            <div className="col-6">
                                <div className="row">
                                    <div className="left-section ">
                                        <div className="dialog-heading p-3  ">
                                            <h2>Use WhatsApp on Your Computer</h2>
                                        </div>
                                        <div className="dilaog-list">
                                            <ul>
                                                <li> open WhatsApp on your phone</li>
                                                <li>Tap Menu <span><MoreVertIcon sx={{ color: 'gray', background: ' lightGray', borderRadius: '5px' }} /></span> on Android ,or  <span>Settings  <AppSettingsAltIcon sx={{ color: 'gray' }} /></span> on iPhone</li>
                                                <li>Tap <span>Linked Devices</span> <span>Link a device</span></li>
                                                <li> Point your phone at this screen to capture the QR code</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row position-relative ">
                                    <div className="right-dialog text-center ">
                                        <img src="../images/QR-code.png" alt="" />
                                    </div>
                                    <div className=' google-section  ' >
                                        <GoogleLogin
                                            className="bg-dark"
                                            onSuccess={OnLoginSuccess}
                                            onError={onLoginError}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginDialogbox