import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo1WhiteTransparent from '../logo1WhiteTransparent.png'
import {Stack} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

export default function AppNavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{flexGrow: 1, textAlign: "left"}}>
            <RouterLink to="/" >
              <img src={logo1WhiteTransparent} alt="Logo"/>
            </RouterLink>
          </Box>
          <Stack spacing={4} direction="row">
            <Button variant="outlined" color="error" component={RouterLink} to="/Home">Skip Login (Temporary button)</Button>
            <Button variant="outlined" color="inherit" component={RouterLink} to="/Login">Sign in</Button>
            <Button variant="contained" size="small" color="secondary" component={RouterLink} to="/Registration" >Sign up for free</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}