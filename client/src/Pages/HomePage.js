import HomeNavBar from "../components/HomeNavBar";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Theme } from "../components/Theme";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { retrieveData } from "../components/DataStorage";
import Testcard from "../components/Testcard";
import Pagination from '@mui/material/Pagination';
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import SkillCardSkeleton from "../components/SkillCardSkeleton";

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
  const [loggedUserAvatar, setLoggedUserAvatar] = useState("");
  const token = retrieveData('token');
  const [page, setPage] = React.useState(1);
  const [numOfPages, setNumOfPages] = useState(10);
  const [skillPosts, setSkillPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayPagination, setDisplayPagination] = useState("flex");
  const [displayNoResultMessage, setDisplayNoResultMessage] = useState("none");

  const handlePaginationChange = (event, value) => {
    setLoading(true);
    setPage(value);
  };

  useEffect(() => {
    // Fetches the profile data
    axios.get(
      "./api/user/profile",
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(function (response) {
        // storeData('firstName', response.data["firstName"]);
        // storeData('lastName', response.data["lastName"]);
        // storeData('avatar', response.data["profilePic"]);
        setLoggedUserAvatar(response.data["profilePic"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])


  useEffect(() => {

    setTimeout(async () => {
      await fetchSkills();
    }, 1);

  }, [page, searchText]);

  let limit = 8;

  // function fetchSkills() {
  const fetchSkills = async () => {
    const token = localStorage.getItem('token');
    // Limit should be dynamic. For example, on large screens, there are 4 columns of
    // skills so, the limit should be multiples of 4. On medium screens, there are 3
    // columns of skills, so the limit should be in multiples of 3. Thus, the limit
    // should be a multiple of the number of columns that the Grid component has.
    let limit = 8;

    await axios.get(`/api/skills/?page=${page}&limit=${limit}&search=${searchText}`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((res) => {

        if (res.data["totalCount"] > limit) {
          setNumOfPages(Math.ceil(res.data["totalCount"] / limit));
          setDisplayPagination("flex");
        }
        else if (res.data["totalCount"] !== 0) {
          setDisplayPagination("none");
        }
        else {
          setDisplayPagination("none");
          setDisplayNoResultMessage("flex");
        }
        setSkillPosts(res.data["data"]);

        // setNumOfPages(1);
      })
      .catch((err) => {
        console.log(err);
      })

    setLoading(false);
  }

  const skillList = () => {
    let content = skillPosts.map((fetchedSkill, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Testcard
            // key={fetchedSkill._id}
            // skillid={fetchedSkill._id}
            // skillname={fetchedSkill.summary}
            // titlename={fetchedSkill.title}
            // skilldescription={fetchedSkill.description}
            // skillcity={fetchedSkill.city}
            // skillstate={fetchedSkill.state}
            // skillimage={fetchedSkill.imageURL}
            // skilluserid={fetchedSkill.userFullName}
            // skilluserdirectid={fetchedSkill.userId}

            skilldescription={fetchedSkill.summary}
            skillname={fetchedSkill.title}
            skilldescription={fetchedSkill.description}
            skillcity={fetchedSkill.city}
            skillstate={fetchedSkill.state}
            skillimage={fetchedSkill.imageURL}
            skilluserid={fetchedSkill.userFullName}
            skilluserdirectid={fetchedSkill.userId}
            // avatar={fetchedReview.price}
            skilluserpic={fetchedSkill.userProfilePic}
            skillprice={fetchedSkill.price}
          />
        </Grid>
      )
    })
    return (
      <Grid container rowSpacing={3} columnSpacing={5}>
        {content}
      </Grid>
    )
  }

  const skillListSkeleton = () => {

    let content = Array.from({ length: limit }, (() => 10)).map((index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <SkillCardSkeleton key={{ index }} />
        </Grid>
      );
    })

    return (
      <Grid container rowSpacing={3} columnSpacing={5}>
        {content}
      </Grid>
    )
  }

  const handleEnterKey = (textToSearch) => {
    setLoading(true);
    setPage(1);
    setSearchText(textToSearch);
    setDisplayNoResultMessage("none");
  }

  // Seating it to "" triggers a blank search
  // (use to reset the search page)
  const handleResetSearch = () => {
    setLoading(true);
    setSearchText("");
    setDisplayNoResultMessage("none");
  }

  return (
    <div>
      <HomeNavBar
        loggedUserAvatar={loggedUserAvatar}
        onKeyDown={(textToSearch) => { handleEnterKey(textToSearch) }}
        onClick={() => { handleResetSearch() }}
      />
      <Grid container sx={{
        alignItems: "center",
        height: "60px",
        backgroundColor: Theme.palette.primary.light,
        display: { sx: "block", sm: "none" }
      }}>
        <Grid item xs sx={{ marginLeft: "20px", marginRight: "20px" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a skill to learn..."
              inputProps={{ 'aria-label': 'search' }}
              style={{ width: "90%", marginLeft: 40 }}
            />
          </Search>
        </Grid>
      </Grid>

      {/*This box is just an spacer*/}
      <Box sx={{ marginTop: 2 }} />

      {/******************************** Skill Poss ************************************************
      {/*When loading is true, the Skeletons are displayed, otherwise the skillList are displayed.*/}

      <Typography variant="h4" sx={{ display: displayNoResultMessage, justifyContent: "center" }}>
        No Skills Found For Your Search
      </Typography>
      <Typography variant="h6" sx={{ display: displayNoResultMessage, justifyContent: "center" }}>
        Try a new search.
      </Typography>

      {loading && skillListSkeleton()}
      {!loading && skillList()}

      {/******************************** Pagination *************************************************/}
      <Box sx={{ marginTop: 5, display: displayPagination, justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination count={numOfPages} page={page} size="large" onChange={handlePaginationChange} />
        </Stack>
      </Box>

    </div>
  );
};

export default HomePage;