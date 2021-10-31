import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo1WhiteTransparent from '../logo1WhiteTransparent.png'
import {InputBase} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import testUserAvatar from '../testUserAvatar.jpg';
import {styled, alpha} from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountMenu from "./AccountMenu";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit", "& .MuiInputBase-input": {
    padding: theme.spacing(1, 10, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

export default function HomeNavBar() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>

            {/* Logo */}
            <RouterLink to="/" >
              <img src={logo1WhiteTransparent} alt="Logo"/>
            </RouterLink>

            {/*Search Box*/}
            <Search sx={{marginLeft:"16px"}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
              />
            </Search>

            {/* Temporary button: */}
            <Button variant="outlined" color="warning" component={RouterLink} to="/">Back to Landing Page</Button>

            {/*Avatar (Do not remove the box below)*/}
            <Box sx={{flexGrow: 1}}/>
            <AccountMenu/>

          </Toolbar>
        </AppBar>
      </Box>
  );
}