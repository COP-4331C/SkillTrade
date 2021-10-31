import HomeNavBar from "../components/HomeNavBar";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import * as React from "react";

const HomePage = () => {
  return (
    <>
      <HomeNavBar />
      <h1>Home Page coming soon</h1>

        {/* Temporary button: goes to the Landing Page */}
        <Button variant="contained" color="error" size="large" component={RouterLink} to="/">Back to Landing Page (temp button)</Button>

    </>
  );
};

export default HomePage;