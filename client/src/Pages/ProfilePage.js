import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Divider, Fade, Rating, Stack, ThemeProvider } from "@mui/material";
import { styled } from '@mui/material/styles';
import SaveIcon from "@mui/icons-material/Save";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import { Theme } from "../components/Theme";
import { grey } from "@material-ui/core/colors";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, makeStyles } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Link from "@mui/material/Link";
import HomeNavBar from "../components/HomeNavBar";
import Reviews from "../components/Reviews";
import { retrieveData } from "../components/DataStorage";
import Testcard from '../components/Testcard';
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';
import { Paper } from '@mui/material';


export default function ProfilePage(props) {
  const token = retrieveData('token');
  const [aboutMeText, setAboutMeText] = useState("");
  const [fade, setFade] = useState(false);
  const [displayNames, setDisplayNames] = useState("inline-flex");
  const [displayButton, setDisplayButton] = useState("none");
  const [displayContactMe, setDisplayContactMe] = useState("inline-flex");
  const [displayEditButton, setDisplayEditButton] = useState("none");
  const [displayEditFields, setDisplayEditFields] = useState("none");
  const [displayAboutMeText, setDisplayAboutMeText] = useState("block")
  const [displaySocial, setDisplaySocial] = useState("none");
  const [inEditMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMeTextTemp, setAboutMeTextTemp] = useState("");
  const [firstNameTemp, setFirstNameTemp] = useState("");
  const [lastNameTemp, setLastNameTemp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagramTemp, setInstagramTemp] = useState("");
  const [twitterTemp, setTwitterTemp] = useState("");
  const [linkedInTemp, setLinkedInTemp] = useState("");
  const [imageOpacity, setImageOpacity] = useState(1);
  const [photo, setPhoto] = useState("");
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
  let loggedUserId;
  const [loggedUserFirstName, setLoggedFirstName] = useState("");
  const [loggedUserLastName, setLoggedLastName] = useState("");
  const [loggedUserAvatar, setLoggedUserAvatar] = useState("");
  const [reviewMessages, setReviewMessages] = useState([]);
  const [newReviewForm, setNewReviewForm] = useState([]);
  const [displayNewReview, setDisplayNewReview] = useState("none");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [cityTemp, setCityTemp] = useState("");
  const [stateTemp, setStateTemp] = useState("");
  const [countryTemp, setCountryTemp] = useState("");
  const [cityTextError, setCityTextError] = useState({
    state: false,
    text: ""
  })
  const [stateTextError, setStateTextError] = useState({
    state: false,
    text: ""
  })
  const [countryTextError, setCountryTextError] = useState({
    state: false,
    text: ""
  })
  const [loading, setLoading] = useState(true);
  const userId = props.match.params?.userId ?? ""   // Gets user Id from URL
  const [loggedUserIdForReviews, setLoggedUserIdForReviews] = useState("");
  const [rating, setRating] = useState(0);


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
    setCityTemp(city);
    setStateTemp(state);
    setCountryTemp(country);
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

    const MAX_ABOUT_ME_TEXT = 500;
    if (!validateTextMaxLength(aboutMeTextTemp, MAX_ABOUT_ME_TEXT)) {
      okToSaveData = false
      setAboutMeTextError({
        state: true,
        text: `Must be less than ${MAX_ABOUT_ME_TEXT} characters (There are ` + aboutMeTextTemp.length + ")"
      });
    }

    if (!validateTextMaxLength(cityTemp, 15)) {
      okToSaveData = false
      setCityTextError({
        state: true,
        text: `Maximum 15 chars`
      })
    }

    if (!validateTextMaxLength(stateTemp, 15)) {
      okToSaveData = false
      setStateTextError({
        state: true,
        text: `Maximum 15 chars`
      })
    }

    if (!validateTextMaxLength(countryTemp, 15)) {
      okToSaveData = false
      setCountryTextError({
        state: true,
        text: `Maximum 15 chars`
      })
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
      setCity(cityTemp);
      setState(stateTemp);
      setCountry(countryTemp);

      // Send data to backend
      const URL = "./api/user/edit-profile";
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const data = {
        firstName: firstNameTemp,
        lastName: lastNameTemp,
        aboutMe: aboutMeTextTemp,
        instagram: instagramHandle,
        twitter: twitterHandle,
        linkedIn: linkedInHandle,
        city: cityTemp,
        state: stateTemp,
        country: countryTemp
      }

      // Saves the Profile data
      axios.put(URL, data, config).catch(console.log)
      // .then(console.log).catch(console.log);

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
      setDisplayEditButton("inline-flex");
    }
  }

  function handleOnMouseLeave() {
    if (!inEditMode && editPermission) {
      setDisplayEditButton("none");
    }
  }

  // function handleContactMe() {
  //   alert("Coming Soon! \n\n" +
  //     "BTW: There are 10 types of people in the world...\n" +
  //     "Those who understand binary, and those who don't!")
  // }

  function handleOnChangeAboutMeText(e) {
    setAboutMeTextTemp(e.target.value);
  }

  function handleOnChangeFirstName(e) {
    setFirstNameTemp(e.target.value);
  }

  function handleOnChangeLastName(e) {
    setLastNameTemp(e.target.value);
  }

  function handleOnChangeCity(e) {
    setCityTemp(e.target.value);
  }

  function handleOnChangeState(e) {
    setStateTemp(e.target.value);
  }

  function handleOnChangeCountry(e) {
    setCountryTemp(e.target.value);
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

    if (editPermission) {

      const URL = "/api/user/upload-profile-pic";
      const config = {
        headers: { Authorization: `Bearer ${token}`, 'content-type': 'multipart/form-data' }
      };

      // Saves the profile picture
      axios.post(URL, formData, config)
        .then(function (response) {
          setPhoto(response.data.URL);
          setLoggedUserAvatar(response.data.URL);
        })
        .catch(console.log);
    }
  }


  const getProfileData = async () => {
    let userIdToFetchReviewsFor;

    // Fetches the logged user's Id
    try {
      const response = await axios.get(
        "/api/user/id",
        {headers: {Authorization: `Bearer ${token}`}}
      );
      // setLoggedUserId(response.data["userId"]);
      loggedUserId = response.data["userId"];
      setLoggedUserIdForReviews(response.data["userId"]);
      userIdToFetchReviewsFor = response.data["userId"];

      // userId = "" means no id was passed to the profile page
      // (like when a user's name is click in a skill card). Therefore,
      if(loggedUserId === userId || userId === "") {
        setEditPermission(true);
        setDisableImageUpload(false);
        setMousePointer("pointer");
      } else {
        setEditPermission(false);
        setDisableImageUpload(true);
        setMousePointer("");
      }

    } catch (error) {
      console.log(error);
    }

    // Gets logged user's avatar, first & last name
    try {
      const response = await axios.get(
        "/api/user/profile",
        { headers: { Authorization: `Bearer ${token}` }}
      )
      setLoggedUserAvatar(response.data["profilePic"]);
      setLoggedFirstName(response.data["firstName"]);
      setLoggedLastName(response.data["lastName"]);

    } catch (error){
      console.log(error);
    }


    // Fetches the profile data
    try {
      const response = await axios.get(
        `/api/user/profile/${!userId ? "" : userId}`,
        { headers: { Authorization: `Bearer ${token}` }}
      );

      setFirstName(response.data["firstName"]);
      setLastName(response.data["lastName"]);
      setAboutMeText(response.data["aboutMe"])
      setPhoto(response.data["profilePic"]);
      setInstagram(response.data["instagram"]);
      setTwitter(response.data["twitter"]);
      setLinkedIn(response.data["linkedIn"]);
      setCity(response.data["city"]);
      setState(response.data["state"]);
      setCountry(response.data["country"]);

      if(userId !== "") {
        userIdToFetchReviewsFor = userId;
      }

      // Fetches reviews
      axios.get(
        `/api/review/get-reviews/${userIdToFetchReviewsFor}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(function (response) {
          setReviewMessages(response.data);
        })
        .catch(console.log);

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  //fetch the Skills
  const [skillposts, setSkillPosts] = useState([]);

  function fetchSkills() {
    const token = localStorage.getItem('token');
    // const userId = "";
    axios.get(`/api/skills/user/${!userId ? "" : userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((res) => {
        setSkillPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    try {

      setInstagramLink("https://www.instagram.com/" + instagram);
      setTwitterLink("https://twitter.com/" + twitter);
      setLinkedInLink("https://www.linkedin.com/in/" + linkedIn);

      setTimeout(async () => {
        await getProfileData();
        fetchSkills();
      }, 1);

    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    setRating(ratingSum/numOfReviews);
  }, [reviewMessages]);

  let ratingSum = 0;
  let numOfReviews = 0;

  // Creates a list of reviews. For each review in reviewList
  // Render the Review component with the data passed to it.
  // reviewMessages is an array manually declared at the end of this file.
  const reviewList = reviewMessages.map((fetchedReview) => {

    ratingSum = ratingSum + fetchedReview.rating;
    numOfReviews = numOfReviews + 1;

    return(
      <div key={fetchedReview._id} id={fetchedReview._id}>
        <Reviews
          avatar={fetchedReview.authorProfilePic}
          reviewerName={fetchedReview.authorFullName}
          reviewerId={fetchedReview.authorId}
          rating={fetchedReview.rating}
          message={fetchedReview.content}
          newReview={false}
          reviewId={fetchedReview._id}
          loggedUserId={loggedUserIdForReviews}
          onClick={(reviewIdToDelete) => {
            handleDeleteReview(reviewIdToDelete)
          }}
        />
      </div>
    )}
  );

  //Ridwan testing
  const skilllist = () => {
    let content = skillposts.map((fetchedskill, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Testcard
            key={fetchedskill._id}
            skillid={fetchedskill._id}
            skilldescription={fetchedskill.summary}
            skillname={fetchedskill.title}
            skillcity={fetchedskill.city}
            skillstate={fetchedskill.state}
            skillimage={fetchedskill.imageURL}
            skilluserid={fetchedskill.userFullName}
            skilluserdirectid={fetchedskill.userId}
            skilluserpic={fetchedskill.userProfilePic}
            skillprice={fetchedskill.price}
            skillcountry={fetchedskill.country}
            skillClickableLink={false}
            skillPhotoEditable={false}
          />
        </Grid>
      )
    })
    return (
      <Grid container rowSpacing={3} columnSpacing={5}>
        {content}
      </Grid>
    )
  }



  // Removes the review from the DOM (At this point, the review has
  // been deleted from the backend already; it was done inside the
  // <Review /> component
  const handleDeleteReview = (reviewIdToDelete) => {
    const elem = document.getElementById(reviewIdToDelete);
    elem.parentNode.removeChild(elem);
  }

  const handleCancelWriteReview = () => {
    setDisplayNewReview("none");
  }

  // function handleWriteReview() {
  const handleWriteReview = () => {
    setDisplayNewReview("block");
    setNewReview(true);

    setNewReviewForm(
      <Reviews
        // avatar={"https://mui.com/static/images/avatar/6.jpg"}
        avatar={loggedUserAvatar}
        userID={userId}
        reviewerId={loggedUserId}
        reviewerName={loggedUserFirstName.concat(" ", loggedUserLastName)}
        rating={5}
        message=""
        newReview={newReview}
        location="[Not provided]"
        onClick={() => {
          handleCancelWriteReview()
        }}
      />
    );
  }

  // const userId = props.match.params?.userId ?? ""

  return (
    <Box sx={{ flex: 1 }}>
      <HomeNavBar loggedUserAvatar={loggedUserAvatar} />

      {/************************* Main Box ***********************/}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'safe center',
          flexWrap: "wrap",
          backgroundColor: Theme.palette.primary.main
        }}>
        {/************************* Left Box (Image) **********************/}
        {loading && (<Skeleton variant="rectangular" width={300} height={450} sx={{ bgcolor: "grey.500" }} />)}
        {!loading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'safe center',
              flexWrap: "nowrap",
              position: "relative",
            }}
          >
            {/** ******************* Image Upload Input ********************** **/}
            <label htmlFor="icon-button-file">
              <Input
                accept=".png, .jpg, .jpeg, .tiff, .bmp, .jfif"
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
                alt="user"
                onMouseOver={handleOnMouseOverImage}
                onMouseLeave={handleOnMouseLeaveImage}
              />
            </label>
          </Box>
        )}

        {/*********************** Right Box (Info) *******************/}
        <Box
          color={"white"}
          sx={{
            paddingLeft: '40px',
            paddingRight: '40px',
            backgroundColor: Theme.palette.primary.main,
            width: 600,
            minHeight: 450,
            borderRadius: "0 4px 4px 0",
          }}
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
        >
          {/** *********************** Names *************************** **/}


          <Box sx={{ display: displayNames, flexWrap: "wrap", width: "100%", justifyContent: "left" }}>

            <Typography
              variant={"h3"}
              sx={{
                textAlign: "left",
                marginTop: "20px",
                marginRight: "20px",
                color: "#ffb609",
                fontWeight: 600
              }}
            >
              {loading ? <Skeleton variant="h3" width={200} sx={{ bgcolor: 'grey.500' }} /> : firstName}

            </Typography>

            <Typography
              variant={"h3"}
              sx={{
                textAlign: "left",
                marginTop: "20px",
                fontWeight: 600
              }}
            >
              {loading ? <Skeleton variant="h3" width={200} sx={{ bgcolor: 'grey.500' }} /> : lastName}
            </Typography>

          {/*  /!********************* Edit Button *********************************!/*/}
          {/*  <Fade in={!fade}>*/}
          {/*    <Button*/}
          {/*      color='secondary'*/}
          {/*      variant='contained'*/}
          {/*      // style={{marginTop: 30}}*/}
          {/*      style={{ marginTop: 30, marginLeft: 20, display: displayEditButton, height: "36px" }}*/}
          {/*      startIcon={<EditIcon />}*/}
          {/*      sx={{ whiteSpace: 'nowrap' }}*/}
          {/*      onClick={enterEditMode}*/}
          {/*    >*/}
          {/*      Edit Profile*/}
          {/*    </Button>*/}
          {/*  </Fade>*/}
          </Box>

          {/** ****************** First and Last Names (Edit Mode) *************************** **/}
          <Box sx={{ display: displayEditFields, width: "100%", justifyContent: "left" }}>
            <ThemeProvider theme={textFieldTheme}>
              <TextField
                color="secondary"
                variant={"filled"}
                label={"First Name"}
                value={firstNameTemp}
                className={classes.root}
                required
                sx={{ marginRight: "1rem", marginTop: "1rem" }}
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
                sx={{ marginTop: "1rem" }}
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
            display: displayAboutMeText,
            minHeight: '200px',
          }}>
            {loading ? <Skeleton variant="rectangular" widht={600} height={200} sx={{ bgcolor: "grey.500" }} /> : aboutMeText}

          </Box>
          {/*************************** About Me Text (Edit Mode) ************************************/}
          <ThemeProvider theme={textFieldTheme}>
            <TextField
              label="About Me"
              color="secondary"
              className={classes.root}
              multiline
              variant="filled"
              rows={7}
              value={aboutMeTextTemp}
              fullWidth
              onChange={handleOnChangeAboutMeText}
              sx={{ display: displayEditFields, marginTop: "10px" }}
              helperText={aboutMeTextError.text}
              error={aboutMeTextError.state}
            />
          </ThemeProvider>

          {/******** Stack is the container for the elements below the about me text ***********************/}

          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={1}
            marginTop="15px"
          >
            {/***************** Horizontal line ***************/}
            <Divider style={{ background: 'white', border: "1px solid", marginTop: '5px' }} />

            {/** 1ST CONTAINER INSIDE THE STACK (Location) ****************************************************/}

            {/***************** City, State, Country CONTAINER ***************/}
            <Box sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-around",
            }}>

              {/***************** City  ***************/}

              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Typography sx={{ textAlign: "left", color: "#ffb609" }}>
                  {loading ? <Skeleton variant="h3" width={50} sx={{ bgcolor: 'grey.500' }} /> : "City:"}
                </Typography>

                <Typography sx={{ textAlign: "left", paddingX: 1, display: displayAboutMeText }}>
                  {loading ? <Skeleton variant="h3" width={100} sx={{ bgcolor: 'grey.500' }} /> : city}
                </Typography>

                {/** City Hidden Edit Text Field **/}
                <ThemeProvider theme={textFieldTheme}>
                  <TextField
                    color="secondary"
                    variant="filled"
                    label="Enter a city name"
                    value={cityTemp}
                    className={classes.root}
                    size='small'
                    sx={{ display: displaySocial, marginTop: -0.5, width: 150 }}
                    onChange={handleOnChangeCity}
                    helperText={cityTextError.text}
                    error={cityTextError.state}
                  >
                  </TextField>
                </ThemeProvider>
              </Stack>

              {/***************** State  ***************/}
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Typography sx={{ textAlign: "left", color: "#ffb609" }}>
                  {loading ? <Skeleton variant="h3" width={50} sx={{ bgcolor: 'grey.500' }} /> : "State:"}
                </Typography>
                <Typography sx={{ textAlign: "left", paddingX: 1, display: displayAboutMeText }}>
                  {loading ? <Skeleton variant="h3" width={100} sx={{ bgcolor: 'grey.500' }} /> : state}
                </Typography>

                {/** State Hidden Edit Text Field **/}
                <ThemeProvider theme={textFieldTheme}>
                  <TextField
                    color="secondary"
                    variant="filled"
                    label="Enter a state name"
                    value={stateTemp}
                    className={classes.root}
                    size='small'
                    sx={{ display: displaySocial, marginTop: -0.5, width: 150 }}
                    onChange={handleOnChangeState}
                    helperText={stateTextError.text}
                    error={stateTextError.state}
                  >
                  </TextField>
                </ThemeProvider>
              </Stack>

              {/***************** Country  ***************/}
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Typography sx={{ textAlign: "left", color: "#ffb609" }}>
                  {loading ? <Skeleton variant="h3" width={50} sx={{ bgcolor: 'grey.500' }} /> : "Country:"}
                </Typography>
                <Typography sx={{ textAlign: "left", paddingX: 1, display: displayAboutMeText }}>
                  {loading ? <Skeleton variant="h3" width={100} sx={{ bgcolor: 'grey.500' }} /> : country}
                </Typography>

                {/** Country Hidden Edit Text Field **/}
                <ThemeProvider theme={textFieldTheme}>
                  <TextField
                    color="secondary"
                    variant="filled"
                    label="Enter a country name"
                    value={countryTemp}
                    className={classes.root}
                    size='small'
                    sx={{ display: displaySocial, marginTop: -0.5, width: 150 }}
                    onChange={handleOnChangeCountry}
                    helperText={countryTextError.text}
                    error={countryTextError.state}
                  >
                  </TextField>
                </ThemeProvider>
              </Stack>
            </Box>

            {/** 2nd Container inside the Stack (Social Media) ***************************************************/}

            {/***************** Horizontal line ***************/}
            <Divider style={{ background: 'white', border: "1px solid" }} />

            <Box sx={{ display: "flex", flexWrap: "wrap", marginY: "20px", justifyContent: "space-around" }}>

              <Stack direction="row" sx={{ alignItems: "center" }}>

                {/***************** Instagram  Icon ****************/}
                <IconButton sx={{ padding: 0 }} href={instagramLink} underline="none" target="_blank" rel="noreferrer">
                  {loading ? <Skeleton variant="h4" width={50} sx={{ bgcolor: 'grey.500' }} /> :
                    <InstagramIcon color={"secondary"} />
                  }
                </IconButton>

                {/***** Instagram Handle *****/}
                <Link href={instagramLink} underline="none" target="_blank" rel="noreferrer">
                  <Typography color={"white"} align={"left"}
                    sx={{ fontSize: "1rem", display: displayAboutMeText, marginLeft: 0.5 }}
                  >
                    {loading ? <Skeleton variant="h4" width={100} sx={{ bgcolor: 'grey.500' }} /> : instagram}
                  </Typography>
                </Link>

                {/**** Instagram Hidden Edit Text field ****/}
                <ThemeProvider theme={textFieldTheme}>
                  <TextField
                    color="secondary"
                    variant={"filled"}
                    label={"Instagram"}
                    value={instagramTemp}
                    className={classes.root}
                    size={'small'}
                    sx={{ display: displaySocial, marginTop: -0.5, width: 165 }}
                    onChange={handleOnChangeInstagram}
                  >
                  </TextField>
                </ThemeProvider>

              </Stack>

              {/****************** Twitter Icon *******************/}
              <Stack direction="row" sx={{ alignItems: "center" }}>

                <IconButton sx={{ padding: 0 }} href={twitterLink} underline="none" target="_blank" rel="noreferrer">
                  {loading ? <Skeleton variant="h4" width={50} sx={{ bgcolor: 'grey.500' }} /> :
                    <TwitterIcon color={"secondary"} />
                  }
                </IconButton>

                {/***** Twitter Handle *****/}
                <Link href={twitterLink} underline="none" target="_blank" rel="noreferrer">
                  <Typography color={"white"} align={"left"}
                    sx={{ fontSize: "1rem", display: displayAboutMeText, marginLeft: 0.5 }}
                  >
                    {loading ? <Skeleton variant="h4" width={100} sx={{ bgcolor: 'grey.500' }} /> : twitter}
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
                    sx={{ display: displaySocial, marginTop: -0.5, width: 165 }}
                    onChange={handleOnChangeTwitter}
                  >
                  </TextField>
                </ThemeProvider>

              </Stack>

              {/******************* LinkedIn Icon *****************/}
              <Stack direction="row" sx={{ alignItems: "center" }}>

                <IconButton sx={{ padding: 0 }} href={linkedInLink} underline="none" target="_blank" rel="noreferrer">
                  {loading ? <Skeleton variant="h4" width={50} sx={{ bgcolor: 'grey.500' }} /> :
                    <LinkedInIcon color={"secondary"} />
                  }
                </IconButton>


                {/****** LinkedIn Handle *****/}

                <Link href={linkedInLink} underline="none" target="_blank" rel="noreferrer">
                  <Typography color={"white"} align={"left"}
                    sx={{ fontSize: "1rem", display: displayAboutMeText, marginLeft: 0.5 }}
                  >
                    {loading ? <Skeleton variant="h4" width={100} sx={{ bgcolor: 'grey.500' }} /> : linkedIn}
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
                    sx={{ display: displaySocial, marginTop: -0.5, width: 165 }}
                    onChange={handleOnChangeLinkedIn}
                  >
                  </TextField>
                </ThemeProvider>

              </Stack>
            </Box>

            {/***************** Horizontal line ***************/}
            <Divider style={{ background: 'white', border: "1px solid" }} />

            {/** 3rd Container inside the Stack ************************************************************/}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexWrap: "wrap",
              }}
              style={{ marginTop: "15px", marginBottom: "10px" }}
            >

              {/******************** Cancel Button *********************/}
              <Fade in={fade}>
                <Button
                  variant="outlined"
                  color="secondary"
                  // style={{marginTop: 0, padding: "6px 64px"}}
                  style={{ padding: "6px 64px" }}
                  onClick={handleCancelButton}
                  sx={{ display: displayButton }}
                > Cancel
                </Button>
              </Fade>

              {/*********************************** Rating  ************************************/}
              <Box sx={{ display: displayContactMe }}>
                {loading ? <Skeleton variant="h3" width={120} sx={{ bgcolor: 'grey.500' }} /> :
                  <StyledRating
                    defaultValue={5}
                    value={rating}
                    precision={0.5}
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={<StarBorderOutlinedIcon fontSize="inherit" sx={{color:"gray"}} />}
                    readOnly
                  />
                }
              </Box>

              {/******************** Contact Me Button *********************/}
              {/*<Fade in={!fade}>*/}
              {/*  {loading ? <Skeleton variant="h3" width={120} sx={{ bgcolor: 'grey.500' }} /> :*/}
              {/*    <Button*/}
              {/*      color='secondary'*/}
              {/*      variant='contained'*/}
              {/*      style={{ marginTop: 0 }}*/}
              {/*      startIcon={<ForumOutlinedIcon />}*/}
              {/*      sx={{ display: displayContactMe, whiteSpace: 'nowrap' }}*/}
              {/*      // onClick={handleContactMe}*/}
              {/*    >*/}
              {/*      Contact Me!*/}
              {/*    </Button>*/}
              {/*  }*/}
              {/*</Fade>*/}

              {/********************* Edit Button *********************************/}
              <Fade in={!fade}>
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ marginTop: 0, display: displayEditButton }}
                  startIcon={<EditIcon />}
                  sx={{ whiteSpace: 'nowrap' }}
                  onClick={enterEditMode}
                >
                  Edit Profile
                </Button>
              </Fade>


              {/******************** Save Button *********************/}
              <Fade in={fade}>
                <Button
                  color="secondary"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  style={{ marginTop: 0, padding: "6px 64px" }}
                  onClick={handleSave}
                  sx={{ display: displayButton }}
                >
                  Save
                </Button>
              </Fade>
            </Box>
          </Stack>

        </Box>

      </Box>

      {/******************************* Divider between Skill Listings *******************************/}

      <Grid align='center'>

        <h1 style={{ color: 'primary' }}>
          My Skills
        </h1>

        {/* <Divider variant="middle" style={{ color: 'white', border: "1px solid" }} sx={{ mb: 2 }} /> */}

      </Grid>


      {/******************************* Skill Listings *******************************/}

      <Paper
        elevation={3}
        // variant="outlined"
        square
        style={{ backgroundColor: Theme.palette.primary.main, position: "relative", borderWidth: "0px" }}
        sx={{ pt: 5, pb: 5, mt: 0, mb:5 }}
      >
        {/* <Grid align='center'>

          <h1 style={{ color: 'white' }}>
            All Skills
          </h1>

          <Divider variant="middle" style={{ color: 'white', border: "1px solid" }} sx={{ mb: 2 }} />

        </Grid> */}
        {skilllist()}
      </Paper>

      {/******************************* Write a Review Button *******************************/}
      <Box sx={{ maxWidth: 980, flexGrow: 1, marginTop: 1, marginX: "auto" }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth={true}
          onClick={handleWriteReview}
        >
          Write a review
        </Button>
      </Box>

      {/******************* Add a new review *****************/}
      <div style={{ display: displayNewReview }}>
        {newReviewForm}
      </div>

      {/******************* Reviews *****************/}
      {reviewList}


    </Box>
  );
}
