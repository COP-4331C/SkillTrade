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
import AppNavBar from '../components/AppNavBar';
import { Theme } from '../components/Theme';
import {useLocation} from "react-router-dom";

// import URLSea

export default function Resetpassword() {

  const [email, setEmail] = useState("");

  const [oldPass, setoldPass] = useState("");

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

  // const styles = {
  //   helper: {
  //     color: 'red',
  //     fontSize: '.8em',
  //   }
  // }

//submit handeler
  const search = useLocation().search;
  const params = new URLSearchParams(search);

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

    console.log(isOk);

    // if (valid()&&isOk ) {

      

      const userId = params.get('userId');
      const resetCode = params.get('resetCode');

      console.log(userId);
      console.log(resetCode);
      params.get('userId')
      params.get('resetCode')

      const URL = '/api/user/reset-password';

      const resetPayload = {
  
        userId : userId,
        newPassword: values.password,
        resetCode: resetCode
      };

      axios.patch(URL, resetPayload)
        .then(function (response) {
          console.log(response);
          window.location.href='/Login';
        })


        .catch(function (error) {
          setOpenMessage(true);
          console.log(error);
        });

      //If any of the validation function fails
    // }
      // else if(validateInputLength()!==1) {
      //   setPwdError({
      //     state: true,
      //     text: "Minimum password is 8 characters"
      //   });
    // }

    // else if (valid()!==1){
    //   // alert("Registration 1!" );
    //   setconfirmError({
    //     state: true,
    //     text: "Passwords do not match, please check again!"
    //   });
    // }

    // else if(!isOk){
    //   // alert("Registration 2!" );
    //   setComplexity({
    //     state: true,
    //     text: "Password too weak. Please use at-least eight characters including one symbol, lowercase & uppercase letter and one number"
    //   });
    // }

    // else if (validFirstName()!==1){
    //   // alert("Registration 3!" );
    //   setConfirmName({
    //     state: true,
    //     text: "Please Enter valid First Name"
    //   });


    // }
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
            <h2>Reset Password</h2>
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
          {/* <Grid container spacing={2}>
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
            </Grid> */}


            {/********************* LN Text Field *********************/}
            {/* <Grid item xs ={6}>
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
          </Grid> */}

          

          {/********************* email Text Field *********************/}
          {/* <TextField
            required
            fullWidth
            label="Email"
            placeholder="Enter email"
            variant="standard"
            onChange={(e) => setoldPass(e.target.value)}
            value={oldPass}
            type="email"
          />

          <TextField
            required
            fullWidth
            label="oldPass"
            placeholder="Enter Old Pass"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
          /> */}

          

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

          {/* <FormControl sx={{  width: "100%"  }} variant="standard" required error={confirmError.state}>
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
          </FormControl> */}

          {/********************* Terms and conditions checkbox *********************/}
          {/* <div style={{paddingTop:15}}>
            <input type="checkbox" style={{color:"primary"}} id="agree" onChange={checkboxHandler} />
            <label>I agree to </label><a href="https://www.termsandconditionsgenerator.com/live.php?token=InuuJUo6I4Xz1FPgMfkmmri3Fj6fvJ6e" style={{ textDecoration: 'none', color:"black" }} htmlFor="agree"><b>terms and conditions</b></a>
          </div> */}

          {/********************* Sign in button *********************/}
          <Button
            // disabled={!agree}
            type='submit'
            color='secondary'
            variant='contained'
            fullWidth
            style={{ margin: '20px 0' }}
          >
            Register
          </Button>
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