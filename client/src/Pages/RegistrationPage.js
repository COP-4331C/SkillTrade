import React, {useState} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
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
import { Link as RouterLink } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import {Alert, Collapse, FormHelperText} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppNavBar from '../components/AppNavBar';
import { Theme } from '../components/Theme';

export default function Registration() {

  const [email, setEmail] = useState("");

  const [firstName, setfirstName] = useState("");

  const [lastName, setlastName] = useState("");


  const [values, setValues] = React.useState({
    password:'',
    showPassword: false,
    confirm: '',
    showConfirm: false
  });


//error message
  const [openMessage, setOpenMessage] = useState(false);

//show password for the password field
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

//show password for the confirm password field
  const handleClickShowConfirm = () => {
    setValues({
      ...values,
      showConfirm: !values.showConfirm,
    });
  };

//
  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    setAgree(!agree);
  }

  const handleMouseDown = (event) => {
    event.preventDefault();};

  const handleMouseDownConfirm = (event) => {
    event.preventDefault();};


  // Stores the password in the password variable
  const handleChangePasswordField = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });};

  // Verification for eveything
  // const verification_length = 8

  function valid(){
    if(values.password !== values.confirm)
      return false;
    else if(values.password === values.confirm)
      return 1;}

// function validEmail(){
//     if(email.length >1)
//         return 1;}

  function validFirstName(){
    if(firstName.length>=1 && firstName.length<50)
      return 1;}


  //error messages
  //password valiadation variable
  // const [pwdError, setPwdError] = useState( {
  //     state: false,
  //     text: ""
  //     });

  const [confirmError, setconfirmError] = useState( {
    state: false,
    text: ""
  });

  const [confirmName, setConfirmName] = useState( {
    state: false,
    text: ""
  });

  const [complexity, setComplexity] = useState( {
    state: false,
    text: ""
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    window.location.href='/Login';
  };

//submit handeler
  function handleSubmitButton(event) {
    event.preventDefault();

    setOpenMessage(false);

    // setPwdError({
    //     state: false,
    //     text: ""
    // });

    setconfirmError({
      state: false,
      text: ""
    });

    setConfirmName({
      state: false,
      text: ""
    });

    setComplexity({
      state: false,
      text: ""
    });

    //  const{value} = this.state;
    const re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    const isOk = re.test(values.password);


    if (valid()&&isOk ) {

      const URL = './api/user/register';

      const registerPayload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: values.password
      };

      axios.post(URL, registerPayload)
        .then(function (response) {
          setOpen(true);
        })


        .catch(function (error) {
          setOpenMessage(true);});

      //If any of the validation function fails
    }

    else if (valid()!==1){
      // alert("Registration 1!" );
      setconfirmError({
        state: true,
        text: "Passwords do not match, please check again!"
      });
    }

    else if(!isOk){
      // alert("Registration 2!" );
      setComplexity({
        state: true,
        text: "Password too weak. Please use at-least eight characters including one symbol, lowercase & uppercase letter and one number"
      });
    }

    else if (validFirstName()!==1){
      // alert("Registration 3!" );
      setConfirmName({
        state: true,
        text: "Please Enter valid First Name"
      });


    }
  }

/////////////////Interface/////////////////

  return (
    <Grid>
      <AppNavBar/>
      {/* <NavBar/> */}
      <form onSubmit={handleSubmitButton}>
        <Paper elevation={3} style={{padding: 40, height: 'auto', width: 280, margin: '20px auto'}}>

          {/********************* Icon and title *********************/}
          <Grid align='center'>
            <Avatar style={{backgroundColor: Theme.palette.primary.main}}>
            </Avatar>
            <h2>Register</h2>
          </Grid>

          {/********************* Wrong credentials message ******************** */}
          {/* (a hidden alert). Visible only with wrong credentials */}
          <Collapse in={openMessage}>
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              <strong>Please check information provided!</strong>
            </Alert>
          </Collapse>

          {/********************* FN Text Field *********************/}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl required error={confirmName.state}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    placeholder="Enter First Name"
                    variant="standard"
                    onChange={(e) => setfirstName(e.target.value)}
                    value={firstName}
                    type="text"
                  />
                <FormHelperText id="component-error-text">{confirmName.text}</FormHelperText>
              </FormControl>
            </Grid>


            {/********************* LN Text Field *********************/}
            <Grid item xs ={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  placeholder="Enter Last Name"
                  variant="standard"
                  onChange={(e) => setlastName(e.target.value)}
                  value={lastName}
                  type="text"
                />
            </Grid>
          </Grid>


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
          />

          {/********************* Password field *********************/}
          <FormControl sx={{  width: "100%"  }} variant="standard" required error={complexity.state} >
            {/* required error={ complexity.state} */}
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
                    {values.showPassword ? <Visibility />:<VisibilityOff />  }
                  </IconButton>
                </InputAdornment>
              }
            />
            {/* <MuiFormHelperText id="component-error-text" styles="styles.helper" >{pwdError.text}</MuiFormHelperText> */}
            <FormHelperText id="component-error-text">{complexity.text}</FormHelperText>
          </FormControl>

          <FormControl sx={{  width: "100%"  }} variant="standard" required error={confirmError.state}>
            <InputLabel htmlFor="standard-adornment-confirm">Confirm Password</InputLabel>
            <Input
              id="standard-adornment-confirm"
              type={values.showConfirm ? 'text' : 'password'}
              value={values.confirm}
              onChange={handleChangePasswordField('confirm')}
              autoComplete="on"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirm}
                    onMouseDown={handleMouseDownConfirm}
                  >
                    {values.showConfirm ? <Visibility />:<VisibilityOff /> }
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="component-error-text">{confirmError.text}</FormHelperText>
          </FormControl>

          {/********************* Terms and conditions checkbox *********************/}
          <div style={{paddingTop:15}}>
            <input aria-label="terms-conditions-checkbox" type="checkbox" style={{color:"primary"}} id="agree" onChange={checkboxHandler} />
            <label>I agree to </label><a href="https://www.termsandconditionsgenerator.com/live.php?token=InuuJUo6I4Xz1FPgMfkmmri3Fj6fvJ6e" style={{ textDecoration: 'none', color:"black" }} htmlFor="agree"><b>terms and conditions</b></a>
          </div>

          {/********************* Sign in button *********************/}
          <Button
            disabled={!agree}
            type='submit'
            color='secondary'
            variant='contained'
            fullWidth
            style={{ margin: '20px 0' }}
            aria-label="Reistration Button"
          >
            Register
          </Button>

          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>User Registered!</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Welcome to SkillTrade!. Please verify your email via the link we just sent you to your email address, to enjoy our App to our fullest extent!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                {/* <Button onClick={handleClose}>Subscribe</Button> */}
              </DialogActions>
            </Dialog>
          </div>

          {/* </Link> */}

          {/********************* already have an account  *********************/}
          <Typography fontSize="0.9rem" align="center" paddingTop="20px">Already have an account?{' '}
            <Link style={{color: "blue"}} component={RouterLink} to="/Login">Login</Link>
          </Typography>

        </Paper>
        {/* </Box> */}

      </form>
    </Grid>
  );
}