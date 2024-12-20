import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Webcam from 'react-webcam';
import { IconButton } from '@mui/material';
import { uploadFile } from '../../../service/api.js';

function PersonalChatMenu({ file, setFile, text, setText }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const webcamRef = useRef(null);

    const open = Boolean(anchorEl);


    useEffect(() => {
        const setImages = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);
                console.log(data)
                await uploadFile(data)
            }
            return setImages();
        }
    }, [file, setFile])


    // file function code 

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(e.target.files[0])
        console.log(selectedFile)
        if (selectedFile) {
            setFile(selectedFile);
            setText(selectedFile.name);
        }
    };




    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };



    const handleClose = () => {
        setAnchorEl(null);
    };



    const handleDialogOpen = () => {
        setOpenDialog(true);
        handleClose();
    };



    const handleDialogClose = () => {
        setOpenDialog(false);
    };



    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    }, [webcamRef]);

    const Recapture = () => {
        setCapturedImage('')
    }


    // 
    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                marginTop: '-19px'
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: "10%",
            border: '0px',
            outline: 'none',
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                "white  ",


            backgroundColor: "#233138",

            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 25,

                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
                '&:hover': {
                    backgroundColor: alpha(
                        "#111b21"
                    ),
                },
            },
        },
    }));
    return (
        <div>
            <IconButton

                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}

            >
                <AddIcon className='sidebar-icons' />
            </IconButton>
            <StyledMenu
                className="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem sx={{ paddingBottom: '15px' }} disableRipple>
                    <label htmlFor='fileinput' >
                        <InsertDriveFileIcon sx={{ color: '#7f66ff' }} className='menu-icons' />
                        Document
                    </label>
                    <input type='file'
                        id='fileinput'
                        onChange={onFileChange}
                        style={{ display: 'none' }}

                    />



                </MenuItem>
                <MenuItem sx={{ paddingBottom: '15px' }} onClick={handleClose} disableRipple>
                    <PermMediaIcon sx={{ color: '#007bfc' }} className='menu-icons' />
                    Photos & videos
                </MenuItem>
                <MenuItem sx={{ paddingBottom: '15px' }} onClick={handleDialogOpen} disableRipple>
                    <AddAPhotoIcon sx={{ color: '#ff2e74' }} className='menu-icons' />
                    Camera
                </MenuItem>
                <MenuItem sx={{ paddingBottom: '15px' }} onClick={handleClose} disableRipple>
                    <PersonIcon sx={{ color: '#009de2' }} classname='menu-icons' />
                    Contact
                </MenuItem>



            </StyledMenu>

            <Dialog sx={{ padding: '1px' }} open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>

                <div className='text-white d-flex  align-items-center justify-content-between p-1 ' style={{ background: '#222e35' }}>
                    <DialogTitle sx={{ backgroundColor: '#222e35' }}>Take a Photo</DialogTitle>
                    <div style={{ cursor: 'pointer' }} onClick={handleDialogClose} >
                        <CloseIcon />
                    </div>
                </div>


                <DialogContent sx={{ backgroundColor: '#222e35', padding: '1px', Width: '473px' }}>
                    {!capturedImage ? (<>
                        <div className=' shadow-lg'>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                height={300}
                                width="100%"
                                className='rounded'

                            />
                        </div>

                    </>) : (<>

                    </>)}
                    {capturedImage && (
                        <div className='d-flex flex-column align-items-center'>
                            <h4 className='text-white'>Captured Image:</h4>
                            <img className='rounded' src={capturedImage} alt="Captured" style={{ width: '400px', height: "300px" }} />
                        </div>
                    )}
                </DialogContent>
                <DialogActions sx={{ display: 'flex ', justifyContent: 'center', backgroundColor: '#222e35' }}>

                    <div className='d-flex   justify-content-left'>
                        <div className='click-image' onClick={capture} >
                            {!capturedImage && (<CameraEnhanceIcon sx={{ color: '#005c4b', fontSize: '34px', cursor: 'pointer' }} />)}
                        </div>
                        <div className='click-image' onClick={Recapture} >
                            {capturedImage && (<AutorenewIcon sx={{ color: '#005c4b', fontSize: '34px', cursor: 'pointer' }} />)}
                        </div>

                    </div>

                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PersonalChatMenu