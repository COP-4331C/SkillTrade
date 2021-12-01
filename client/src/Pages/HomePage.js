import HomeNavBar from "../components/HomeNavBar";
import * as React from "react";
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
import SearchBar from "../components/SearchBar";
import { v4 as uniqueIdv4 } from 'uuid';

// TODO: Check if the user is logged in, if not, then redirect user to login or landing page.

const HomePage = () => {
  const [loggedUserAvatar, setLoggedUserAvatar] = useState("");
  const [loggedUserId, setLoggedUserId] = useState("");
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
      "/api/user/profile",
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(function (response) {
        setLoggedUserAvatar(response.data["profilePic"]);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Fetches the logged user's Id
    axios.get(
      "api/user/id",
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(function (response) {
        setLoggedUserId(response.data["userId"]);
      })
      .catch(console.log)

  }, [])


  useEffect(() => {

    setTimeout(async () => {
      await fetchSkills();
    }, 1);

  }, [page, searchText]);

  let limit = 8;

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

        if (res.data["totalCount"] > limit) {         // Case when skill total count is greater than 8
          setNumOfPages(Math.ceil(res.data["totalCount"] / limit));
          setDisplayPagination("flex");
        } else if (res.data["totalCount"] !== 0) {    // Case when skill total count is 1 to 8
          setDisplayPagination("none");
        } else {                                      // Case when skill total count is 0
          setDisplayPagination("none");
          setDisplayNoResultMessage("flex");
        }
        setSkillPosts(res.data["data"]);

      })
      .catch((err) => {
        console.log(err);
      })

    setLoading(false);
  }

  const skillList = () => {
    let content = skillPosts.map((fetchedSkill, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={uniqueIdv4()}>
          <Testcard
            key={fetchedSkill._id}
            skillid={fetchedSkill._id}
            skilldescription={fetchedSkill.summary}
            skillname={fetchedSkill.title}
            skillcity={fetchedSkill.city}
            skillstate={fetchedSkill.state}
            skillimage={fetchedSkill.imageURL}
            skilluserid={fetchedSkill.userFullName}
            skilluserdirectid={fetchedSkill.userId}
            skilluserpic={fetchedSkill.userProfilePic}
            skillprice={fetchedSkill.price}
            skillcountry={fetchedSkill.country}
            skillEditable={false}
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

    let content = Array.from({ length: limit }, (() => 10)).map(() => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={uniqueIdv4()}>
          <SkillCardSkeleton />
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
    if (searchText === "") {
      setSearchText(" ");
    } else {
      setSearchText("")
    }
    setLoading(true);
    setDisplayNoResultMessage("none");
  }

  return (
    <div>
      {/******************************** Home Navigation Bar ********************************************/}
      <HomeNavBar
        loggedUserAvatar={loggedUserAvatar}
        loggedUserId={loggedUserId}
        onKeyDown={(textToSearch) => { handleEnterKey(textToSearch) }}
        onClick={() => { handleResetSearch() }}
      />

      {/******************************** Search Bar MOBILE VERSION ***************************************/}
      <Grid container sx={{
        alignItems: "center",
        height: "60px",
        backgroundColor: Theme.palette.primary.light,
        display: { sx: "block", sm: "none" }
      }}>
        <Grid item xs sx={{ marginLeft: "20px", marginRight: "20px" }}>
          <SearchBar
            onKeyDown={(textToSearch) => {
              handleEnterKey(textToSearch)
            }}
            onClick={() => {
              handleResetSearch()
            }}
            xs="flex"
            sm="none"
            md="none"
            bgColor={0.80}
            bgColorHover={1}
            searchBarColumns={12}
            xIconColor="primary"
          />
        </Grid>
      </Grid>

      {/*This Box is just an spacer*/}
      <Box sx={{ marginTop: 2 }} />

      {/************************* No Results messages ***********************************************/}
      <Typography variant="h4" sx={{ display: displayNoResultMessage, justifyContent: "center" }}>
        No Matches Found
      </Typography>
      <Typography variant="h6" sx={{ display: displayNoResultMessage, justifyContent: "center" }}>
        Try a new search.
      </Typography>


      {/******************************** Skill Posts *************************************************/}
      {/*When loading is true, the Skeletons are displayed, otherwise the skillList are displayed.*/}
      <Grid container sx={{ marginLeft: "5" }}>
        {loading && skillListSkeleton()}
        {!loading && skillList()}
      </Grid>



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