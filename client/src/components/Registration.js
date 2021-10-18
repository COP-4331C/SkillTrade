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
// import { fontSize } from '@mui/system';


const Registration = () => {

  const paperStyle = {
    padding: 40,
    height: '70vh',
    width: 280,
    margin: '20px auto'
  }

  return (
    <Grid>

      {/* Rectangle where all login components are placed */}
      <Paper elevation={3} style={paperStyle}>

        {/* Icon and title */}
        <Grid align='center'>
          <Avatar style={{backgroundColor: '#1bbd7e'}}>
            <AssignmentOutlinedIcon />
          </Avatar>
          <h2>Create account</h2>
        </Grid>

         {/*First name Text Field */}
        <TextField
          required
          fullWidth
          label="First name"
          placeholder="Enter first name"
          variant="standard"
          style={{margin: '16px 16px 0 0'}}
        />

        {/* Last name Text Field */}
        <TextField
          required
          fullWidth
          label="Last name"
          placeholder="Enter last name"
          variant="standard"
          style={{margin: '16px 16px 0 0'}}
        />

        {/* Username Text Field */}
        <TextField
          required
          fullWidth
          label="Username"
          placeholder="Enter username"
          variant="standard"
          style={{margin: '16px 16px 0 0'}}
        />

        {/* Email Text field */}
        <TextField
          fullWidth
          required
          label="Email"
          placeholder="Enter Email"
          variant="standard"
          type="email"
          style={{margin: '16px 16px 0 0'}}
        />

        {/* Password field */}
        <TextField
          fullWidth
          required
          label="Password"
          placeholder="Enter password"
          variant="standard"
          type="password"
          style={{margin: '16px 16px 0 0'}}
        />

        {/* Confirm Password field */}
        <TextField
          fullWidth
          required
          label="Confirm Password"
          placeholder="Enter password again"
          variant="standard"
          type="password"
          style={{margin: '16px 16px 0 0'}}
        />

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
    </Grid >
  )
}

export default Registration;