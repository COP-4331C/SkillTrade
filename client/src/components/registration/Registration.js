import React, {useState} from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import {Alert, Collapse, FormHelperText} from "@mui/material";


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

  //got no clue what these are for - but MUI has them!
const handleMouseDown = (event) => {
    event.preventDefault();};

const handleMouseDownConfirm = (event) => {
    event.preventDefault();};


  // Stores the password in the password variable
const handleChangePasswordField = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });};

  // Verification for eveything
const verification_length = 8

function validateInputLength() {
    if(values.password.length >= verification_length)
        return 1}

function valid(){
    if(values.password !== values.confirm)
        return false;
    else if(values.password === values.confirm)
        return 1;}

function validEmail(){
    if(email.length >1)
        return 1;}

function validFirstName(){
    if(firstName.length>=1 && firstName.length<50)
        return 1;}


  //error messages
  //password valiadation variable
    const [pwdError, setPwdError] = useState( {
        state: false,
        text: ""
        });

    const [confirmError, setconfirmError] = useState( {
        state: false,
        text: ""
        });

    const [confirmName, setConfirmName] = useState( {
        state: false,
        text: ""
        });

//submit handeler
function handleSubmitButton(event) {
    event.preventDefault();

    setOpenMessage(false);

    setPwdError({
        state: false,
        text: ""
    });

    setconfirmError({
        state: false,
        text: ""
    });

    setConfirmName({
      state: false,
      text: ""
    });
    
    if (validateInputLength()&&valid() ) {

        const URL = './api/user/register';

        const registerPayload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: values.password
        };

        axios.post(URL, registerPayload)
            .then(function (response) { 
                alert("Registration successful!" );
                console.log(response);
                window.location.href='/Login';
              })
                

            .catch(function (error) {
                setOpenMessage(true);});

    //If any of the validation function fails
    } 
    else if(validateInputLength()!==1) {
      setPwdError({
        state: true,
        text: "Minimum password is 8 characters"
      });
    }

    else if (valid()!==1){
        setconfirmError({
            state: true,
            text: "Passwords do not match, please check again!"
          });
    }

    else if (validFirstName()!==1){
      setConfirmName({
          state: true,
          text: "Please Enter valid First Name"
        });
  }
  }

/////////////////Interface/////////////////

  return (
    <Grid>
      <form onSubmit={handleSubmitButton}>
        <Paper elevation={3} style={{padding: 40, height: '50vh', width: 280, margin: '20px auto'}}>

          {/********************* Icon and title *********************/}
          <Grid align='center'>
            <Avatar style={{backgroundColor: '#0031FF'}}>
              <LockOutlinedIcon/>
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
              <item>
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
              </item>
              <FormHelperText id="component-error-text">{confirmName.text}</FormHelperText>
          </FormControl>
        </Grid>
          
        
          {/********************* LN Text Field *********************/}
          <Grid item xs ={6}>
          <item>
          <TextField
            
            fullWidth
            label="Last Name"
            placeholder="Enter Last Name"
            variant="standard"
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
            type="text"
          />
          </item>
          
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
          <FormControl sx={{  width: "100%"  }} variant="standard" required error={pwdError.state}>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChangePasswordField('password')}
              placeholder="Enter Password"

              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDown}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="component-error-text">{pwdError.text}</FormHelperText>
          </FormControl>

          <FormControl sx={{  width: "100%"  }} variant="standard" required required error={confirmError.state}>
            <InputLabel htmlFor="standard-adornment-confirm">Confirm Password</InputLabel>
              <Input
                id="standard-adornment-confirm"
                type={values.showConfirm ? 'text' : 'password'}
                value={values.confirm}
                onChange={handleChangePasswordField('confirm')}

                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirm}
                      onMouseDown={handleMouseDownConfirm}
                    >
                      {values.showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-error-text">{confirmError.text}</FormHelperText>
          </FormControl>

          {/********************* Sign in button *********************/}
          {/* <Link underline="hover"component={RouterLink} to="/Login"> */}
            <Button
              type='submit'
              color='primary'
              variant='contained'
              fullWidth
              style={{ margin: '20px 0' }}
            >
              Register
            </Button>
          {/* </Link> */}

          {/*********************  Forgot my password *********************/}
          <Typography>
            <Link
              href='#'
              underline='hover'
              color='primary'
              fontSize='0.9rem'
              marginY='20px'
            >
              Forgot my password
            </Link>
          </Typography>

          {/********************* already have an account  *********************/}
          <Typography fontSize="0.9rem" align="center">Already have an account?{' '}
            <Link underline="hover" component={RouterLink} to="/Login">Login</Link>
          </Typography>

        </Paper>
      </form>
    </Grid>
  );
}