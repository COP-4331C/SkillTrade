import React, {useEffect, useState} from 'react';
import HomeNavBar from "../components/HomeNavBar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EditProfileModal from "../components/EditProfileModal";
import styled from "@emotion/styled";


function ProfilePage(props) {

  return (
    <div>
      <HomeNavBar/>
      <Grid>
          <Paper elevation={3} style={{padding: 10, width: "50vw", height: "50vh", margin: '20px auto', overflow: "hidden"}}>

            {/* <EditProfileModal> must be inside the main paper container*/}
            <EditProfileModal />

            <h1>Profile Page</h1>
            <h3>Coming Soon</h3>
          </Paper>
      </Grid>
    </div>
  );
}

export default ProfilePage;