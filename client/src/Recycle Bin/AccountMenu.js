import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import testUserAvatar from "../images/avatars/testUserAvatar.jpg";
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import {Link as RouterLink} from "react-router-dom";
import {logoutUser} from "../components/Logout";

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography color="secondary" sx={{ minWidth: 100 }}>My Skills</Typography>
                 {/*<Typography sx={{ minWidth: 100 }}>Credit Hours</Typography>*/}
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar alt="Remy Sharp" src={testUserAvatar} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={RouterLink} to="/profile">
                    <Avatar alt="Remy Sharp" src={testUserAvatar}/> Profile
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <FolderSharedOutlinedIcon fontSize="medium"/>
                    </ListItemIcon>
                    My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <ConstructionOutlinedIcon />
                    </ListItemIcon>
                    My Skills
                </MenuItem>
                <MenuItem onClick={() => logoutUser()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
