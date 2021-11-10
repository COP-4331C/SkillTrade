// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
// import {Stack} from "@mui/material";
// import { Link as RouterLink } from 'react-router-dom';
// import MainLogo from "./MainLogo";
// import LoginModal from "./LoginModal";

// export default function AppNavBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           <Box sx={{flexGrow: 1, textAlign: "left"}}>
//             <MainLogo/>
//           </Box>
//           <Stack spacing={4} direction="row">
//             <LoginModal />
//             <Button
//               variant="contained"
//               size="small"
//               color="secondary"
//               component={RouterLink}
//               to="/Registration"
//               sx={{whiteSpace: 'nowrap'}}
//             >
//               Sign up for free</Button>

//             {/* //This is just for test, TEMPORARY// */}
//               <Button
//               variant="contained"
//               size="small"
//               color="secondary"
//               component={RouterLink}
//               to="/Profile"
//               sx={{whiteSpace: 'nowrap'}}
//             >
//               Edit Profile</Button>

//               <Button
//               variant="contained"
//               size="small"
//               color="secondary"
//               component={RouterLink}
//               to="/card"
//               sx={{whiteSpace: 'nowrap'}}
//             >
//               CardTest</Button>

//             {/* //This is just for test, TEMPORARY// */}
//           </Stack>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import MainLogo from "./MainLogo";
import {Stack} from "@mui/material";
import LoginModal from "./LoginModal";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import LoginModalMobile from "./LoginModalMobile";
import Login from './Login';
import Testcard from './Testcard';

export default function AppNavBar() {
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = (e) => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(e);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

<MenuItem component={RouterLink} to="/Registration">

        <IconButton
          size="large"
          aria-label="create account mobile"
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <p>Create Account</p>

      </MenuItem>
      <MenuItem component={RouterLink} to="/Login">
        <IconButton
          size="large"
          aria-label="login account mobile"
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <p>Login</p>
      </MenuItem>
      {/*************** Register  **************/}
      
    </Menu>
  );

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <MainLogo/>
          <Box sx={{flexGrow: 1}}/>
          <Box sx={{display: {xs: 'none', sm: 'flex', md: 'flex'}}}>
          
            <Stack spacing={4} direction="row">

            <Button
                variant="contained"
                size="small"
                color="secondary"
                component={RouterLink}
                to="/Registration"
                sx={{whiteSpace: 'nowrap'}}
              >
                Sign up for free
              </Button>

            <Button
                variant="contained"
                size="small"
                color="secondary"
                component={RouterLink}
                to="/Login"
                sx={{whiteSpace: 'nowrap'}}
              >
                login
              </Button>

              <Button
                variant="contained"
                size="small"
                color="secondary"
                component={RouterLink}
                to="/profile"
                sx={{whiteSpace: 'nowrap'}}
              >
                Profile
              </Button>

              <Button
                variant="contained"
                size="small"
                color="secondary"
                component={RouterLink}
                to="/card"
                sx={{whiteSpace: 'nowrap'}}
              >
                card
              </Button>

              <Button
                variant="contained"
                size="small"
                color="secondary"
                component={RouterLink}
                to="/card2"
                sx={{whiteSpace: 'nowrap'}}
              >
                card2
              </Button>
              

              

            </Stack>

          </Box>
          {/*<Box sx={{display: {xs: 'flex', md: 'none'}}}>*/}
          <Box sx={{display: {xs: 'flex', sm: 'none'}}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/*{renderMenu}*/}
    </Box>
  );
}
