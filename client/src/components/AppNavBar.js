import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo1WhiteTransparent from '../logo1WhiteTransparent.png'
import {Stack} from "@mui/material";

export default function AppNavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{flexGrow: 1, textAlign: "left"}}>
            <img src={logo1WhiteTransparent} alt="Logo" />
          </Box>
          <Stack spacing={4} direction="row">
            <Button color="inherit">Sign in</Button>
            <Button variant="contained" size="small" color="secondary" >Sign up for free</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}