import React from 'react';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PasswordFields from './PasswordField';

const Registration = () => {

  const paperStyle = {
    padding: 40,
    width: 280,
    minHeight: 500,
    margin: '20px auto'
  }

  const textFieldStyle = {
    margin: '16px 16px 0 0'
  }

  return (
    <Paper elevation={3} style={paperStyle}>


        {/* Rectangle where all login components are placed */}
        {/*<Paper elevation={3} style={paperStyle}>*/}

          {/* Icon and title */}
          <Grid align='center'>
            <Avatar style={{backgroundColor: '#1bbd7e'}}>
              <AssignmentOutlinedIcon />
            </Avatar>
            <h2>Create account</h2>
          </Grid>

          <Grid container spacing={2}>
              {/*First name Text Field */}
              <Grid item xs>
                <TextField
                  required
                  fullWidth
                  label="First name"
                  placeholder="Enter first name"
                  variant="standard"
                  style={textFieldStyle}
                  style={{marginTop: 0}}
                  size="small"
                />
              </Grid>

              {/* Last name Text Field */}
              <Grid item xs>
                <TextField
                  fullWidth
                  label="Last name"
                  placeholder="Enter last name"
                  variant="standard"
                  style={textFieldStyle}
                  style={{marginTop: 0}}
                  size="small"
                />
              </Grid>
          </Grid>


          {/* Username Text Field */}
          <TextField
            required
            fullWidth
            label="Username"
            placeholder="Enter username"
            variant="standard"
            style={textFieldStyle}
            size="small"
          />

          {/* Email Text field */}
          <TextField
            fullWidth
            required
            label="Email"
            placeholder="Enter Email"
            variant="standard"
            type="email"
            style={textFieldStyle}
            size="small"
          />

          {/* Password and Confirm password were moved to PasswordFields
          to have more room for the implementation of the show password icon*/}
          <PasswordFields />

          {/* Accept Terms and Condition checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                size="small"
                required
              />
            }
            label="Terms and Conditions"
            style={{marginTop: '16px'}}
          />

          {/* Sign in button */}
          <Button
            type='submit'
            color='primary'
            variant='contained'
            fullWidth
            style={{margin: '8px 0' }}
            onClick={() => alert("Account creation coming soon")}
          >
            Create account
          </Button>

          {/* Already have an account? Login here*/}
          <Typography fontSize="0.9rem">Already have an account?
            <Link
              href="#"
              underline="hover"
              color="#0067b8"
              fontSize="0.9rem"
            > Login here
            </Link>
          </Typography>



    </Paper>
  )
}

export default Registration;