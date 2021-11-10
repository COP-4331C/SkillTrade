
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import how from '../how.jpeg';
import FormControl from "@mui/material/FormControl";
import { TextField } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {Divider, Fade, Rating, Stack, ThemeProvider} from "@mui/material";
import {styled} from '@mui/material/styles';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SaveIcon from "@mui/icons-material/Save";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import {Theme} from "../components/Theme";
import {grey} from "@material-ui/core/colors";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EditIcon from '@mui/icons-material/Edit';
import {createTheme, makeStyles} from "@material-ui/core";
import AppNavBar from '../components/AppNavBar';
import profileImage from '../images/users/chef.png';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Link from "@mui/material/Link";
import { border } from '@mui/system';


export default function Testcard() {
const [aboutMeText, setAboutMeText] = useState("how to speak in Chinese");
const [aboutMeText2, setAboutMeText2] = useState("Chinese language is Awesome");
const [fade, setFade] = useState(false);
const [displayNames, setDisplayNames] = useState("inline-flex");
const [displayButton, setDisplayButton] = useState("none");
const [displayContactMe, setDisplayContactMe] = useState("inline-flex");
const [displayEditButton, setDisplayEditButton] = useState("none");
const [inEditMode, setEditMode] = useState(false);
const [displayEditFields, setDisplayEditFields] = useState("none");
const [firstName, setFirstName] = useState("Benjamin");
const [lastName, setLastName] = useState("Harrion");
const [displayAboutMeText2, setDisplayAboutMeText2] = useState("block")
const [aboutMeText2Temp, setAboutMeText2Temp] = useState("");
const [displayAboutMeText, setDisplayAboutMeText] = useState("block")
const [aboutMeTextTemp, setAboutMeTextTemp] = useState("");
const [firstNameTemp, setFirstNameTemp] = useState("");
const [lastNameTemp, setLastNameTemp] = useState("");
const [instagram, setInstagram] = useState("benharrionchef");
const [twitter, setTwitter] = useState("@benjaminHchef");
const [linkedIn, setLinkedIn] = useState("harrion.benjamin");
const [instagramTemp, setInstagramTemp] = useState("");
const [twitterTemp, setTwitterTemp] = useState("");
const [linkedInTemp, setLinkedInTemp] = useState("");
const [displaySocial, setDisplaySocial] = useState("none");
const [imageOpacity, setImageOpacity] = useState(1);
const [photo, setPhoto] = useState(profileImage)
const [editPermission, setEditPermission] = useState(true);
const [mousePointer, setMousePointer] = useState('');
const [disableImageUpload, setDisableImageUpload] = useState(true)

const [firstNameError, setFirstNameError] = useState({
  state: false,
  text: ""
});
const [lastNameError, setLastNameError] = useState({
  state: false,
  text: ""
});
const [aboutMeTextError, setAboutMeTextError] = useState({
  state: false,
  text: ""
})
const [aboutMeText2Error, setAboutMeText2Error] = useState({
  state: false,
  text: ""
})

function enterEditMode() {
  setEditMode(true);                      // Turns edit mode mode (set variable to true)
  setDisplayNames("none");                // Hides the First and Last names
  setDisplayContactMe("none");            // Hides the contact me button
  setDisplayAboutMeText("none");          // Hides the about me text
  setDisplayAboutMeText2("none");          // Hides the about me text
  setDisplayEditButton("none");           // Hides the edit button
  setDisplayEditFields("inline-flex");    // Displays the edit text fields
  setDisplayButton("inline-flex");        // Displays the save and cancel button
  setDisplaySocial("flex");
  setFirstNameTemp(firstName);                  // Copies first name to editable text fields
  setLastNameTemp(lastName);                    // Copies last name to editable text fields
  setAboutMeTextTemp(aboutMeText);              // Copies about me text to editable text field
  setAboutMeText2Temp(aboutMeText2);              // Copies about me text to editable text field
  setFade(true);                          // Tells the buttons to fade in
  setInstagramTemp(instagram);
  setTwitterTemp(twitter);
  setLinkedInTemp(linkedIn);
}

function exitEditMode() {
  setEditMode(false);                     // Turn off edit mode
  setDisplayNames("inline-flex");         // Displays the First and Last names
  // setDisplayContactMe("inline-flex");     // Displays the Contact Me button
  setDisplayAboutMeText("block")          // Displays the about me text
  setDisplayAboutMeText2("block")          // Displays the about me text
  setDisplayEditButton("inline-flex");    // Display Edit button
  setDisplayEditFields("none")            // Hides edit text fields
  setDisplayButton("none");               // Hides the Cancel and Save buttons
  setDisplaySocial("none");
  setFade(false);                         // Tells the button to fade out
}

// Handles the onClick event of the Save button
function handleSave() {
  let okToSaveData = true;

  // if(!validateTextMinLength(firstNameTemp, 1)) {
  //   okToSaveData = false;
  //   setFirstNameError({
  //     state: true,
  //     text: "Can't be empty"
  //   });
  // }

  // if(!validateTextMaxLength(firstNameTemp, 50)) {
  //   okToSaveData = false;
  //   setFirstNameError({
  //     state: true,
  //     text: "Must be less than 50 characters"
  //   });
  // }

  // if(!validateTextMaxLength(lastNameTemp, 50)) {
  //   okToSaveData = false;
  //   setLastNameError({
  //     state: true,
  //     text: "Must be less than 50 characters"
  //   });
  // }

  if(!validateTextMaxLength(aboutMeTextTemp, 15)) {
    okToSaveData = false
    setAboutMeTextError({
      state: true,
      text: "Must be less than 15 characters (There are " + aboutMeTextTemp.length + ")"
    });
  }

  if(!validateTextMaxLength(aboutMeText2Temp, 30)) {
    okToSaveData = false
    setAboutMeText2Error({
      state: true,
      text: "Must be less than 30 characters (There are " + aboutMeText2Temp.length + ")"
    });
  }

  if(okToSaveData) {
    setFirstName(firstNameTemp);
    setLastName(lastNameTemp);
    setAboutMeText(aboutMeTextTemp);
    setAboutMeText2(aboutMeText2Temp);
    exitEditMode();
  }
}




function handleCancelButton() {
  clearTextValidationErrorMessages();
  exitEditMode();
}

function validateTextMinLength(text, min) {
  if(text.length >= min) {
    return 1;
  } else {
    return 0;
  }
}

function validateTextMaxLength(text, max) {
  if(text.length <= max) {
    return 1;
  } else {
    return 0;
  }
}

function clearTextValidationErrorMessages() {
  setFirstNameError({
    state: false,
    text: ""
  });
  setLastNameError({
    state: false,
    text: ""
  });
  setAboutMeTextError({
    state: false,
    text: ""
  });
  setAboutMeText2Error({
    state: false,
    text: ""
  });
}

function handleOnMouseOver() {
  if (!inEditMode && editPermission) {
    setDisplayEditButton("inline-block");
  }
}

function handleOnMouseLeave() {
  if (!inEditMode && editPermission) {
    setDisplayEditButton("none");
  }
}

function handleOnChangeAboutMeText(e) {
  setAboutMeTextTemp(e.target.value);
}

function handleOnChangeAboutMeText2(e) {
  setAboutMeText2Temp(e.target.value);
}

function handleOnChangeFirstName(e) {
  setFirstNameTemp(e.target.value);
}

function handleOnChangeLastName(e) {
  setLastNameTemp(e.target.value);
}


function handleOnMouseOverImage() {
  if (editPermission) {
    setImageOpacity(0.5);
  }
}

function handleOnMouseLeaveImage() {
  if (editPermission) {
    setImageOpacity(1);
  }
}

// // Allows a custom rating starts
// const StyledRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: Theme.palette.secondary.main,
//     backgroundColor: "primary"
//   },
//   '& .MuiFilledInput-root:after': {
//     borderBottom: "secondary"
//   },
//   '& MuiRating-icon': {
//     color: Theme.palette.secondary.main
//   }
// });

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      color: grey[500]
    },
    '& .MuiFilledInput-root': {
      color: "white"
    },
  }
}));
const classes = useStyles();

