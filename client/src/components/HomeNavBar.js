import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {InputBase} from "@mui/material";
import {styled, alpha} from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountMenu from "./AccountMenu";
import MainLogo from "./MainLogo";


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
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch"
    }
  }
}));

export default function HomeNavBar() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" >
          <Toolbar sx={{justifyContent:"space-between"}}>

            {/* Show Main Logo */}
            <Box sx={{marginRight: "5vh"}}>
              <MainLogo/>
            </Box>
            {/*Search Box*/}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search for a skill to learn…" inputProps={{ "aria-label": "search" }}/>
              </Search>

            {/*Avatar with Account Menu */}
            <AccountMenu/>

          </Toolbar>
        </AppBar>
      </Box>
  );
}