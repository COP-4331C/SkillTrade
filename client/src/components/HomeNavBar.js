import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MainLogo from "./MainLogo";
import AccountMenuMobile from "./AccountMenuMobile";
import {Search} from "@mui/icons-material";
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Grid from "@mui/material/Grid";

export default function HomeNavBar() {

  const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 20,
    // marginX: "10px",
    // width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '40ch',
      },
    },
  }));


  // Avoid displaying the search bar in the Profile Page
  function displaySearchBarIfNeeded () {

    // If the user is in the profile Page, send an empty <></> instead of the search bar.
    if (window.location.href.toLowerCase().includes("profile")) {
      return (<></>);
    }
    else {
        // Return the search bar to be displayed.
       return(
        <Search>
          <SearchIconWrapper>
            <SearchIcon/>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for skills to learn..."
            inputProps={{'aria-label': 'search'}}
          />
        </Search>
      );
    }
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={2}>

            {/** ************************** Logo ***************************************/}
            <Grid item xs={6} sm={3} md={3} sx={{textAlign:"left"}}>
              <MainLogo/>
            </Grid>

            {/** ******************** Search field ***************************************/}
            <Grid item xs={6} sx={{alignItems:"center", justifyContent:"center", display:{xs:"none", sm:"flex", md:"flex"}}}>
              {displaySearchBarIfNeeded()}
            </Grid>

            {/** ************************** Avatar and My Skills ***************************************/}
            <Grid item xs={6} sm={3} md={3} sx={{justifyContent:"right"}}>
                <AccountMenuMobile/>
            </Grid>
            
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
