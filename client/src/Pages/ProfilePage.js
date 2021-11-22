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
import TextField from '@mui/material/TextField';
import profileImage from '../images/users/chef.png';
import Link from "@mui/material/Link";
import HomeNavBar from "../components/HomeNavBar";
import Reviews from "../components/Reviews";
import Paper from "@mui/material/Paper";
import {retrieveToken} from "../components/TokenStorage";
import axios from "axios";


export default function ProfilePage(props) {
  const [aboutMeText, setAboutMeText] = useState("\"Proactive, Ambitious and Creative Executive Chef " +
    "with a notable career trajectory and achievements list. Experience " +
    "in catering for up to 450 covers at some of the most prestigious " +
    "establishments in the world. Passionate about working with fresh produce, " +
    "creating innovative dishes and improving restaurant ratings.\"");
  const [fade, setFade] = useState(false);
  const [displayNames, setDisplayNames] = useState("inline-flex");
  const [displayButton, setDisplayButton] = useState("none");
  const [displayContactMe, setDisplayContactMe] = useState("inline-flex");
  const [displayEditButton, setDisplayEditButton] = useState("none");
  const [displayEditFields, setDisplayEditFields] = useState("none");
  const [displayAboutMeText, setDisplayAboutMeText] = useState("block")
  const [displaySocial, setDisplaySocial] = useState("none");
  const [inEditMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("Benjamin");
  // const [firstName, setFirstName] = useState(props.name);
  const [lastName, setLastName] = useState("Harrion");
  const [aboutMeTextTemp, setAboutMeTextTemp] = useState("");
  const [firstNameTemp, setFirstNameTemp] = useState("");
  const [lastNameTemp, setLastNameTemp] = useState("");
  const [instagram, setInstagram] = useState("benharrionchef");
  const [twitter, setTwitter] = useState("@benjaminHchef");
  const [linkedIn, setLinkedIn] = useState("harrion.benjamin");
  const [instagramTemp, setInstagramTemp] = useState("");
  const [twitterTemp, setTwitterTemp] = useState("");
  const [linkedInTemp, setLinkedInTemp] = useState("");
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
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [newReview, setNewReview] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect( () => {
    setMounted(true);
  },[]);


  // Fetches and displays the profile information on page load
  // TODO: It is not loading before rendering. need to fix
  if(!mounted) {

    // Get token from the local storage
    const token = retrieveToken();
    // console.log(token);

    const URL = "./api/user/profile";

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // Fetches the profile data
    axios.get(URL, config)
      .then(function(response) {
        // Handle success
        setFirstName(response.data["firstName"]);
        setLastName(response.data["lastName"]);
        setAboutMeText(response.data["aboutMe"])
        setPhoto(response.data["profilePic"]);
        setInstagram(response.data["instagram"]);
        setTwitter(response.data["twitter"]);
        setLinkedIn(response.data["linkedIn"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function enterEditMode() {
    setEditMode(true);                      // Turns edit mode mode (set variable to true)
    setDisplayNames("none");                // Hides the First and Last names
    setDisplayContactMe("none");            // Hides the contact me button
    setDisplayAboutMeText("none");          // Hides the about me text
    setDisplayEditButton("none");           // Hides the edit button
    setDisplayEditFields("inline-flex");    // Displays the edit text fields
    setDisplayButton("inline-flex");        // Displays the save and cancel button
    setDisplaySocial("flex");
    setFirstNameTemp(firstName);                  // Copies first name to editable text fields
    setLastNameTemp(lastName);                    // Copies last name to editable text fields
    setAboutMeTextTemp(aboutMeText);              // Copies about me text to editable text field
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

    if (!validateTextMinLength(firstNameTemp, 1)) {
      okToSaveData = false;
      setFirstNameError({
        state: true,
        text: "Can't be empty"
      });
    }

    if (!validateTextMaxLength(firstNameTemp, 50)) {
      okToSaveData = false;
      setFirstNameError({
        state: true,
        text: "Must be less than 50 characters"
      });
    }

    if (!validateTextMaxLength(lastNameTemp, 50)) {
      okToSaveData = false;
      setLastNameError({
        state: true,
        text: "Must be less than 50 characters"
      });
    }

    if (!validateTextMaxLength(aboutMeTextTemp, 650)) {
      okToSaveData = false
      setAboutMeTextError({
        state: true,
        text: "Must be less than 650 characters (There are " + aboutMeTextTemp.length + ")"
      });
    }

    if (instagramTemp.includes("instagram.com")) {
      instagramHandle = getHandle(instagramTemp);
    } else {
      instagramHandle = instagramTemp;
    }
    setInstagramLink("https://www.instagram.com/" + instagramHandle);

    if (twitterTemp.includes("twitter.com")) {
      twitterHandle = getHandle(twitterTemp);
    } else {
      twitterHandle = twitterTemp;
    }
    setTwitterLink("https://twitter.com/" + twitterHandle);


    if (linkedInTemp.includes("linkedin.com")) {
      linkedInHandle = getHandle(linkedInTemp);
    } else {
      linkedInHandle = linkedInTemp;
    }
    setLinkedInLink("https://www.linkedin.com/in/" + linkedInHandle)

    if (okToSaveData) {
      setFirstName(firstNameTemp);
      setLastName(lastNameTemp);
      setAboutMeText(aboutMeTextTemp);
      setInstagram(instagramHandle);
      setTwitter(twitterHandle);
      setLinkedIn(linkedInHandle);

      // Send data to backend
      const URL = "./api/user/edit-profile";
      const token = retrieveToken();
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const data = {
          firstName: firstNameTemp,
          lastName: lastNameTemp,
          aboutMe:  aboutMeTextTemp,
          instagram: instagramHandle,
          twitter: twitterHandle,
          linkedIn: linkedInHandle,
          city: "",
          state: "",
          country:""
        // TODO: Add city, state, and country in Profile
      }

      // Saves the Profile data
      axios.put(URL, data, config)
        .then(console.log).catch(console.log);

      exitEditMode();
    }
  }

  // Parses the URL to extract the handle.
  function getHandle(urlString) {

    let url = new URL(urlString);
    let pathname = url.pathname;
    let hostname = url.hostname;
    let handle = "";

    if (hostname.includes("instagram.com")) {
      handle = pathname.replaceAll('/', '');
    } else if (hostname.includes("twitter.com")) {
      handle = pathname.replaceAll('/', '');
      handle = '@' + handle;
    } else if (hostname.includes("linkedin.com")) {
      handle = pathname.replaceAll('/', '');
      handle = handle.replaceAll("in", '');
    }

    return handle
  }

  function handleCancelButton() {
    clearTextValidationErrorMessages();
    exitEditMode();
  }

  function validateTextMinLength(text, min) {
    if (text.length >= min) {
      return 1;
    } else {
      return 0;
    }
  }

  function validateTextMaxLength(text, max) {
    if (text.length <= max) {
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

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    // console.log(`length: ${e.target.files[0]}`);

    if (editPermission) {

      const URL = "./api/user/upload-profile-pic";
      const token = retrieveToken();
      const config = {
        headers: { Authorization: `Bearer ${token}`,'content-type': 'multipart/form-data' }
      };
      // console.log(e.target.files[0])

      // Saves the profile picture
      axios.post(URL, formData, config)
        .then( function(response){
          setPhoto(response.data.URL);
        })
        .catch(console.log);
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

  const [displayNewReview, setDisplayNewReview] = useState("none");


  // Creates a list of reviews. For each review in reviewList
  // Render the Review component with the data passed to it.
  // reviewMessages is an array manually declared at the end of this file.
  const reviewList = reviewMessages.map((reviewElement) =>
    <Reviews
      avatar={reviewElement.avatar}
      name={reviewElement.name}
      rating={reviewElement.rating}
      location={reviewElement.location}
      message={reviewElement.message}
      newReview={false}
      // ratingReadOnly={true}
    />
  );

  // const [count, setCount] = useState(0) // Name it however you wish
  const handleCancelWriteReview = () => {
    setDisplayNewReview("none");
  }

  function handleWriteReview() {
    setDisplayNewReview("block");
  }


  return (
    <Box sx={{flex: 1}}>
      <HomeNavBar/>

      {/************************* Main Box ***********************/}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'safe center',
          flexWrap: "wrap",
          marginTop: "20px"
        }}>
        {/************************* Left Box (Image) **********************/}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'safe center',
            flexWrap: "nowrap",
            position: "relative"
          }}
        >
          {/** ******************* Image Upload Input ********************** **/}
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
            <img
              src={photo}
              style={{
                width: 300,
                height: 450,
                borderRadius: "4px 0 0 4px",
                display: "block",
                cursor: mousePointer,
                opacity: imageOpacity
              }}
              alt={"user"}
              onMouseOver={handleOnMouseOverImage}
              onMouseLeave={handleOnMouseLeaveImage}
            />
          </label>
        </Box>

        {/*********************** Right Box (Info) *******************/}
        <Box
          color={"white"}
          sx={{
            paddingLeft: '40px',
            paddingRight: '40px',
            backgroundColor: Theme.palette.primary.main,
            width: 600,
            height: 450,
            borderRadius: "0 4px 4px 0",
          }}
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
        >
          {/** *********************** Names *************************** **/}
          <Box sx={{display: displayNames, width: "100%", justifyContent: "left"}}>
            <Typography
              variant={"h3"}
              sx={{
                textAlign: "left",
                marginTop: "20px",
                color: "#ffb609",
                fontWeight: 600
              }}
            >
              {firstName}
            </Typography>
            <Typography
              variant={"h3"}
              sx={{
                textAlign: "left",
                marginLeft: "20px",
                marginTop: "20px",
                fontWeight: 600
              }}
            >
              {lastName}
            </Typography>

            {/********************* Edit Button *********************************/}
            <Box sx={{marginTop: "25px", marginLeft: "5px"}}>
              <IconButton color="secondary" aria-label="edit" onClick={enterEditMode}
                          sx={{display: displayEditButton}}>
                <EditIcon/>
              </IconButton>
            </Box>
          </Box>

          {/** ****************** First and Last Names (Edit Mode) *************************** **/}
          <Box sx={{display: displayEditFields, width: "100%", justifyContent: "left"}}>
            <ThemeProvider theme={textFieldTheme}>
              <TextField
                color="secondary"
                variant={"filled"}
                label={"First Name"}
                value={firstNameTemp}
                className={classes.root}
                required
                sx={{marginRight: "1rem", marginTop: "1rem"}}
                onChange={handleOnChangeFirstName}
                helperText={firstNameError.text}
                error={firstNameError.state}
              >
              </TextField>
              <TextField
                color="secondary"
                variant={"filled"}
                label={"Last Name"}
                value={lastNameTemp}
                className={classes.root}
                sx={{marginTop: "1rem"}}
                onChange={handleOnChangeLastName}
                helperText={lastNameError.text}
                error={lastNameError.state}
              >
              </TextField>
            </ThemeProvider>
          </Box>

          {/*************************** About Me Text ************************************/}
          <Box sx={{
            fontWeight: 300,
            fontSize: "1.2rem",
            fontStyle: "italic",
            lineHeight: 1.5,
            textAlign: "left",
            marginTop: "10px",
            display: displayAboutMeText,
            maxHeight: "225px",
            height: "225px",
          }}>
            {aboutMeText}
          </Box>
          {/*************************** About Me Text (Edit Mode) ************************************/}
          <ThemeProvider theme={textFieldTheme}>
            <TextField
              label="About Me"
              color="secondary"
              className={classes.root}
              multiline
              variant="filled"
              rows={8.4}
              value={aboutMeTextTemp}
              fullWidth
              onChange={handleOnChangeAboutMeText}
              sx={{display: displayEditFields, marginTop: "10px"}}
              helperText={aboutMeTextError.text}
              error={aboutMeTextError.state}
            />
          </ThemeProvider>

          {/******** Stack is the container for the elements below the about me text **********/}
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={2}
          >
            {/******************** Cancel Button *********************/}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'safe center',
              flexWrap: "wrap-reverse"
            }}>
              <Fade in={fade}>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{marginTop: 30, padding: "6px 64px"}}
                  onClick={handleCancelButton}
                  sx={{display: displayButton}}
                > Cancel
                </Button>
              </Fade>

              {/*********************************** Rating  ************************************/}
              <Box sx={{marginTop: 5, justifyContent: "center", display: displayContactMe}}>
                <StyledRating
                  defaultValue={4.5}
                  precision={0.5}
                  icon={<StarIcon fontSize="inherit"/>}
                  emptyIcon={<StarBorderOutlinedIcon fontSize="inherit"/>}
                  readOnly
                />
              </Box>

              {/******************** Contact Me Button *********************/}
              <Fade in={!fade}>
                <Button
                  // type='submit'
                  color='secondary'
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

            {/***************** Horizontal line ***************/}
            <Divider style={{background: 'white', border: "1px solid"}}/>

            {/***************** Social Media ****************/}
            <Box sx={{display: "flex", marginY: "20px"}}>
              <Grid container>

                {/***************** Instagram  Icon ****************/}
                <Grid item xs={0.6} sx={{display: "flex"}}>
                  <IconButton sx={{padding: 0}} href={instagramLink} underline="none" target="_blank" rel="noreferrer">
                    <InstagramIcon color={"secondary"}/>
                  </IconButton>
                </Grid>

                {/***** Instagram Handle *****/}
                <Grid item xs>
                  <Link href={instagramLink} underline="none" target="_blank" rel="noreferrer">
                    <Typography color={"white"} align={"left"}
                                sx={{fontSize: "1rem", display: displayAboutMeText}}>{instagram}
                    </Typography>
                  </Link>
                  <ThemeProvider theme={textFieldTheme}>

                    {/**** Instagram Hidden Edit Text field ****/}
                    <TextField
                      color="secondary"
                      variant={"filled"}
                      label={"Instagram"}
                      value={instagramTemp}
                      className={classes.root}
                      size={'small'}
                      sx={{display: displaySocial, marginTop: -1.5}}
                      onChange={handleOnChangeInstagram}
                    >
                    </TextField>
                  </ThemeProvider>
                </Grid>

                {/****************** Twitter Icon *******************/}
                <Grid item xs={0.6} sx={{display: "flex"}}>
                  <IconButton sx={{padding: 0}} href={twitterLink} underline="none" target="_blank" rel="noreferrer">
                    <TwitterIcon color={"secondary"}/>
                  </IconButton>
                </Grid>

                {/***** Twitter Handle *****/}
                <Grid item xs>
                  <Link href={twitterLink} underline="none" target="_blank" rel="noreferrer">
                    <Typography color={"white"} align={"left"}
                                sx={{fontSize: "1rem", display: displayAboutMeText}}>{twitter}
                    </Typography>
                  </Link>

                  {/***** Twitter Hidden Edit Text Field *****/}
                  <ThemeProvider theme={textFieldTheme}>
                    <TextField
                      color="secondary"
                      variant={"filled"}
                      label={"Twitter"}
                      value={twitterTemp}
                      className={classes.root}
                      size={'small'}
                      sx={{display: displaySocial, marginTop: -1.5}}
                      onChange={handleOnChangeTwitter}
                    >
                    </TextField>
                  </ThemeProvider>
                </Grid>

                {/******************* LinkedIn Icon *****************/}
                <Grid item xs={0.6} sx={{display: "flex"}}>
                  <IconButton sx={{padding: 0}} href={linkedInLink} underline="none" target="_blank" rel="noreferrer">
                    <LinkedInIcon color={"secondary"}/>
                  </IconButton>
                </Grid>

                {/****** LinkedIn Handle *****/}
                <Grid item xs>
                  <Link href={linkedInLink} underline="none" target="_blank" rel="noreferrer">
                    <Typography color={"white"} align={"left"}
                                sx={{fontSize: "1rem", display: displayAboutMeText}}>{linkedIn}
                    </Typography>
                  </Link>

                  {/****** LinkedIn Hidden Edit Text Field *****/}
                  <ThemeProvider theme={textFieldTheme}>
                    <TextField
                      color="secondary"
                      variant={"filled"}
                      label={"LinkedIn"}
                      value={linkedInTemp}
                      className={classes.root}
                      size={'small'}
                      sx={{display: displaySocial, marginTop: -1.5}}
                      onChange={handleOnChangeLinkedIn}
                    >
                    </TextField>
                  </ThemeProvider>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/******************************* Skill Listings *******************************/}
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          marginTop: 1,
          maxWidth: 948,
          flexGrow: 1,
          border: "0.5px solid",
          borderColor: "primary.light",
          height: 450
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper elevation={3} sx={{height: 450}}>
              Placeholder
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={3} sx={{height: 450}}>
              Placeholder
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={3} sx={{height: 450}}>
              Placeholder
            </Paper>
          </Grid>
        </Grid>

      </Paper>


      {/******************************* Write a Review Button *******************************/}
      <Box sx={{maxWidth: 980, flexGrow: 1, marginTop: 1, marginX: "auto"}}>
        <Button variant="contained" color="secondary" fullWidth={true} onClick={handleWriteReview}>
          {/*<Button variant="contained" color="secondary" fullWidth={true} onClick={() => setCount(1)}>*/}
          Write a review
        </Button>
      </Box>

      {/******************* Add a new review *****************/}
      <div style={{display: displayNewReview}}>
        <Reviews
          // avatar={"https://mui.com/static/images/avatar/6.jpg"}
          avatar=""
          name="[Logged user's name]"
          rating={5}
          location="[Logged user's location]"
          message=""
          newReview={newReview}
          onClick={() => { handleCancelWriteReview() }}
        />
      </div>

      {/******************* Reviews *****************/}
      {reviewList}

    </Box>
  );
}

const reviewMessages = [
  {
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    name: 'Charlie A.',
    rating: 4.5,
    location: 'United States',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
      'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.'
  },
  {
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    name: 'David  B.',
    rating: 4,
    location: 'Spain',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
      'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.'
  },
  {
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    name: 'Samantha F.',
    rating: 5,
    location: 'U.K.',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
      'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.'
  },
];