// Helps to override the Text Field Styles
const textFieldTheme = createTheme({
  palette: {
    secondary: {
      main: Theme.palette.secondary.main,
    },
  }
});

const Input = styled('input')({
  display: 'none',
});

function handlePhoto(e) {
  if (editPermission) {
    alert("Profile picture processing coming soon");
    // Uploaded image should be in e.target.files or e.target.files[0]
    // Axios Post will go here
    // Request to backend with image for cropping and resizing.
  }
}

useEffect(() => {
  try {
    // TODO: Add code to setEditPermission = true if the logged user is
    //  the owner of the profile page. For now, we'll keep the
    //  setEditPermission = true below. (Note: we can't set editPermission,
    //  to then read its state immediately; it does not work.

    if (editPermission) {
      setDisableImageUpload(false);
      setMousePointer("pointer");
    } else {
      setDisableImageUpload(true);
      setMousePointer("");
    }

  } catch (e) {
    console.log(e.message);
  }

}, []);
  
  return (
    <Grid container justifyContent="center">
      {/* //start of card// */}
      <Card  sx={{ maxWidth: 345,border: 4, borderColor:Theme.palette.secondary.light, width: "300px",backgroundColor: Theme.palette.primary.main, }}>

      {/* //start of the heading// */}
      <Grid container 
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave} >

        <Grid item xs={9} paddingLeft >
          <Typography fontStyle="oblique" variant="h5" align="left" color="secondary" >
            Skills
          </Typography>
        </Grid>

        {/* //edit button */}
        <Grid item xs={3}>
              <IconButton color="secondary" aria-label="edit" onClick={enterEditMode}
                          sx={{display: displayEditButton}} align="right">
                <EditIcon/>
              </IconButton>
        </Grid>
      </Grid>
      {/* //end of the heading// */}

      {/* //start of the image-header// */}
          <label htmlFor="icon-button-file">

            <Input
              accept=".png, .jpg, .jpeg"
              id="icon-button-file"
              type="file"
              name="photo"
              onChange={handlePhoto}
              disabled={disableImageUpload}
            />

            {/** **************************** Image ********************** **/}
            <div style={{
                background: "url(https://blog.tutorming.com/hs-fs/hubfs/how-to-learn-chinese.jpg?width=749&name=how-to-learn-chinese.jpg)",
                backgroundSize: "300px",
                width: 300,
                height: 150,
                display: "block",
                cursor: mousePointer,
              }}

              alt={"user"}
              onMouseOver={handleOnMouseOverImage}
              onMouseLeave={handleOnMouseLeaveImage}
            />

          </label>
      {/* //end of the image-header// */}

      <CardContent style={{paddingLeft: 0,paddingRight:0, paddingTop:0}}>

        <Box pt={1}>
          <Typography  variant="body5" color="white" style={{paddingTop:1}}>
            I can teach you...
          </Typography>
        </Box>
        

      {/*************************** What Skills can be taught ************************************/}
        <Typography
            style={{backgroundColor: Theme.palette.primary.contrastText}}  
            sx={{
            fontWeight: 300,
            fontSize: "1.2rem",
            lineHeight: 1.5,
            textAlign: "center",
            marginTop: "10px",
            display: displayAboutMeText,
            maxHeight: "75px",
            height: "auto",
            flexWrap:"wrap"
          }}>
            {aboutMeText}
        </Typography>
        {/*************************** What Skills can be taught (Edit Mode) ************************************/}
        <ThemeProvider theme={textFieldTheme}>
            <TextField
              label="How to learn ..."
              color="secondary"
              className={classes.root}
              multiline
              variant="filled"
              rows={2}
              value={aboutMeTextTemp}
              // color="ffb609"
              fullWidth
              onChange={handleOnChangeAboutMeText}
              sx={{display: displayEditFields, marginTop: "10px"}}
              helperText={aboutMeTextError.text}
              error={aboutMeTextError.state}
            />
        </ThemeProvider>
        {/*************************** What Skills can be taught DONE ************************************/}

        {/*************************** Explanation on what can be taught ************************************/}
        <Grid container>
          <Grid item xs={2}>
            <IconButton color="secondary" aria-label="edit" align="left">
                <DescriptionIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <Typography
              variant="body5"
              // style={{backgroundColor: Theme.palette.primary.contrastText}}  
              sx={{
              lineHeight: 1.5,
              textAlign: "left",
              marginTop: "10px",
              color:"white",
              display: displayAboutMeText2,
              maxHeight: "75px",
              height: "auto",
              flexWrap:"wrap"
            }}>
              {aboutMeText2}
            </Typography>
          </Grid>
        </Grid>
        
        {/*************************** Explanation on what can be taught (Edit Mode) ************************************/}
        <ThemeProvider theme={textFieldTheme}>
            <TextField
              label="Brief explanation of the skill"
              color="secondary"
              className={classes.root}
              multiline
              variant="filled"
              rows={2}
              value={aboutMeText2Temp}
              fullWidth
              onChange={handleOnChangeAboutMeText2}
              sx={{display: displayEditFields, marginTop: "10px"}}
              helperText={aboutMeText2Error.text}
              error={aboutMeText2Error.state}
            />
        </ThemeProvider>

         {/*************************** Explanation on what can be taught ************************************/}
         <Grid container >
          <Grid item xs={2}>
            <IconButton color="secondary" aria-label="edit" align="left">
                <PersonPinCircleIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <Typography
              variant="body5"
              // style={{backgroundColor: Theme.palette.primary.contrastText}}  
              sx={{
              lineHeight: 1.5,
              textAlign: "left",
              marginTop: "10px",
              color:"white",
              display: displayAboutMeText2,
              maxHeight: "75px",
              height: "auto",
              flexWrap:"wrap"
            }}>
              {aboutMeText2}
            </Typography>
          </Grid>
        </Grid>
        
        {/*************************** Explanation on what can be taught (Edit Mode) ************************************/}
        <ThemeProvider theme={textFieldTheme}>
            <TextField
              label="Brief explanation of the skill"
              color="secondary"
              className={classes.root}
              multiline
              variant="filled"
              rows={2}
              value={aboutMeText2Temp}
              fullWidth
              onChange={handleOnChangeAboutMeText2}
              sx={{display: displayEditFields, marginTop: "10px"}}
              helperText={aboutMeText2Error.text}
              error={aboutMeText2Error.state}
            />
        </ThemeProvider>

         {/******************** Cancel Button *********************/}
         <Box sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'safe center',
              flexWrap: "wrap-reverse"
            }}>
              <Grid container justifyContent="center" style={{paddingTop: 2}}>
                
                <Grid item xs={3}>
                  <Fade in={fade}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      // style={{marginTop: 30, padding: "6px 64px"}}
                      onClick={handleCancelButton}
                      sx={{display: displayButton}}
                    > <CancelPresentationIcon/>
                    </Button>
                  </Fade>
                </Grid>

                <Grid item xs={3}>
                  <Fade in={fade}>
                    <Button
                      color="secondary"
                      // startIcon={<SaveIcon/>}
                      variant="contained"
                      // style={{marginTop: 30, padding: "6px 64px"}}
                      onClick={handleSave}
                      sx={{display: displayButton}}
                    ><SaveIcon/>
                    </Button>

                  </Fade>
                </Grid>

              </Grid>
              
              {/******************** Save Button *********************/}
              
            </Box>
      </CardContent>

      <Divider variant="middle" style={{color: 'white', border: "1px solid"}}/>

      <Grid container spacing={2} padding>
        <Grid item xs={3} justifyContent="left">
          <label htmlFor="icon-button-file">

            <Input
              accept=".png, .jpg, .jpeg"
              id="icon-button-file"
              type="file"
              name="photo"
              onChange={handlePhoto}
              disabled={disableImageUpload}
            />

            {/** **************************** Image ********************** **/}
            <div style={{
                background: "url(https://blog.tutorming.com/hs-fs/hubfs/how-to-learn-chinese.jpg?width=749&name=how-to-learn-chinese.jpg)",
                backgroundSize: "100px",
                width: 70,
                height: 70,
                borderRadius: 200 / 2,
                // display: "block",
                cursor: mousePointer,
              }}

              alt={"user"}
              onMouseOver={handleOnMouseOverImage}
              onMouseLeave={handleOnMouseLeaveImage}
            />
            </label>
        </Grid>

        <Grid item xs={6} justifyContent="left">
        <Typography
              variant={"body5"}
              sx={{
                textAlign: "left",
                marginTop: "20px",
                color: "#ffb609",
                fontWeight: 600
              }}
            >
              {firstName+lastName}
            </Typography>
            {/* <Typography
              variant={"body5"}
              sx={{
                textAlign: "left",
                marginLeft: "20px",
                marginTop: "20px",
                fontWeight: 600
              }}
            >
              {lastName}
            </Typography> */}
        </Grid>
        
      </Grid>

    
    </Card>
    </Grid>
    
  );
}