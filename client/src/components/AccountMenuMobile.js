import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import {Link as RouterLink} from "react-router-dom";
import {logoutUser} from "./Logout";
import ProfileIcon from '@mui/icons-material/AccountBox';
import Button from "@mui/material/Button";
import KeyIcon from '@mui/icons-material/VpnKey';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function AccountMenuMobile(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function displayBackToHomePageButtonIfNeeded() {
    if (!window.location.href.toLowerCase().includes("home")) {
      return (
        <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'right', justifyContent: 'right', height: '100%'}}>
          <Button
            variant="text"
            color="secondary"
            sx={{whiteSpace: 'nowrap', overflow: "e"}}
            component={RouterLink} to="/home">
            Back to Search
          </Button>
        </Box>
      )
    } else {
      return (<></>);
    }
  }

  return (
    <React.Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: "right", justifyContent: "right", height: "100%"}}>
        {displayBackToHomePageButtonIfNeeded()}
        <IconButton onClick={handleClick} size="small" sx={{marginLeft: 2}}>
          <Avatar alt="User Avatar" src={props.loggedUserAvatar}/>
        </IconButton>
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
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem component={RouterLink} to="/profile">
          <ListItemIcon>
            <ProfileIcon fontSize="medium"/>
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FolderSharedOutlinedIcon fontSize="medium"/>
          </ListItemIcon>
          My account
        </MenuItem>
        <Divider/>

        <MenuItem component={RouterLink} to="/change">
          <ListItemIcon>
            <KeyIcon/>
          </ListItemIcon>
          Change Password
        </MenuItem>

        <MenuItem component={RouterLink} to="/skillpage">
          <ListItemIcon>
            <ConstructionOutlinedIcon/>
          </ListItemIcon> My Skills
        </MenuItem>

        <MenuItem component={RouterLink} to="/BuyCredits">
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          My Skill Credits
        </MenuItem>

        <MenuItem onClick={() => logoutUser()}>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
