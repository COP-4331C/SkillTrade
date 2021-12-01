import React, {useEffect, useState} from 'react';
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
import InputLabel from "@mui/material/InputLabel";
import {Alert, Collapse, FormHelperText} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import {storeData} from "../components/DataStorage";
import {Theme} from "../components/Theme";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppNavBar from '../components/AppNavBar';

// TODO Improvement: The wrong credentials message and the minimum password length message
//      pushes components out of the way (Pushes them down). Try to avoid it.

export default function LoginPage() {

  //***************************************** //
  //     Global Variables and constants
  //***************************************** //
  const MIN_PASSWORD_LENGTH = 8
  const MAX_LENGTH = 50

  // Variable for password validation feedback to users (true = red color)
  const [pwdError, setPwdError] = useState( {
    state: false,
    text: ""
    });

  // Email variable
  const [email, setEmail] = useState("");

  // Variable for email validation feedback to users (true = red color)
  const [emailError, setEmailError] = useState({
        state: false,
        text: ""
      }
  );

  // Password variable and its state to show or not
  const [values, setValues] = useState({
    password:'',
    showPassword: false
  });

  // Variable to open and close the wrong credentials error message
  const [openMessage, setOpenMessage] = useState(false);

  // Variable to store the remember me checkbox
  const [rememberMe, setRememberMe] = useState(false);

  // Variable to set the Invalid email or password message
  const [serverErrorMessage, setServerErrorMessage] = useState('Error');

  // **************************************** //
  //           Helper Functions
  // **************************************** //

  // Toggles the show password button (eye icon)
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // Stores the password in the password variable
  const handleChangePasswordField = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Email and password length validation
  function validateInputLength() {
    const password = values.password.length;
    let isValid = true;

    if (email.length > MAX_LENGTH) {
      setEmailError( {
        state: true,
        text: "Email must be less than 50 characters"
      })
      isValid = false;
    }

    if (password < MIN_PASSWORD_LENGTH) {
      isValid = false;

      setPwdError({
        state: true,
        text: "Minimum password is 8 characters"
      });

    } else if (password > MAX_LENGTH) {
      isValid = false;

      setPwdError({
        state: true,
        text: "Password must be less than 50 characters "
      });
    }

    return isValid;
    // Note about email validation:
    // Email and password length of 0 is handled by html
    // Email format validation is partially handled by html
    // (it only requires at least a char before and after the @ sign)
  }

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  // Handles the submit button in the event of a click
  function handleSubmitButton(event) {
    event.preventDefault();

    // Hide the wrong Credentials message
    setOpenMessage(false);

    // Clears the error message underneath the password field and
    // the email field (if any error were displayed).
    setPwdError({ state: false, text: "" });
    setEmailError({ state: false, text: "" });

    // If it passes validation, continue
    if (validateInputLength()) {

      try {
        // Store the state of the checkbox in the browser's local storage
        // Only store the email if the checked box is checked.
        // localStorage.setItem('rememberMe', rememberMe.toString());
        localStorage.setItem('rememberMe', JSON.stringify(rememberMe.toString()));
        localStorage.setItem('email', rememberMe ? JSON.stringify(email) : '');
      } catch (e){
        console.log(e.message);
      }

      // Assembles the data to be used by Axios
      const URL = './api/auth/login';
      const loginPayload = {
        email: email,
        password: values.password
      };

      // Sends the login credentials to the backend server
      axios.post(URL, loginPayload)
        .then(function (response) {
          storeData('token', response.data.accessToken);
          // flash('success message ...');

          // Send user to the home page
          window.location.href = '/home';
        })
        .catch(function (error) {
          // Show the wrong credentials message
          setServerErrorMessage(error.response.data.error);
          setOpenMessage(true);

          console.log("Error data:", error.response.data);
          console.log("Error status:", error.response.status);
        });
    }
  }

  // Store the state (true or false) of the checkbox in the rememberMe variable.
  const handleCheckBoxChange = (event) => {
    setRememberMe(event.target.checked);
  }

  // Loads the email from the local storage if the remember me box was previously checked
  useEffect(() => {
    try {
      const storage = localStorage.getItem("rememberMe");

      if (storage != null) {

        // Reads the local storage
        let localStorageRememberMe = JSON.parse(localStorage.getItem('rememberMe')) === 'true';

        // Only set the email if RememberMe is true
        if (localStorageRememberMe) {

          // Set the email
          setEmail(JSON.parse(localStorage.getItem('email')));

          // Initiates the RememberMe Checkbox with local storage
          setRememberMe(localStorageRememberMe);
        }
      }

    } catch (e) {
      console.log(e.message);
    }

  }, []);

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  window.location.href='/Login';
};

  function handleFrogot(){

    const payload ={
      email : email
    };

    axios.post(`/api/user/forgot-password`,payload)
    .then(function(res) {
      setOpen(false);
      
  })
  .catch((err) => {
    console.log(err);
  })
  
  // exitEditMode();
  // refreshPage() ;
  }
  // **************************************** //
  //                  GUI
  // **************************************** //

  return (
    <Grid >
      <AppNavBar/>
              {/* <NavBar/> */}

      <form onSubmit={handleSubmitButton} >

        {/* <Box sx={{ display: "flex", width: 350, maxWidth: { xs: 270, sm: 350 } }} > */}
        {/*<Paper elevation={3} style={{padding: 40, width: 280, margin: '20px auto'}}>*/}
        {/*  <Paper elevation={3} style={{padding: 40, width: 230, margin: '20px auto'}}>*/}
        {/*  <Paper elevation={3} style={{padding: 40, width: "100%", margin: '0 auto'}}>*/}
            <Paper elevation={3} style={{padding: 30,height: 'auto', width: 280, margin: '20px auto'}}>


          {/* ***************** X (Button to close)********************
          <IconButton
              aria-label="close"
              onClick={() => props.onClick()}
              // sx={{ position: 'absolute', right: 20, top: 20 }}
              sx={{ position: 'absolute', right: 45, top: 20 }}
          >
            <CloseIcon />
          </IconButton> */}

          {/********************* Icon and title *********************/}
          <Grid align='center'>
            <Avatar style={{backgroundColor: Theme.palette.primary.main}}>
              <LockOutlinedIcon/>
            </Avatar>
            <h2>Sign in</h2>
          </Grid>

          {/********************* Wrong credentials message ******************** */}
          {/* (a hidden alert). Visible only with wrong credentials */}
          <Collapse in={openMessage}>
            <Alert severity="error" sx={{ mb: 2 }}>
              <strong>{serverErrorMessage}</strong>
            </Alert>
          </Collapse>

          {/********************* email Text Field *********************/}
          <TextField
            required
            fullWidth
            label="Email"
            placeholder="Enter email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            helperText={emailError.text}
            error={emailError.state}
          />

          {/********************* Password field *********************/}
          <FormControl sx={{ margin: "16px 16px 0 0", width: "100%"  }} variant="standard" required error={pwdError.state}>
          {/*<FormControl sx={{ margin: "16px 16px 0 0", width: "auto"  }} variant="standard" required error={pwdError.state}>*/}
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChangePasswordField('password')}
              placeholder="Enter Password"
              autoComplete="on"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDown}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="component-error-text">{pwdError.text}</FormHelperText>
          </FormControl>

          {/********************* Remember me checkbox *********************/}
          <FormControlLabel
            control={
              <Checkbox color="primary" checked={rememberMe} onChange={handleCheckBoxChange}/>}
            label="Remember me"
          />

          {/********************* Sign in button *********************/}
          <Button
            type='submit'
            color='secondary'
            variant='contained'
            fullWidth
            style={{ margin: '8px 0' }}
          >
            Sign in
          </Button>

          {/*********************  Forgot my password *********************/}

          <Button onClick={handleClickOpen}> Forgot Password </Button>

            <div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Forgot Your Password!</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please click the subnit button below and you will receive a link via your verified email to reset your password. 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={handleFrogot}>Submit</Button>
                </DialogActions>
              </Dialog>
            </div>

          {/********************* No Account? Create one! *********************/}
          <Typography fontSize="0.9rem" align="center">No account?{' '}
            <Link underline="hover" component={RouterLink} to="/registration">Create one!</Link>
          </Typography>

        </Paper>
        {/* </Box> */}
      </form>
    </Grid>
  );
}