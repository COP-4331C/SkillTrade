import AppNavBar from "../components/AppNavBar";
import React from "react";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import {Stack} from "@mui/material";


const LandingPage = () => {
  return (
    <div>
      <AppNavBar/>
      <h1>Landing Page</h1>
      <h3>Coming soon</h3>


      <Stack spacing={2} alignItems="center">

        {/** Temporary SKIP Login Button **/}
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink} to="/Home"
          sx={{ width: "auto", whiteSpace: 'nowrap'}}
        >
          Skip Login
        </Button>
        {/** End of Temporary SKIP Login Button **/}

        {/** Temporary Edit Profile Button **/}
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/Profile"
          sx={{ width: "auto", whiteSpace: 'nowrap'}}
        >
          Profile Page</Button>
        {/** End of Temporary Edit Profile Button **/}

      </Stack>
    </div>
  );
};

export default LandingPage;