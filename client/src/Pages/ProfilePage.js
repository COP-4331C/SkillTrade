import React, {useRef, useState} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link as RouterLink} from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import {Alert, Collapse, Fade, FormHelperText, Rating, Stack} from "@mui/material";
import AppNavBar from '../components/AppNavBar';
import {Box} from '@mui/system';
import whoa from '../whoa.jpeg';
import {styled} from '@mui/material/styles';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import twitter from '../twitter.png';
import facebook from '../facebook.png';
import ig from '../ig.png';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import {Theme} from "../components/Theme";

export default function ProfilePage() {

  const [readOnlyState, setReadOnlyState] = useState(true);
  const [fade, setFade] = useState(false);
  const [displayButton, setDisplayButton] = useState("none");
  const [displayContactMe, setDisplayContactMe] = useState("inline-flex");
  const [displayEditButton, setDisplayEditButton] = useState("none");
  const [displayEditButtonPermanently, setDisplayEditButtonPermanently] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [bgColor, setBgColor] = useState('lightBlue');

  function enterEditMode() {
    setReadOnlyState(false);              // Disable fields read only (Make them editable)
    setDisplayButton("inline-flex")       // Shows the save and cancel button
    setDisplayContactMe("none");          // Hides the contact me button
    setFade(true);                        // Tells the buttons to fade in
    setInEditMode(true);                  // To toggle the edit mode on/off on every edit button click
    setBgColor(Theme.palette.common.white);     // Sets the background to white
    setDisplayEditButton("none");
  }

  function exitEditMode() {
    setReadOnlyState(true);             // Enable fields read only (Make them non-editable)
    setDisplayButton("none");           // Hides the Cancel and Save buttons
    setDisplayContactMe("inline-flex"); // Displays the Contact Me button
    setFade(false);                     // Tells the button to fade out
    setDisplayEditButton("inline_block");
    setInEditMode(false);
    setBgColor('lightBlue');
  }

  // Handles the onClick event of the Save button
  function handleSave() {
    exitEditMode();
  }

  function handleOnMouseOver() {
    if(!inEditMode) {
      setDisplayEditButton("inline-block");
    }
  }

  function handleOnMouseLeave() {
    if(!inEditMode) {
    // if (!displayEditButtonPermanently) {
      // "none" hides the edit button
      setDisplayEditButton("none");
    }
  }

  function handleContactMe() {
    alert("There are 10 types of people in the world...\n" +
      "Those who understand binary, and those who don't!")
  }

  // Allows a custom rating starts
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: Theme.palette.secondary.main
    }
  });

  {/**************************** About Me Variables *********************************/}
  const [displayEditButtonAboutMe, setDisplayAboutMe_EditButton] = useState("none");
  // const [displayEditButtonPermanentlyAboutMe, setDisplayEditButtonPermanentlyAboutMe] = useState(false);
  const [displayAboutMeText, setDisplayAboutMeText] = useState("block")
  const [aboutMeBold, setAboutMeBold] = useState("Proactive, Ambitious and Creative Executive Chef ")
  const [aboutMeText, setAboutMeText] = useState("with a notable career trajectory and achievements list. Experience " +
    "in catering for up to 450 covers at some of the most prestigious " +
    "establishments in the world. Passionate about working with fresh produce, " +
    "creating innovative dishes and improving restaurant ratings.")
  const [aboutMeTextTemp, setAboutMeTextTemp] = useState("");
  const [aboutMeBoldTemp, setAboutMeBoldTemp] = useState("");
  const [bgColorAboutMe, setBgColorAboutMe] = useState('lightblue');
  const [aboutMeEditMode, setAboutMeEditMode] = useState(false);
  const [displayAboutMeTextFields, setDisplayAboutMeTextFields] = useState("none");
  const [displayAboutMeButtons, setDisplayAboutMeButtons] = useState("none");
  const [fadeAboutMeItems, setFadeAboutMeItems] = useState(false);

  {/********************* Functions for About Me Section *********************************/}
  function handleOnMouseOverAboutMe() {
    if (!aboutMeEditMode) {
      setDisplayAboutMe_EditButton("inline-block");
    }
  }

  function handleOnMouseLeaveAboutMe() {
    if (!aboutMeEditMode) {
      // "none" hides the edit button
      setDisplayAboutMe_EditButton("none");
    }
  }

  function enterAboutMeEditMode() {
    setAboutMeEditMode(true);
    setDisplayAboutMeText("none");
    setAboutMeTextTemp(aboutMeText);
    setAboutMeBoldTemp(aboutMeBold);
    setBgColorAboutMe('white')
    setDisplayAboutMeTextFields("block");
    setDisplayAboutMeButtons("inline-flex");
    setFadeAboutMeItems(true);
    setDisplayAboutMe_EditButton("none");
  }

  function exitAboutMeEditMode () {
    setDisplayAboutMeText("block");
    setBgColorAboutMe('lightblue')
    setAboutMeEditMode(false);
    setDisplayAboutMeTextFields("none");
    setDisplayAboutMeButtons("none")
    setFadeAboutMeItems(false);
  }

  function handleAboutMeCancel() {
    setAboutMeBold(aboutMeBold);
    setAboutMeText(aboutMeText);
    exitAboutMeEditMode()
  }

  function handleAboutMeSave() {
    setAboutMeBold(aboutMeBoldTemp);
    setAboutMeText(aboutMeTextTemp);
    exitAboutMeEditMode()
  }

  function handleOnChangeAboutMeText(e) {
    setAboutMeTextTemp(e.target.value);
  }

  function handleOnChangeAboutMeBold(e) {
    setAboutMeBoldTemp(e.target.value);
  }


  return (
    <Box sx={{flex: 1}}>
      <AppNavBar/>
      <Grid>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'safe center',
          flexWrap: "wrap"
        }}>
          {/** ************************************************************************** **/}
          {/**                            LEFT SIDE                                       **/}
          {/** ************************************************************************** **/}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'safe center',
            flexWrap: "nowrap"
          }}>

            {/************************ 1ST component paper ***************************/}
            <Paper
              variant="outlined"
              style={{
                borderColor: "black",
                padding: 10,
                width: 500,
                backgroundColor: bgColor,
                borderRadius: 20,
                borderWidth: 2,
                marginTop: 50,
                marginRight: 10
              }}
              onMouseOver={handleOnMouseOver}
              onMouseLeave={handleOnMouseLeave}
            >
              <Grid container direction="row" spacing={3} justifyContent="center" alignItems="flex-start"
                    sx={{height: 70}}>
                <Grid item xs>
                  {/* This is a spacer for the left of the user's photo - Do not delete */}
                </Grid>

                {/********************* Profile Image *********************************/}
                <Grid item xs>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <img
                      style={{
                        marginTop: -50,
                        width: 70,
                        height: 70,
                        borderRadius: 200 / 2,
                        border: "2px solid",
                        borderColor: 'black'
                      }}
                      src={whoa} alt="User"
                    />
                  </Box>
                </Grid>

                {/********************* Edit Button *********************************/}
                <Grid item xs>
                  <Box sx={{textAlign: "right"}}>
                    <IconButton color="primary" aria-label="edit" onClick={enterEditMode}
                                sx={{display: displayEditButton}}>
                      <EditOutlinedIcon/>
                    </IconButton>
                  </Box>
                </Grid>

              </Grid>

              <Grid container spacing={2} justifyContent="center" paddingTop={2}>

                {/******************** First Name *********************/}
                <Grid item xs>
                  <TextField
                    label="First Name"
                    defaultValue="John"
                    InputProps={{readOnly: readOnlyState}}
                  />
                </Grid>

                {/******************** Last Name *********************/}
                <Grid item xs>
                  <TextField
                    id="outlined-read-only-input"
                    label="Last Name"
                    defaultValue="Doe"
                    InputProps={{readOnly: readOnlyState}}
                    // sx={{padding:0}}
                  />
                </Grid>
              </Grid>

              {/******************** Cancel Button *********************/}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                // alignItems: 'safe center',
                // flexWrap: "wrap-reverse"
              }}>
                <Fade in={fade}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{marginTop: 30, padding: "6px 64px"}}
                    onClick={exitEditMode}
                    sx={{display: displayButton}}
                  > Cancel
                  </Button>
                </Fade>

                {/******************** Contact Me Button *********************/}
                <Fade in={!fade}>
                  <Button
                    // type='submit'
                    color='primary'
                    variant='contained'
                    style={{marginTop: 30}}
                    startIcon={<ForumOutlinedIcon/>}
                    sx={{display: displayContactMe, whiteSpace: 'nowrap'}}
                    onClick={handleContactMe}
                  >
                    Contact Me!
                  </Button>
                </Fade>

                {/******************** Save Button *********************/}
                <Fade in={fade}>
                  <Button
                    color="secondary"
                    startIcon={<SaveIcon/>}
                    variant="contained"
                    style={{marginTop: 30, padding: "6px 64px"}}
                    onClick={handleSave}
                    sx={{display: displayButton}}
                  >
                    Save
                  </Button>
                </Fade>
              </Box>

              {/******************** Rating *********************/}
              <Box sx={{marginTop: 1}}>
                <StyledRating
                  defaultValue={4.5}
                  precision={0.5}
                  icon={<StarIcon fontSize="inherit"/>}
                  emptyIcon={<StarBorderOutlinedIcon fontSize="inherit"/>}
                  readOnly
                />
              </Box>
            </Paper>


            {/* /////////////////////////////////////////////////////////////////////////// */}
            {/************************ Social Media Section ***************************/}

            {/* //main grid container// */}
            {/*<Grid container spacing={4} justifyContent="left" paddingTop={2} marginLeft={2}>*/}
            <Grid>
              <Grid>

                {/* //Main Paper// */}
                <Paper variant="outlined" elevation={3} style={{
                  borderColor: "black",
                  padding: 10,
                  width: 500,
                  backgroundColor: 'lightBlue',
                  borderRadius: 20,
                  borderWidth: 2,
                  marginTop: 10,
                  marginRight: 10
                }}>
                  <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={1}>
                      <Grid container item spacing={3} justifyContent="center">
                        <Grid item xs={4}>

                          <img style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50
                          }}
                               src={facebook}/>

                        </Grid>
                        <Grid item xs={4}>

                          <img style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50
                          }}
                               src={ig}/>

                        </Grid>
                        <Grid item xs={4}>

                          <img style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50
                          }}
                               src={twitter}/>

                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                      <Grid container item spacing={3} justifyContent="center">
                        <Grid item xs={4} marginTop={2}>

                          <TextField
                            id="outlined-read-only-input"
                            label="Facebook ID"
                            defaultValue="Doe"
                            InputProps={{
                              readOnly: true,
                            }}
                          />

                        </Grid>
                        <Grid item xs={4} marginTop={2}>

                          <TextField
                            id="outlined-read-only-input"
                            label="Instagram ID"
                            defaultValue="Doe"
                            InputProps={{
                              readOnly: true,
                            }}
                          />

                        </Grid>
                        <Grid item xs={4} marginTop={2}>

                          <TextField
                            id="outlined-read-only-input"
                            label="Twitter ID"
                            defaultValue="Doe"
                            InputProps={{
                              readOnly: true,
                            }}
                          />

                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>

              </Grid>
            </Grid>

            {/* /////////////////////////////////////////////////////////////////////////// */}
            {/*************************** About Me Section ************************************/}
            <Paper
              variant="outlined"
              style={{
                borderColor: "black",
                padding: 10,
                minHeight: 180,
                width: 500,
                backgroundColor: bgColorAboutMe,
                borderRadius: 20,
                borderWidth: 2,
                marginTop: 10,
                marginRight: 10,
              }}
              onMouseOver={handleOnMouseOverAboutMe}
              onMouseLeave={handleOnMouseLeaveAboutMe}
            >
              <Grid container direction="row" spacing={3} justifyContent="center" alignItems="flex-start"
                    sx={{height: 60}}>
                <Grid item xs>
                  {/* This is a spacer for the left side of the About Be header - Do not delete */}
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" sx={{fontWeight: 800, paddingTop: 1}} gutterBottom>
                    ABOUT ME
                  </Typography>
                </Grid>

                {/********************* Edit Button *********************************/}
                <Grid item xs>
                  <Box sx={{textAlign: "right"}}>
                    <IconButton color="primary" aria-label="edit" onClick={enterAboutMeEditMode}
                                sx={{display: displayEditButtonAboutMe}}>
                      <EditOutlinedIcon/>
                    </IconButton>
                  </Box>
                </Grid>

              </Grid>

              {/*************************** About Me Text ************************************/}
              <Box sx={{
                fontWeight: 300,
                fontSize: "18px",
                lineHeight: 1.4,
                textAlign: "left",
                marginTop: "10px",
                marginX: "10px",
                display: displayAboutMeText
              }}>
                <strong>{aboutMeBold}</strong>
                {aboutMeText}
              </Box>
                <TextField
                  label="About Me Bold line"
                  value={aboutMeBoldTemp}
                  fullWidth
                  onChange={handleOnChangeAboutMeBold}
                  variant={"outlined"}
                  sx={{marginY:"10px", display:displayAboutMeTextFields}}
                />
                <TextField
                  label="About Me Text"
                  multiline
                  rows={aboutMeText.length / 50}
                  value={aboutMeTextTemp}
                  fullWidth
                  onChange={handleOnChangeAboutMeText}
                  variant={"outlined"}
                  sx={{marginY:"10px", display:displayAboutMeTextFields}}
                />

              {/*************************** Signature ************************************/}
              <Box textAlign="left" marginTop="10px" marginBottom="10px" >
                <Typography
                  variant="button"
                  color="primary"
                  sx={{
                    textAlign: "left",
                    fontWeight: 800,
                    fontFamily: ["Comic Sans MS","Comic Sans", "cursive"].join(","),
                    fontSize: "18px",
                    marginLeft: "10px",
                    textTransform: "capitalize"
                  }}
                >
                  John Doe
                </Typography>
              </Box>

              {/************ Container for Save and Cancel Buttons *********************/}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                // alignItems: 'safe center',
                // flexWrap: "wrap-reverse"
              }}>

                {/******************** Cancel Button *********************/}
                <Fade in={fadeAboutMeItems}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{marginTop: 5, margin: 10, padding: "6px 64px"}}
                  onClick={handleAboutMeCancel}
                  sx={{display: displayAboutMeButtons}}
                > Cancel
                </Button>
                </Fade>

                {/******************** Save Button *********************/}
                <Fade in={fadeAboutMeItems}>
                <Button
                  color="secondary"
                  startIcon={<SaveIcon/>}
                  variant="contained"
                  style={{marginTop: 5, margin: 10, padding: "6px 64px"}}
                  onClick={handleAboutMeSave}
                  sx={{display: displayAboutMeButtons}}
                >
                  Save
                </Button>
                </Fade>
              </Box>

            </Paper>
          </Box>


          {/** ************************************************************************** **/}
          {/**                            RIGHT SIDE                                      **/}
          {/** ************************************************************************** **/}
          <Paper
            variant="outlined"
            style={{
              borderColor: "black",
              padding: 10,
              height: 600,
              width: 500,
              backgroundColor: "lightblue",
              borderRadius: 20,
              borderWidth: 2,
              marginTop: 50,
              marginRight: 10,
              alignSelf: "flex-start"
            }}
          >
            <h2>Skill Listings</h2>
            <h3>placeholder</h3>
          </Paper>

        </Box>
      </Grid>
    </Box>
  );
}
