import HomeNavBar from "../components/HomeNavBar";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {Theme} from "../components/Theme";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import axios from "axios";
import {retrieveData, storeData} from "../components/DataStorage";

// TODO: Check if the user is login, if not, then redirect user to login or landing page.

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.80),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  // marginLeft: theme.spacing(2),
  // marginRight: 20,
  marginX: "10px",
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
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
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    }
  },

}));

const HomePage = () => {
  const[loggedUserAvatar, setLoggedUserAvatar] = useState("");

  const token = retrieveData('token');
  const URL = "./api/user/profile";
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect( () => {

    // Fetches the profile data
    axios.get(URL, config)
      .then(function(response) {
        // storeData('firstName', response.data["firstName"]);
        // storeData('lastName', response.data["lastName"]);
        // storeData('avatar', response.data["profilePic"]);
        setLoggedUserAvatar(response.data["profilePic"]);
      })
      .catch(function (error) {
        console.log(error);
      });

  },[]);


  return (
    <>
      <HomeNavBar loggedUserAvatar={loggedUserAvatar}/>
      <Grid container sx={{alignItems:"center", height:"60px", backgroundColor: Theme.palette.primary.light, display: {sx:"block", sm:"none"}}}>
        <Grid item xs sx={{marginLeft:"20px", marginRight:"20px"}}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a skill to learn..."
              inputProps={{ 'aria-label': 'search' }}
              style={{width:"90%", marginLeft: 40}}
            />
          </Search>
        </Grid>
      </Grid>

      <h1>Home Page</h1>
      <h3>Coming soon</h3>

      {/* Temporary button: goes back out to the Landing Page */}
      <Button variant="contained" color="secondary" size="large" component={RouterLink} to="/">Back to Landing
        Page</Button>
    </>
  );
};

export default HomePage;