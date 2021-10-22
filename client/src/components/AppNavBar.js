import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo1WhiteTransparent from '../logo1WhiteTransparent.png'
import {Stack} from "@mui/material";
import { Link } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';

export default function AppNavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{flexGrow: 1, textAlign: "left"}}>
            <img src={logo1WhiteTransparent} alt="Logo" />
          </Box>
          <Stack spacing={4} direction="row">
            <Link to="/Login"style={{ textDecoration: 'none' }}>
              <Button type="button" color="inherit">Sign in</Button>
            </Link>
            <Link to="/Register"style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="small" color="secondary" >Sign up for free</Button>
            </Link>
            
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}