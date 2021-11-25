import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'
import Box from "@mui/material/Box";
import HomeNavBar from "../components/HomeNavBar";
import Testcard from '../components/Testcard';
import axios from "axios";
import Addskills from '../components/Addskills';
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
            skillname = {fetchedskill.summary}
            titlename = {fetchedskill.title}
            skilldescription = {fetchedskill.description}
            skillcity = {fetchedskill.city}
            skillstate = {fetchedskill.state}
            skillimage = {fetchedskill.imageURL}
            //add more
          />
        </Grid>
      )
    })
    return (
      <Grid container rowSpacing={3}>
        { content }
      </Grid>
    )
  }

  return (
    <Box sx={{flex: 1}}>
      <HomeNavBar/>

      <Grid container>
        <Addskills/>
      </Grid>
      
      {skilllist()}
    </Box>
  );
}
