
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

const Login = () => {

  const paperStyle = {
    padding: 40,
    height: '50vh',
    width: 280,
    margin: '20px auto'
  }

  return (
    <Grid>

      {/*/!* Rectangle where all login components are placed *!/*/}
      <Paper elevation={3} style={paperStyle}>

      {/*  /!* Icon and title *!/*/}
        <Grid align='center'>
          <Avatar style={{backgroundColor: '#1bbd7e'}}>
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
          style={{margin: '8px 0'}}
          onClick={() => alert('Sing in coming soon')}
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
    </Grid >
  )
}

export default Login;