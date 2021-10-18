import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

export default class Login extends Component {

  constructor(props) {
    //Source: https://www.positronx.io/react-axios-tutorial-make-http-get-post-requests/
    super(props)

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  onChangeUserName(e) {
    this.setState({ email: e.target.value })
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const loginPayload = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('http://localhost:5000/api/auth/login', loginPayload)
      .then(function (response) {
        alert("Login successful! Your access Token is: " + response.data.accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ email: '', password: '' })
  }

  render() {
    return (
      <Grid>
        <form onSubmit={this.onSubmit}>
          {/*/!* Rectangle where all login components are placed *!/*/}
          {/* <Paper elevation={3} style={paperStyle}> */}
          <Paper elevation={3} style={{ padding: 40, height: '50vh', width: 280, margin: '20px auto' }}>

            {/*  /!* Icon and title *!/*/}
            <Grid align='center'>
              <Avatar style={{ backgroundColor: '#1bbd7e' }}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign in</h2>
            </Grid>

            {/*  /!* Username Text Field *!/*/}
            <TextField
              required
              fullWidth
              label="Username"
              placeholder="Enter username"
              variant="standard"
              onChange={this.onChangeUserName}
              value={this.state.email}
            />

            {/*  /!* Password field *!/*/}
            <TextField
              fullWidth
              required
              label="Password"
              placeholder="Enter password"
              variant="standard"
              type="password"
              margin="normal"
              onChange={this.onChangePassword}
              value={this.state.password}
            />

            {/*  /!* Remember me checkbox *!/*/}
            <FormControlLabel
              control={
                <Checkbox color="primary" />}
              label="Remember me"
            />

            {/*  /!* Sign in button *!/*/}
            <Button
              type='submit'
              color='primary'
              variant='contained'
              fullWidth
              style={{ margin: '8px 0' }}
            >
              Sing in
            </Button>

            {/*  /!* Forgot my password *!/*/}
            <Typography>
              <Link
                href='#'
                underline='hover'
                color='#0067b8'
                fontSize='0.9rem'
                marginY='20px'
              >
                Forgot my password
              </Link>
            </Typography>

            {/*  /!* No Account? Create one! *!/*/}
            <Typography fontSize="0.9rem">No account?
              <Link href="#" underline="hover" color="#0067b8" fontSize="0.9rem"> Create one!</Link>
            </Typography>

          </Paper>
        </form>
      </Grid >
    )

  }
}