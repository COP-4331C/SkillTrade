import React, {useState} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from "@mui/material/InputLabel";
import {Alert, Collapse, FormHelperText} from "@mui/material";
import AppNavBar from '../components/AppNavBar';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import {useLocation} from "react-router-dom";
import { Divider } from '@mui/material';


// import URLSea

export default function Resetpassword() {

  const [firstName, setName] = useState(localStorage.getItem('firstName'));
  const [lastName, setPwd] = useState(localStorage.getItem('lastName'));
  const [photo, setPhoto] = useState(localStorage.getItem('recent-image'));


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

  const [complexity, setComplexity] = useState( {
    state: false,
    text: ""
  });

//submit handeler
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  window.location.href='/Login';
};

  const search = useLocation().search;
  const params = new URLSearchParams(search);

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

    setComplexity({
      state: false,
      text: ""
    });

    //  const{value} = this.state;
    const re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    const isOk = re.test(values.password);

    console.log(isOk);

    if (valid()&&isOk ) {

      const userId = params.get('userId');
      const resetCode = params.get('resetCode');

      // console.log(userId);
      // console.log(resetCode);
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
          setOpen(true);
        })

        .catch(function (error) {
          setOpenMessage(true);
          console.log(error);
        });

      // If any of the validation function fails
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
        text: "Password too weak. Please use at-least 8 characters including one symbol, lowercase & uppercase letter and one number"
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
          <Avatar alt="User Pic" color="secondary"
>
            <ManageAccountsTwoToneIcon/>
            </Avatar>
            <h4> 
              User
            </h4>
              <Divider variant="middle" style={{color: 'black', border: "1px solid"}}/>
            <h3>Reset Password</h3>
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

          {/********************* Password field *********************/}
          <FormControl sx={{  width: "100%"  }} variant="standard" required error={complexity.state} >
            {/* required error={ complexity.state} */}
            <InputLabel htmlFor="standard-adornment-password">Enter New Password</InputLabel>
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
            <FormHelperText id="component-error-text">{complexity.text}</FormHelperText>
          </FormControl>

          <FormControl sx={{  width: "100%"  }} variant="standard" required error={confirmError.state}>
            <InputLabel htmlFor="standard-adornment-confirm">Confirm New Password</InputLabel>
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

          {/********************* Sign in button *********************/}
          <Button
            // disabled={!agree}
            type='submit'
            color='secondary'
            variant='contained'
            fullWidth
            style={{ margin: '20px 0' }}
          >
            Reset
          </Button>

          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Password has been Reset!</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please know that your account password has been reset. Do not Share the password with anyone since it may be a Security Hazard!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>
          
        </Paper>
      </form>
    </Grid>
  );
}