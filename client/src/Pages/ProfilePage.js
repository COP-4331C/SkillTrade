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
import EditProfile from '../components/EditProfile';
import {Box, grid} from '@mui/system';
import whoa from '../whoa.jpeg';
import { styled } from '@mui/material/styles';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import {Theme} from "../components/Theme";

export default function ProfilePage() {

  const [readOnlyState, setReadOnlyState] = useState(true);
  const [fade, setFade] = useState(false);
  const [displayButton, setDisplayButton] = useState("none");
  const [displayContactMe, setDisplayContactMe] = useState("inline-flex");
  const [displayEditButton, setDisplayEditButton] = useState("none")

  // Handles the onClick event of the edit button.
  function handleEnterEditMode() {
    setReadOnlyState(false);        // Disable fields read only (Make them editable)
    setDisplayButton("inline-flex") // Shows the save and cancel button
    setDisplayContactMe("none");    // Hides the contact me button
    setFade(true);                  // Tells the buttons to fade in
  }

  // Handles the onClick event of the Save button
  function handleSave() {
    handleCancel();
  }

  // Handles the onClick event of the Cancel button
  function handleCancel() {
    setReadOnlyState(true);             // Enable fields read only (Make them non-editable)
    setDisplayButton("none");           // Hides the Cancel and Save buttons
    setDisplayContactMe("inline-flex"); // Displays the Contact Me button
    setFade(false);                     // Tells the button to fade out
  }

  function handleOnMouseOver() {
    setDisplayEditButton("inline-block");
  }

  function handleOnMouseLeave() {
    setDisplayEditButton("none");
  }

  // Allows a custom rating starts
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: Theme.palette.secondary.main
    }
  });

  return (
    <Grid>
      <AppNavBar/>
      <Box
        sx={{
          p: 2,
          // bgcolor: 'background.default',
          display: 'grid',
          gridTemplateColumns: {md: '1fr 1fr'},
          gap: 2,
        }}>


        {/* //1ST component paper// */}
        <Paper
          variant="outlined"
          elevation={3}
          style={{
            position: 'left',
            borderColor: "black",
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            height: '25vh',
            width: 500,
            backgroundColor: 'lightBlue',
            borderRadius: 20,
            borderWidth: 2,
            marginTop: 50,
            marginLeft: 20
          }}
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
        >
          <Grid container direction="row" spacing={3} justifyContent="center" alignItems="flex-start" sx={{height:70}}>
            <Grid item xs>
              {/* This is a spacer for the left of the user's photo - Do not delete */}
            </Grid>

            {/********************* Profile Image *********************************/}
            <Grid item xs>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <img style={{
                  marginTop: -50,
                  width: 70,
                  height: 70,
                  borderRadius: 200 / 2,
                  border: "2px solid",
                  borderColor: 'black'
                }}
                     src={whoa} alt="User"/>
              </Box>
            </Grid>

            {/********************* Edit Button *********************************/}
            <Grid item xs>
              <Box sx={{textAlign: "right"}}>
                <IconButton color="primary" aria-label="edit" onClick={handleEnterEditMode} sx={{display: displayEditButton}}>
                  <EditOutlinedIcon/>
                </IconButton>
              </Box>
            </Grid>

          </Grid>

            <Grid container spacing={2} justifyContent="center" paddingTop={2} >

            {/******************** First Name *********************/}
            <Grid item xs>
              <TextField
                label="First Name"
                defaultValue="John"
                InputProps={{readOnly: readOnlyState}}
                // sx={{padding:0}}
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
          <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'safe center', flexWrap: "wrap-reverse"}}>
            <Fade in={fade}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 30, padding:"6px 64px"}}
                onClick={handleCancel}
                sx={{display: displayButton}}
              > Cancel
              </Button>
            </Fade>

            {/******************** Contact Me Button *********************/}
            <Fade in={!fade}>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={{marginTop: 30}}
                startIcon={<ForumOutlinedIcon/>}
                sx={{display: displayContactMe, whiteSpace: 'nowrap'}}
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
                style={{marginTop: 30, padding:"6px 64px"}}
                onClick={handleSave}
                sx={{display: displayButton}}
              >
                Save
              </Button>
            </Fade>
          </Box>

          {/******************** Rating *********************/}
          <Box sx={{marginTop: 1}} >
            <StyledRating
              defaultValue={4.5}
              precision={0.5}
              icon={<StarIcon fontSize="inherit"/>}
              emptyIcon={<StarBorderOutlinedIcon fontSize="inherit" />}
              readOnly
            />
          </Box>

        </Paper>
      </Box>

      {/* /////////////////////////////////////////////////////////////////////////// */}

      <Box
        sx={{
          p: 2,
          bgcolor: 'background.default',
          display: 'grid',
          gridTemplateColumns: {md: '1fr 1fr'},
          gap: 2,
        }}>

        {/* //2nd component paper// */}
        <Paper variant="outlined" elevation={3} style={{
          position: 'left',
          borderColor: "black",
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          height: '10vh',
          width: 500,
          backgroundColor: 'lightBlue',
          borderRadius: 20,
          borderWidth: 2,
          marginTop: 20,
          marginLeft: 20
        }}>
        </Paper>

        <Grid container spacing={4} justifyContent="center" paddingTop={2}>

          <Grid item xs={3}>
            <FormControl>
              <item>

              </item>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl>
              <item>

              </item>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl>
              <item>

              </item>
            </FormControl>
          </Grid>

        </Grid>
      </Box>

    </Grid>
  );
}