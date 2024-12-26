

import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import BlockIcon from '@mui/icons-material/Block';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';

import { AccountContext } from '../../context/AccountProvider';

function ChatBarMenu({ logout }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { setIsChatOpen } = useContext(AccountContext)

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };





    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
        handleClose();
    };
    return (
        <>
            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                    <Tooltip title="close chat">
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
                    }} onClick={handleCloseChat}>
                        <BlockIcon sx={{ marginRight: '10px' }} />  Close Chat
                    </MenuItem>

                </Menu>
            </React.Fragment>
        </>
    )
}

export default ChatBarMenu