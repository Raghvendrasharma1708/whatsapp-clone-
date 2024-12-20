import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout'
import { AccountContext } from '../../context/AccountProvider';

function HeaderMenu({ logout }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [isTrue, setIstrue] = useState("Dark Mode")
    const { setModes, socket, accounts, checked, setChecked } = useContext(AccountContext)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };




    const handleChange = () => {

       

        if (checked) {
            setChecked(false)
        }
        // const newMode = checked ? "light Mode" : "Dark Mode";
        // setIstrue(newMode);
        // setModes(newMode);
        // setChecked(!checked);
    };



    // useEffect(() => {
    //     document.documentElement.setAttribute('data-theme', isTrue === 'Light Mode' ? 'light' : 'dark');
    // }, [isTrue, setModes]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        if (socket.current) {
            socket.current.emit('logout', accounts.sub)
        }
        logout();
    }
    return (
        <>
            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                    <Tooltip title="Menu">
                        <IconButton
                            onClick={handleClick}
                            size="small"

                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <MoreVertIcon className='sidebar-icons' />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            backgroundColor: '#222e35',

                            color: 'rgb(203, 201, 201)',
                            boxShadow: '0px 0px 10px -6px gray',

                            mt: 1.5,
                            '& .MuiAvatar-root': {

                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: '#222e35',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >

                    <MenuItem sx={{
                        paddingBottom: '10px', '&:hover': {
                            backgroundColor: '#111b21', // Change background color on hover

                        },
                    }} onClick={handleClose}>
                        New Community
                    </MenuItem>
                    <MenuItem sx={{
                        paddingBottom: '10px', '&:hover': {
                            backgroundColor: '#111b21', // Change background color on hover

                        },
                    }} onClick={handleClose}>
                        Starred messages
                    </MenuItem>
                    <MenuItem sx={{
                        paddingBottom: '10px', '&:hover': {
                            backgroundColor: '#111b21', // Change background color on hover

                        },
                    }} onClick={handleClose}>
                        Select chats
                    </MenuItem>
                    <MenuItem sx={{
                        paddingBottom: '10px', '&:hover': {
                            backgroundColor: '#111b21', // Change background color on hover

                        },
                    }} onClick={handleClose}>
                        Settings
                    </MenuItem>
                    <MenuItem sx={{
                        paddingBottom: '10px', '&:hover': {
                            backgroundColor: '#111b21', // Change background color on hover

                        },
                    }} onClick={handleChange} >
                        Dark Mode
                    </MenuItem>
                    <MenuItem sx={{
                        paddingBottom: '10px', '&:hover': {
                            backgroundColor: '#111b21', // Change background color on hover

                        },
                    }} onClick={handleLogout}>
                        Log out
                    </MenuItem>
                    <Divider />
                    <MenuItem sx={{
                        paddingBottom: '10px', '&:hover': {
                            backgroundColor: '#111b21', // Change background color on hover

                        },
                    }} onClick={handleClose}>

                        Get Whatsapp for Windows
                    </MenuItem>


                </Menu>
            </React.Fragment>
        </>
    )
}

export default HeaderMenu