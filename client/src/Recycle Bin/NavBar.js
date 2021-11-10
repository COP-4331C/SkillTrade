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
import MainLogo from "../components/MainLogo";
import {Stack} from "@mui/material";
import LoginModal from "./LoginModal";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import LoginModalMobile from "./LoginModalMobile";
import Login from '../components/Login';

// const Search = styled('div')(({theme}) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({theme}) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({theme}) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

export default function NavBar() {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const menuId = 'primary-search-account-menu';
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     {/*<MenuItem onClick={handleMenuClose}>Profile</MenuItem>*/}
  //     {/*<MenuItem onClick={handleMenuClose}>My account</MenuItem>*/}
  //     <MenuItem onClick={handleMenuClose}>Sign in</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>Create Account</MenuItem>
  //   </Menu>
  // );

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
      {/******************************* Mobile Menu ********************************/}

      {/* ************** Sign in  ************* */}
      {/* <MenuItem onClick={handleMobileMenuClose}>
        {/*<IconButton size="large" aria-label="show 4 new mails" color="inherit">*/}
        {/*  <Badge badgeContent={4} color="error">*/}
        {/*    <MailIcon/>*/}
        {/*  </Badge>*/}
        {/*</IconButton>*/}
        {/*<p>Messages</p>*/}

        {/*<IconButton size="large" aria-label="show 4 new mails" color="inherit">*/}
        {/*  <LoginIcon/>*/}
        {/*</IconButton>*/}
        {/*<p>Sign in</p>*/}
        <Login/>
      {/* </MenuItem> */}

      <MenuItem component={RouterLink} to="/Login">
        <IconButton
          size="large"
          aria-label="create account mobile"
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <p>Login</p>
      </MenuItem>
      {/*************** Register  **************/}
      <MenuItem component={RouterLink} to="/Registration">

        {/*<IconButton*/}
        {/*  size="large"*/}
        {/*  aria-label="show 17 new notifications"*/}
        {/*  color="inherit"*/}
        {/*>*/}
        {/*  <Badge badgeContent={17} color="error">*/}
        {/*    <NotificationsIcon/>*/}
        {/*  </Badge>*/}
        {/*</IconButton>*/}
        {/*<p>Notifications</p>*/}

        <IconButton
          size="large"
          aria-label="create account mobile"
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <p>Create Account</p>

      </MenuItem>

      {/*<MenuItem onClick={handleProfileMenuOpen}>*/}
      {/*  <IconButton*/}
      {/*    size="large"*/}
      {/*    aria-label="account of current user"*/}
      {/*    aria-controls="primary-search-account-menu"*/}
      {/*    aria-haspopup="true"*/}
      {/*    color="inherit"*/}
      {/*  >*/}
      {/*    <AccountCircle/>*/}
      {/*  </IconButton>*/}
      {/*  <p>Profile</p>*/}
      {/*</MenuItem>*/}

    </Menu>
  );

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          {/*<IconButton*/}
          {/*  size="large"*/}
          {/*  edge="start"*/}
          {/*  color="inherit"*/}
          {/*  aria-label="open drawer"*/}
          {/*  sx={{mr: 2}}*/}
          {/*>*/}
          {/*<MenuIcon/>*/}
          {/*</IconButton>*/}
          <MainLogo/>
          {/*<Typography*/}
          {/*  variant="h6"*/}
          {/*  noWrap*/}
          {/*  component="div"*/}
          {/*  sx={{display: {xs: 'none', sm: 'block'}}}*/}
          {/*>*/}
          {/*  MUI*/}
          {/*</Typography>*/}
          {/*<Search>*/}
          {/*  <SearchIconWrapper>*/}
          {/*    <SearchIcon/>*/}
          {/*  </SearchIconWrapper>*/}
          {/*  <StyledInputBase*/}
          {/*    placeholder="Search…"*/}
          {/*    inputProps={{'aria-label': 'search'}}*/}
          {/*  />*/}
          {/*</Search>*/}
          <Box sx={{flexGrow: 1}}/>
          {/*<Box sx={{display: {xs: 'none', md: 'flex'}}}>*/}
          <Box sx={{display: {xs: 'none', sm: 'flex', md: 'flex'}}}>
            {/*<IconButton size="large" aria-label="show 4 new mails" color="inherit">*/}
            {/*  <Badge badgeContent={4} color="error">*/}
            {/*    <MailIcon/>*/}
            {/*  </Badge>*/}
            {/*</IconButton>*/}
            {/*<IconButton*/}
            {/*  size="large"*/}
            {/*  aria-label="show 17 new notifications"*/}
            {/*  color="inherit"*/}
            {/*>*/}
            {/*  <Badge badgeContent={17} color="error">*/}
            {/*    <NotificationsIcon/>*/}
            {/*  </Badge>*/}
            {/*</IconButton>*/}
            {/*<IconButton*/}
            {/*  size="large"*/}
            {/*  edge="end"*/}
            {/*  aria-label="account of current user"*/}
            {/*  aria-controls={menuId}*/}
            {/*  aria-haspopup="true"*/}
            {/*  onClick={handleProfileMenuOpen}*/}
            {/*  color="inherit"*/}
            {/*>*/}
            {/*  <AccountCircle/>*/}
            {/*</IconButton>*/}
            <Stack spacing={4} direction="row">

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
              {/* <Button
                variant="contained"
                size="small"
                color="secondary"
                component={RouterLink}
                to="/Registration"
                sx={{whiteSpace: 'nowrap'}}
              >
                Sign up for free
              </Button> */}

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
