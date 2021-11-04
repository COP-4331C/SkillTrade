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
import AppNavBar from '../components/AppNavBar';
import EditProfile from '../components/EditProfile';
import { Box, grid } from '@mui/system';
import whoa from '/Users/ridwan/Desktop/Large-Project/client/src/whoa.jpeg';

export default function ProfilePage() {

  return (
    <Grid >
      <AppNavBar/>
      {/* //align left// */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'background.default',
          display: 'grid',
          gridTemplateColumns: { md: '1fr 1fr' },
          gap: 2,}}>
        

      {/* //1ST component paper// */}
      <Paper variant="outlined" elevation={3} style={{
          position: 'left', 
          borderColor: "black",
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: 10, 
          height: '25vh', 
          width: 500,
          backgroundColor: 'lightBlue',
          borderRadius:20,
          borderWidth: 2,
          marginTop: 50,
          marginLeft: 20 }}>

          {/* //Profile Image// */}
          
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {/* //is this for image form label */}
                  {/* <div>
                    <input type="file" onChange={this.handleChange}/>
                    <img src={this.state.file}/>
                  </div> */}
              <img  style={{ 
                marginTop: -50, 
                width: 70, 
                height: 70, 
                borderRadius: 200 / 2,
                border: "2px solid", 
                borderColor: 'black' }} 
                src={whoa}/>
            </Box>

          <Grid container spacing={4} justifyContent="center" paddingTop={2}>

            <Grid item xs={4}>
              <FormControl>
              <item>
              <TextField
                id="outlined-read-only-input"
                label="First Name"
                defaultValue="Hello World"
                InputProps={{
                readOnly: true,
                }}
              />
                  </item>
              </FormControl>
            </Grid>

            <Grid item xs={2}>
              <FormControl>
              <item>
                <TextField
                  id="outlined-read-only-input"
                  label="M.I."
                  defaultValue="Hello World"
                  InputProps={{
                  readOnly: true,
                  }}
                />
                  </item>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl>
              <item>
                <TextField
                  id="outlined-read-only-input"
                  label="Last Name"
                  defaultValue="Hello World"
                  InputProps={{
                  readOnly: true,
                  }}
                />
                  </item>
              </FormControl>
            </Grid>
            
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                type='submit'
                color='primary'
                variant='contained'
                fullWidth
                style={{ 
                marginTop:50, 
                borderBottomLeftRadius: 40,
                borderBottomRightRadius:40,
                borderColor: "black",}}
              >
                Contact Me!
            </Button>
          </Box>
        </Paper>
    </Box>

{/* /////////////////////////////////////////////////////////////////////////// */}

      <Box
          sx={{
            p: 2,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: { md: '1fr 1fr' },
            gap: 2,}}>
        
        {/* //2nd component paper// */}
        <Paper variant="outlined" elevation={3} style={{
            position: 'left', 
            borderColor: "black",
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: 10, 
            height: '10vh', 
            width: 500,
            backgroundColor: 'lightBlue',
            borderRadius:20,
            borderWidth: 2,
            marginTop: 20,
            marginLeft: 20 }}>
        </Paper>

        <Grid container spacing={4} justifyContent="center" paddingTop={2}>

              <Grid item xs={3}>
                <FormControl>
                <item>
                
                    </item>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl>
                <item>
                  
                    </item>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl>
                <item>
                  
                    </item>
                </FormControl>
              </Grid>
              
            </Grid>
        </Box>

    </Grid>
  );
}