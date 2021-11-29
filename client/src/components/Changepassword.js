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
import InputLabel from "@mui/material/InputLabel";
import {Alert, Collapse, FormHelperText, Typography} from "@mui/material";
import AppNavBar from '../components/AppNavBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import HomeNavBar from './HomeNavBar';

export default function Changepassword(props) {

  const [firstName, setName] = useState(localStorage.getItem('firstName'));
  const [lastName, setPwd] = useState(localStorage.getItem('lastName'));
  const [photo, setPhoto] = useState(localStorage.getItem('recent-image'));


  const [values, setValues] = React.useState({
    password:'',
    showPassword: false,
    confirm: '',
    showConfirm: false
  });

  const [values2, setValues2] = React.useState({
    password2:'',
    showPassword2: false,
    confirm2: '',
    showConfirm2: false
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

  //show password for the password field
  const handleClickShowPassword2 = () => {
    setValues2({
      ...values2,
      showPassword2: !values2.showPassword2,
    });
  };

//show password for the confirm password field
  const handleClickShowConfirm2 = () => {
    setValues2({
      ...values2,
      showConfirm2: !values2.showConfirm2,
    });
  };

//
  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    setAgree(!agree);
  }

  const handleMouseDown = (event) => {
    event.preventDefault();};

  // const handleMouseDownConfirm = (event) => {
  //   event.preventDefault();};

    const handleMouseDown2 = (event) => {
      event.preventDefault();};

      const handleMouseDownConfirm2 = (event) => {
        event.preventDefault();};


  // Stores the password in the password variable
  const handleChangePasswordField = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });};

    const handleChangePasswordField2 = (prop) => (event) => {
      setValues2({ ...values2, [prop]: event.target.value });};

      

  // Verification for eveything
  // const verification_length = 8

  function valid(){
    if(values2.password2 !== values2.confirm2)
      return false;
    else if(values2.password2 === values2.confirm2)
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.href='/Login';
  };

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
    const isOk = re.test(values2.password2);

    console.log(isOk);

    if (valid()&&isOk ) {

    const token = localStorage.getItem('token');
    const userId = "";
    const chnagePayload = {
          oldPassword: values.password,
          newPassword: values2.password2
        };
    
    // axios.patch(`/api/user/forgot-password/${!userId ? "" : userId}`,chnagePayload, {
          axios.patch(`/api/user/change-password/${!userId ? "" : userId}`,chnagePayload, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((res) => {

        console.log(res.data);
        setOpen(true);
        
      })
      .catch((err) => {
        console.log(err);
      })

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

  
  }
  


/////////////////Interface/////////////////

  return (
    <Grid>
      <HomeNavBar/>
      {/* <NavBar/> */}
      <form onSubmit={handleSubmitButton}>
        <Paper elevation={3} style={{padding: 40, height: 'auto', width: 280, margin: '20px auto'}}>

          {/********************* Icon and title *********************/}
          <Grid align='center'>
          <Avatar alt="User Pic" src={photo}/>
            <h4> 
              {firstName +" " + lastName} 
              </h4>
              <Divider variant="middle" style={{color: 'black', border: "1px solid"}}/>
            <h3>Change Password</h3>
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

          {/********************* Old Password field *********************/}
          <FormControl sx={{  width: "100%"  }} variant="standard" required  >
            {/* required error={ complexity.state} */}
            <InputLabel htmlFor="standard-adornment-password">Old Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChangePasswordField('password')}
              placeholder="Enter Old Password"
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
            
          </FormControl>

          {/********************* New Password field *********************/}
          <FormControl sx={{  width: "100%"  }} variant="standard" required error={complexity.state} >
            <InputLabel htmlFor="standard-adornment-password2">New Password</InputLabel>
            <Input
              id="standard-adornment-password2"
              type={values2.showPassword2 ? 'text' : 'password'}
              value={values2.password2}
              onChange={handleChangePasswordField2('password2')}
              placeholder="Enter New Password"
              autoComplete="on"

              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDown2}
                  >
                    {values2.showPassword2 ? <Visibility />:<VisibilityOff />  }
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="component-error-text">{complexity.text}</FormHelperText>
          </FormControl>

          <FormControl sx={{  width: "100%"  }} variant="standard" required error={confirmError.state}>
            <InputLabel htmlFor="standard-adornment-confirm2">Confirm New Password</InputLabel>
            <Input
              id="standard-adornment-confirm2"
              type={values2.showConfirm2 ? 'text' : 'password'}
              value={values2.confirm2}
              onChange={handleChangePasswordField2('confirm2')}
              placeholder="Confirm New Password"
              autoComplete="on"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirm2}
                    onMouseDown={handleMouseDownConfirm2}
                  >
                    {values2.showConfirm2 ? <Visibility />:<VisibilityOff /> }
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
            Submit
          </Button>
          {/* Test */}
          <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Password Changed!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please know that your account password has been changed. Do not Share the password with anyone since it may be a security issue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
        </Paper>
      </form>
    </Grid>
  );
}