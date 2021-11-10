
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import how from '../how.jpeg';
// import { styled } from '@material-ui/styles';
import FormControl from "@mui/material/FormControl";
import { TextField } from '@mui/material';
// import { Theme } from '../components/Theme';
import { pipelinePrimaryTopicReference } from '@babel/types';
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
// import TextField from '@mui/material/TextField';
import profileImage from '../images/users/chef.png';
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
const [instagramLink, setInstagramLink] = useState("");
const [twitterLink, setTwitterLink] = useState("");
const [linkedInLink, setLinkedInLink] = useState("");

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
  setDisplayContactMe("inline-flex");     // Displays the Contact Me button
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
  let instagramHandle;
  let twitterHandle;
  let linkedInHandle;


  if(!validateTextMinLength(firstNameTemp, 1)) {
    okToSaveData = false;
    setFirstNameError({
      state: true,
      text: "Can't be empty"
    });
  }

  if(!validateTextMaxLength(firstNameTemp, 50)) {
    okToSaveData = false;
    setFirstNameError({
      state: true,
      text: "Must be less than 50 characters"
    });
  }

  if(!validateTextMaxLength(lastNameTemp, 50)) {
    okToSaveData = false;
    setLastNameError({
      state: true,
      text: "Must be less than 50 characters"
    });
  }

  if(!validateTextMaxLength(aboutMeTextTemp, 15)) {
    okToSaveData = false
    setAboutMeTextError({
      state: true,
      text: "Must be less than 650 characters (There are " + aboutMeTextTemp.length + ")"
    });
  }

  if(!validateTextMaxLength(aboutMeText2Temp, 30)) {
    okToSaveData = false
    setAboutMeText2Error({
      state: true,
      text: "Must be less than 650 characters (There are " + aboutMeText2Temp.length + ")"
    });
  }

  // if(instagramTemp.includes("instagram.com")){
  //   instagramHandle = getHandle(instagramTemp);
  // } else {
  //   instagramHandle = instagramTemp;
  // }
  // setInstagramLink("https://www.instagram.com/" + instagramHandle);

  // if(twitterTemp.includes("twitter.com")) {
  //   twitterHandle = getHandle(twitterTemp);
  // } else {
  //   twitterHandle = twitterTemp;
  // }
  // setTwitterLink("https://twitter.com/" + twitterHandle);


  // if(linkedInTemp.includes("linkedin.com")){
  //   linkedInHandle = getHandle(linkedInTemp);
  // } else {
  //   linkedInHandle = linkedInTemp;
  // }
  // setLinkedInLink("https://www.linkedin.com/in/" + linkedInHandle)

  if(okToSaveData) {
    setFirstName(firstNameTemp);
    setLastName(lastNameTemp);
    setAboutMeText(aboutMeTextTemp);
    setAboutMeText2(aboutMeText2Temp);
    setInstagram(instagramHandle);
    setTwitter(twitterHandle);
    setLinkedIn(linkedInHandle);
    exitEditMode();
  }
}

//   // Parses the URL to extract the handle.
//   function getHandle(urlString){

//     let url = new URL(urlString);
//     let pathname = url.pathname;
//     let hostname = url.hostname;
//     let handle = "";

//     if(hostname.includes("instagram.com")) {
//       handle = pathname.replaceAll('/', '');
//     }

//     else if (hostname.includes("twitter.com")){
//       handle = pathname.replaceAll('/', '');
//       handle = '@' + handle;
//     }
//     else if (hostname.includes("linkedin.com")) {
//       handle = pathname.replaceAll('/', '');
//       handle = handle.replaceAll("in", '');
//     }

//     return handle
//   }



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

function handleContactMe() {
  alert("Coming Soon! \n\n" +
    "BTW: There are 10 types of people in the world...\n" +
    "Those who understand binary, and those who don't!")
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

function handleOnChangeInstagram(e) {
  setInstagramTemp(e.target.value);
}

function handleOnChangeTwitter(e) {
  setTwitterTemp(e.target.value);
}

function handleOnChangeLinkedIn(e) {
  setLinkedInTemp(e.target.value);
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

// Allows a custom rating starts
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: Theme.palette.secondary.main,
    backgroundColor: "primary"
  },
  '& .MuiFilledInput-root:after': {
    borderBottom: "secondary"
  },
  '& MuiRating-icon': {
    color: Theme.palette.secondary.main
  }
});

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

    setInstagramLink("https://www.instagram.com/" + instagram);
    setTwitterLink("https://twitter.com/" + twitter);
    setLinkedInLink("https://www.linkedin.com/in/" + linkedIn);

  } catch (e) {
    console.log(e.message);
  }

}, []);
  
  return (
    <Grid container justifyContent="center">
      {/* //start of card// */}
      <Card  sx={{ maxWidth: 345,border: 1, borderColor:"black", width: "300px",backgroundColor: Theme.palette.primary.main, }}>

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

      <CardContent style={{paddingLeft: 0,paddingRight:0,paddingTop:1}}>

        <Typography  variant="body5" color="white">
          I can teach you...
        </Typography>

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
        {/*************************** About Me Text (Edit Mode) ************************************/}
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

        <Typography variant="body2" color="text.secondary">
          CHinese langage is awesome
        </Typography>
      </CardContent>
      <Grid container spacing={2}>
        <Grid item xs={3} justifyContent="left">
          <img  style={{ 
                  marginTop: 0, 
                  width: 70, 
                  height: 70, 
                  borderRadius: 200 / 2,
                  border: "1px solid", 
                  borderColor: 'black' }} 
                  src={how}/>
        </Grid>
      </Grid>

      
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Grid>
    
  );
}