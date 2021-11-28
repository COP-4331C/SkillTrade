import HomeNavBar from "../components/HomeNavBar";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {Theme} from "../components/Theme";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import axios from "axios";
import {retrieveData} from "../components/DataStorage";
import Testcard from "../components/Testcard";
import Pagination from '@mui/material/Pagination';
import {FormHelperText, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";

// TODO: Check if the user is logged in, if not, then redirect user to login or landing page.

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
  const [page, setPage] = React.useState(1);
  const [numOfPages, setNumOfPages] = useState(10);


  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect( () => {

    // Fetches the profile data
    // axios.get(
    //   "./api/user/profile",
    //   {headers: { Authorization: `Bearer ${token}` }}
    //   )
    //   .then(function(response) {
    //     // storeData('firstName', response.data["firstName"]);
    //     // storeData('lastName', response.data["lastName"]);
    //     // storeData('avatar', response.data["profilePic"]);
    //     setLoggedUserAvatar(response.data["profilePic"]);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    fetchSkills();

  },[page]);

  const [skillPosts, setSkillPosts] = useState([]);

  function fetchSkills() {
    const token = localStorage.getItem('token');

    let search = "";
    let limit = 8;

    axios.get(`/api/skills/?page=${page}&search=${search}&limit=${limit}`,
      {headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((res) => {
        setSkillPosts(res.data["data"]);

        setNumOfPages( Math.ceil(res.data["totalCount"] / limit));
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const skillList = () => {
    let content = skillPosts.map((fetchedSkill, index) => {
      return (

        <Grid item xs={12} sm={6} md={4} lg={3}  key={index}>
          <Testcard
            key={fetchedSkill._id}
            skillid={fetchedSkill._id}
            skilldescription = {fetchedSkill.summary}
            skillname = {fetchedSkill.title}
            skilldescription = {fetchedSkill.description}
            skillcity = {fetchedSkill.city}
            skillstate = {fetchedSkill.state}
            skillimage = {fetchedSkill.imageURL}
            skilluserid = {fetchedSkill.userFullName}
            skilluserdirectid = {fetchedSkill.userId}
            // avatar={fetchedReview.price}
            skilluserpic = {fetchedSkill.userProfilePic}
            skillprice = {fetchedSkill.price}
          />
        </Grid>
      )
    })
    return (
      <Grid container rowSpacing={3} columnSpacing={5}>
        { content }
      </Grid>
    )
  }


  return (
    <div>
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
              // onChange={() => alert("Hello")}
            />
          </Search>
        </Grid>
      </Grid>
      <Box sx={{marginTop: 2}}/>

      {skillList()}

      <Box sx={{marginTop: 5, display:"flex", justifyContent:"center"}}>
        <Stack spacing={2}>
          <Pagination count={numOfPages} page={page} size="large" onChange={handlePaginationChange} />
        </Stack>
      </Box>

    </div>
  );
};

export default HomePage;