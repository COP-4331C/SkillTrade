import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import MainLogo from "./MainLogo";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import RegisterIcon from '@mui/icons-material/AssignmentOutlined';
import {Theme} from "./Theme";

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

      {/*************** Login  **************/}
      <MenuItem component={RouterLink} to="/Login">

        <IconButton
          size="large"
          aria-label="login account mobile"
          color="inherit"
        >
          <LoginIcon/>
        </IconButton>
        <p>Login</p>

      </MenuItem>

      {/*************** Register  **************/}
      <MenuItem component={RouterLink} to="/Registration">

        <IconButton
          size="large"
          aria-label="create account mobile"
          color="inherit"
        >
          <RegisterIcon/>
        </IconButton>
        <p>Create Account</p>

      </MenuItem>

    </Menu>
  );

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: Theme.palette.primary.dark}}>
          <MainLogo/>
          <Box sx={{flexGrow: 1}}/>
          <Box sx={{display: {xs: 'none', sm: 'flex', md: 'flex'}}}>

            <Stack spacing={4} direction="row">

              <Button
                variant="outlined"
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
                to="/Resetpassword"
                sx={{whiteSpace: 'nowrap'}}
              >
                ResetPage
              </Button>

            </Stack>

          </Box>

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
    </Box>
  );
}
