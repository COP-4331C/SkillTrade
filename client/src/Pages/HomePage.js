import HomeNavBar from "../components/HomeNavBar";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import * as React from "react";

// TODO: Check if the user is login, if not, then redirect user to login or landing page.

const HomePage = () => {
  return (
    <>
      <HomeNavBar />
      <h1>Home Page</h1>
        <h3>Coming soon</h3>

        {/* Temporary button: goes to the Landing Page */}
        <Button variant="contained" color="secondary" size="large" component={RouterLink} to="/">Back to Landing Page (temp button)</Button>

    </>
  );
};

export default HomePage;