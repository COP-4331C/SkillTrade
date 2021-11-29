import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Fade,
  Paper,
  Rating,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import { Theme } from "../components/Theme";
import { grey } from "@material-ui/core/colors";
import { createTheme, makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import HomeNavBar from "../components/HomeNavBar";
import { retrieveData } from "../components/DataStorage";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

export default function ProfilePage(props) {
  const token = retrieveData("token");

  const [loggedUserAvatar, setLoggedUserAvatar] = useState("");

  useEffect(() => {
    axios
      .get("./api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        setLoggedUserAvatar(response.data["profilePic"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const paper = (price, amount) => {
    return (
      <>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1, textAlign: "left" }}>
            <Typography>{amount} Skill Credits</Typography>
          </Box>
          <Box>
            <Button variant="contained" color="primary" sx={{ color: "white" }}>
              ${price}
            </Button>
          </Box>
        </CardContent>
      </>
    );
  };

  return (
    <>
      <HomeNavBar loggedUserAvatar={loggedUserAvatar} />
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 0,
            width: "100%",
            overflow: "hidden",
            lineHeight: 0,
            fill: "#181818",
          }}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              position: "relative",
              display: "block",
              width: "calc(100% + 1.3px)",
              height: 150,
            }}
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </Box>
      <Container sx={{ mt: { xs: 6, sm: 30 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9} sx={{ px: 12 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              What are skill credits?
            </Typography>
            <Typography sx={{ mb: 4 }}>
              Skill Credits are a currency you can use to learn skills from
              others. You can purchase them here or earn them by teaching other
              users a skill.
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              How do I use them?
            </Typography>
            <Typography sx={{ mb: 1 }}>
              You can use skill credits by finding a skill you want to learn and
              then pressing the <strong>Learn</strong> button. This will bring
              you to a confirmation for your purchase. Once confirmed, a new
              conversation will be created with the user teaching that skill.
            </Typography>
            <Typography sx={{ mb: 4 }}>
              For users that are teaching skills, they can either spend their
              earned skill credits on learning other skills or withdraw them for
              real currency. For more information about withdrawing or to make a
              withdraw, please contact support at
              <Link href="tel:+1888123456" color="#2196f3" underline="hover">
                {" "}
                1 (888) 123-456{" "}
              </Link>
              .
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              How many skill credits do I have?
            </Typography>
            <Typography sx={{ mb: 4 }}>
              Your total skill credits can be found by clicking your profile
              picture in the top right corner of your screen. This will display
              a dropdown that includes your total number of Skill Credits for
              your account.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
              Buy Skill Credits
            </Typography>
            <Stack spacing={3}>
              <Paper elevation={3}>{paper(4.99, 500)}</Paper>
              <Paper elevation={3}>{paper(9.99, 1000)}</Paper>
              <Paper elevation={3}>{paper(19.99, 2000)}</Paper>
              <Paper elevation={3}>{paper(49.99, 5000)}</Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
