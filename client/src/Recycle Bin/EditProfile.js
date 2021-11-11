import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from "@mui/icons-material/Save";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {Theme} from "../components/Theme";
import Box from "@mui/material/Box";
import {Stack, TextareaAutosize} from "@mui/material";

export default function EditProfile(props) {

  const buttonStyle = () => ({
    minWidth: "20vw",
  });

  // **************************************** //
  //                  GUI
  // **************************************** //

  function saveInfo() {
    alert("Info save coming soon");
    props.onClick()
  }

  return (
    <Grid>
      {/*<form onSubmit={handleSubmitButton}>*/}
      <form >
        <Paper elevation={3} style={{padding: 20, width: 400, margin: '20px auto'}}>

          {/****************** X (Button to close)*********************/}
          <IconButton
            aria-label="close"
            onClick={() => props.onClick()}
            sx={{ position: 'absolute', right: 30, top: 20 }}
          >
            <CloseIcon />
          </IconButton>


          {/********************* Icon and title *********************/}
          <Grid align='center'>
            {/*<Avatar style={{backgroundColor: '#0031FF'}}>*/}
              <Avatar style={{backgroundColor: Theme.palette.primary.main}}>
              <EditOutlinedIcon/>
            </Avatar>
            <h2>Edit Profile</h2>
          </Grid>


          {/********************* First Name Text Field *********************/}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                label="First Name"
                placeholder="Enter Name"
                variant="standard"
                // onChange={(e) => setEmail(e.target.value)}
                // value={email}
                type="text"
                // helperText={emailError.text}
                // error={emailError.state}
              />
            </Grid>
            <Grid item xs={6}>
              {/********************* Last Name Text Field *********************/}
              <TextField
                label="Last Name"
                placeholder="Enter Last Name"
                variant="standard"
                // onChange={(e) => setEmail(e.target.value)}
                // value={email}
                type="text"
                // helperText={emailError.text}
                // error={emailError.state}
              />
            </Grid>
          </Grid>

          {/********************* email Text Field *********************/}
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter email"
            variant="standard"
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
            type="text"
            // helperText={emailError.text}
            // error={emailError.state}
          />

          {/****************** Social Media Text Field *********************/}
          <TextField
            fullWidth
            label="Facebook"
            placeholder="Facebook"
            variant="standard"
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
            type="text"
            // helperText={emailError.text}
            // error={emailError.state}
          />
          <TextField
            fullWidth
            label="Instagram"
            placeholder="Instagram"
            variant="standard"
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
            type="text"
            // helperText={emailError.text}
            // error={emailError.state}
          />
          <TextField
            fullWidth
            label="Twitter"
            placeholder="Twitter"
            variant="standard"
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
            type="text"
            // helperText={emailError.text}
            // error={emailError.state}
          />

          {/********************* About me Text Area *********************/}
          <Box sx={{display: "flex", justifyContent: "center", margin: "20px 5px"}}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={15}
              placeholder="About me"
              style={{ width: "95%" }}
            />
          </Box>


          {/********************* Save button *********************/}
          <Stack direction="row" spacing={2} justifyContent="space-evenly" alignItems="stretch" ali>
            {/*<Button variant="contained" color="primary" sx={buttonStyle} component={RouterLink} to="/profile">Save</Button>*/}
            <Button
              variant="outlined"
              color="primary"
              sx={buttonStyle}
              style={{border: "2px solid"}}
              // component={RouterLink}
              // to="/home"
              onClick={() => props.onClick()}
            > Cancel
            </Button>

            <Button
              color="secondary"
              // onClick={handleClick}
              loadingposition="start"
              startIcon={<SaveIcon/>}
              variant="contained"
              // fullWidth
              sx={buttonStyle}
              // style={{display: displayItem}}
              // component={RouterLink}
              // to="/home"
              onClick={saveInfo}
            > Save
            </Button>
          </Stack>

        </Paper>
      </form>
    </Grid>
  );
}