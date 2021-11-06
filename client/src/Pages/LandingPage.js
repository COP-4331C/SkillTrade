import AppNavBar from "../components/AppNavBar";
import React from "react";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <AppNavBar />
      <h1>Landing Page</h1>
        <h3>Coming soon</h3>
        <Button variant="contained" color="secondary" component={RouterLink} to="/Home">Skip Login (Temporary button)</Button>
    </>
  );
};

export default LandingPage;