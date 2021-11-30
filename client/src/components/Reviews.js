import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import {styled} from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import {Fade, Rating, TextField} from "@mui/material";
import {Theme} from "./Theme";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {retrieveData} from "./DataStorage";
import axios from "axios";

export default function Reviews(props) {

  const token = retrieveData('token');
  const [review, setReview] = useState({
    avatar: props.avatar,
    userID: props.userID,
    reviewerName: props.reviewerName,
    rating: props.rating,
    message: props.message,
    newReview: props.newReview,
    reviewerID: props.reviewerId
  });

  const [reviewMessage, setReviewMessage] = useState(props.message);
  const [rating, setRating] = useState(props.rating);
  const [newReview, setNewReview] = useState(props.newReview);

  // Variable for displaying the multiline Text field to edit a review message (use display: inline-flex to display it)
  const [displayEditableMessage, setDisplayEditableMessage] = useState("none");

  // Variable for displaying the review message (the uneditable review text message)
  const [displayReviewMessage, setDisplayReviewMessage] = useState("block");  // block

  const [inEditMode, setInEditMode] = useState(false);
  const [displayEditButton, setDisplayEditButton] = useState("none");
  const [editPermission, setEditPermission] = useState(false);
  const [displayButtons, setDisplayButtons] = useState("none");
  const [fadeIn, setFadeIn] = useState(false);
  const [reviewMessageTemp, setReviewMessageTemp] = useState("");
  const [reviewRatingTemp, setReviewRatingTemp] = useState(5);
  const [displayRating, setDisplayRating] = useState("inline-flex");
  const [displayEditableRating, setDisplayEditableRating] = useState("none");
  const [displayDeleteButton, setDisplayDeleteButton] = useState("none");

  // Allows custom rating starts
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

  function enterEditMode() {
    setInEditMode(true);                      // Turns edit mode on (set variable to true)
    setDisplayEditButton("none");             // Hides the edit button
    setDisplayReviewMessage("none");          // Hides the uneditable review text (the current review text)
    setDisplayRating("none");                 // Hides the Star Rating
    setDisplayEditableMessage("inline-flex"); // Displays the editable multiline text fields (the new review text)
    setDisplayButtons("inline-flex");         // Displays the save and cancel button
    if(!newReview){
      setDisplayDeleteButton("inline-flex");
    } else {
      setDisplayDeleteButton("none");
    }
    setDisplayEditableRating("inline-flex");  // Displays the start Editable Rating
    setFadeIn(true);                          // Tells the buttons to fade in
    setReviewMessageTemp(reviewMessage);            // Saves the current text in a temp variable
    setReview({
      ...review,  // Leaves the rest of the variables unchanged
      ratingReadOnly: false                         // Sets the star rating to be editable
    });
    setReviewRatingTemp(rating);                    // Saves the current rating in a temp variable

  }

  function exitEditMode() {
    setInEditMode(false);                     // Turn edit mode off
    setDisplayEditButton("inline-flex");      // Displays the edit button
    setDisplayButtons("none");                // Hides the Cancel and Save buttons
    setDisplayDeleteButton("none");           // Hides the Delete button
    setDisplayEditableMessage("none");        // Hides the Editable multiline review text Message
    setDisplayEditableRating("none");         // Hides the start Editable Rating
    setDisplayReviewMessage("block");         // Displays the uneditable review text message
    setDisplayRating("inline-flex");          // Displays the Star Rating
    setFadeIn(false);                         // Tells the button to fade out
    setReview({
      ...review,  // Leaves the rest of the variables unchanged
      ratingReadOnly: true                         // Sets the start rating to read only (so, it can't be edited)
    });
  }


  function handleCancelButton() {
    // Close the new "Write a review" section
    if(newReview) {
        props.onClick() // Passes the onClick event to the parent (parent will close it)
    } else {
      exitEditMode();
    }
  }

  // Handles the onClick event of the Save button
  function handleSave() {

    setReviewMessage(reviewMessageTemp);
    setRating(reviewRatingTemp);

    if(newReview) {

      // Set this review as an NOT a new Review.
      setNewReview(false);

      const URL = "/api/review/create-review";
      const config = {headers: {Authorization: `Bearer ${token}`}};

      const data = {
        subjectId: props.userID,
        rating: reviewRatingTemp,
        content: reviewMessageTemp,
      }

      // Saves the review
      axios.post(URL, data, config).catch(console.log);
    }
    // If the review is an existing review, then send a edit request
    else {
      const URL = "/api/review/edit-review";
      const config = {headers: {Authorization: `Bearer ${token}`}};

      const data = {
        reviewId: props.reviewId,
        newRating: reviewRatingTemp,
        newContent: reviewMessageTemp,
      }

      // Saves the review
      axios.patch(URL, data, config).catch(console.log);
    }

    exitEditMode();
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

  function handleOnChangeMessage(e) {
    setReviewMessageTemp(e.target.value);
  }

  useEffect(() => {

    if(props.loggedUserId === props.reviewerId) {
      setEditPermission(true);
    }

    if(newReview) {
      enterEditMode()
    }

  }, []);

  // Constant for the Delete Review Dialog
  const [open, setOpen] = React.useState(false);

  // Handles the open event for the Delete Review Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handles the close event for the Delete Review Dialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteReview = () => {
    const URL = `/api/review/delete-review/${props.reviewId}`;
    const config = {headers: {Authorization: `Bearer ${token}`}};

    // Saves the review
    axios.delete(URL, config).catch(console.log);

    setOpen(false);
    exitEditMode();
    props.onClick(props.reviewId);
  }

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        marginTop: 1,
        maxWidth: 948,
        flexGrow: 1,
        border: "0.5px solid",
        borderColor: "primary.light"

      }}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
    >
      <Grid container spacing={2} rowSpacing={2}>

        {/*********************************** Picture  ************************************/}
        <Grid item sx={{alignItems: "flex-start"}}>
          <Avatar alt="User Pic" src={props.avatar}/>
        </Grid>

        {/****************************** Right Container ************************************/}
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>

              <Stack direction="row" spacing={2}>

                {/*********************************** Name  ************************************/}
                <Typography variant="subtitle1" component="div">
                    {/*{props.name}*/}
                  {review.reviewerName}
                </Typography>

                {/*********************************** Rating  ************************************/}
                <Box sx={{marginTop: 5, justifyContent: "center", display: displayRating}} >
                  <StyledRating
                    value={rating}
                    precision={1}
                    icon={<StarIcon fontSize="inherit"/>}
                    emptyIcon={<StarBorderOutlinedIcon fontSize="inherit"/>}
                    readOnly={true}
                  />
                </Box>

                {/*********************************** Rating Editable  ************************************/}
                <Box sx={{marginTop: 5, justifyContent: "right", display: displayEditableRating}} >
                  <StyledRating
                    value={reviewRatingTemp}
                    precision={1}
                    icon={<StarIcon fontSize="inherit"/>}
                    emptyIcon={<StarBorderOutlinedIcon fontSize="inherit"/>}
                    onChange={(event, newValue) => {setReviewRatingTemp(newValue)}}
                  />
                </Box>


                {/******************************* Edit Button  ************************************/}
                <Box>
                  <IconButton color="warning"
                              aria-label="edit review button"
                              onClick={enterEditMode}
                              sx={{display: displayEditButton, padding:0, height:28}}>
                    <EditIcon/>
                  </IconButton>
                </Box>

              </Stack>

              {/*********************************** Message  ************************************/}
              <Typography variant="body2" color="text.secondary" sx={{textAlign: "left", display:displayReviewMessage}}>
                {reviewMessage}
              </Typography>

              {/*********************************** Edit Message  ************************************/}
              <TextField
                id="outlined-textarea"
                label="Write a review"
                placeholder="Write your review here"
                color="warning"
                multiline
                rows={3}
                fullWidth
                sx={{display:displayEditableMessage, marginTop:2}}
                value={reviewMessageTemp}
                onChange={handleOnChangeMessage}
              />

              <Stack
                direction="row"
                justifyContent="space-evenly"
              >

                {/******************** Delete Review Button *********************/}
                <Fade in={fadeIn}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClickOpen}
                    sx={{marginTop:2, padding: "6px 35px", display: displayDeleteButton}}
                  > Delete Review
                  </Button>
                </Fade>

                {/******************** Cancel Button *********************/}
                <Fade in={fadeIn}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCancelButton}
                    sx={{marginTop:2, padding: "6px 64px", display: displayButtons}}
                  > Cancel
                  </Button>
                </Fade>

                {/******************** Save Button *********************/}
                <Fade in={fadeIn}>
                  <Button
                    color="secondary"
                    startIcon={<SaveIcon/>}
                    variant="contained"
                    onClick={() => handleSave()}
                    sx={{marginTop:2, padding: "6px 64px", display: displayButtons}}
                  >
                    Save
                  </Button>
                </Fade>

              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/******************** Delete Confirmation Dialog *********************/}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-Delete-Review?"
          aria-describedby="alert-dialog-this-cannot-be- undone"
        >
          <DialogTitle>Delete Review?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Warning! This cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            {/***** Yes, Delete - Button **/}
            <Button
              variant="contained"
              onClick={() => handleDeleteReview()}
              color="error"
            >
              Yes, Delete
            </Button>

            {/***** Cancel, Keep - Button **/}
            <Button
              variant="outlined"
              onClick={handleClose}
              autoFocus
            >
              Cancel, Keep
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    </Paper>
  );
}