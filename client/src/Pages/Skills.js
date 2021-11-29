import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import HomeNavBar from "../components/HomeNavBar";
import Testcard from '../components/Testcard';
import axios from "axios";
import { Paper, Typography } from '@mui/material';
import { Theme } from '../components/Theme';
import Addskills from '../components/Addskills';
// import { Typography } from '@mui/material';
//added props
export default function Skills(props) {

  const [skillposts, setSkillPosts]=useState([]);

  function fetchSkills(){
    const token = localStorage.getItem('token');
    const userId="";
    axios.get(`/api/skills/user/${!userId ? "" : userId}`, {
        headers: { 'Authorization': `Bearer ${token}`}
    })
    .then((res) => {
      setSkillPosts(res.data); 
      console.log(res.data);
    })
    .catch((err) => {
      console.log("error");
    })
  }

  useEffect(() => {
    try {

      fetchSkills();
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  const skilllist = () => {
    let content = skillposts.map((fetchedskill, index) => {
      return(
        <Grid item xs={3} key={index}>
          <Testcard
            key={fetchedskill._id}
            skillid={fetchedskill._id}
            skilldescription = {fetchedskill.summary}
            skillname = {fetchedskill.title}
            // skilldescription = {fetchedskill.description}
            skillcity = {fetchedskill.city}
            skillstate = {fetchedskill.state}
            skillimage = {fetchedskill.imageURL}
            skilluserid = {fetchedskill.userFullName}
            skilluserdirectid = {fetchedskill.userId}
            // avatar={fetchedReview.authorProfilePic}
            skillprice = {fetchedskill.price}
            skilluserpic = {fetchedskill.userProfilePic}
            //add more
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
    <Box sx={{flex: 1}}>
      <HomeNavBar/>

      <Grid container justifyContent="center">
        
          <h1> All Skills </h1>
        
      </Grid>

      <Grid container justifyContent="center">
        <Addskills/>
      </Grid>
      <Grid container>
      <Paper 
            // variant="outlined" 
            square 
            style={{backgroundColor: Theme.palette.primary.main, position: "relative", width:"100vw", borderWidth:"0px"}}
            sx={{ p: 10, mt:5 }}
            >
        {skilllist()}
      </Paper>
      </Grid>
      
    </Box>
  );
}
