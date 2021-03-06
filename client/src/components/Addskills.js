import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SaveIcon from "@mui/icons-material/Save";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';import axios from 'axios';
import { Avatar } from '@mui/material';
import { Modal } from '@mui/material';
import { Paper } from '@mui/material';
import { Theme } from './Theme';

const loginModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  width: "auto",
  overflow: "scroll"
};

export default function Addskills(props){

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

//skills to be learnt 
const [aboutMeText, setAboutMeText] = useState(""); 

//explanation of skill
const [aboutMeText2, setAboutMeText2] = useState("");   


//City and State
const [cityAdd, setCityAdd] = useState("");
const [stateAdd, setStateAdd] = useState("");
const [cAdd, setCAdd] = useState("");

const [cityAddTemp, setcityAddTemp] = useState("");
const [stateAddTemp, setstateAddTemp] = useState("");
const [cAddTemp, setCAddTemp] = useState("");

//Skills explanation display/edit mode variable
const [aboutMeText2Temp, setAboutMeText2Temp] = useState("");
const [aboutMeTextTemp, setAboutMeTextTemp] = useState("");

const [price, setPrice] = useState(props.skillprice);
const [priceTemp, setpriceTemp] = useState("");

// const [imageOpacity, setImageOpacity] = useState(1);
// const [photo, setPhoto] = useState(profileImage)

const [editPermission, setEditPermission] = useState(true);
const [mousePointer, setMousePointer] = useState('');
const [disableImageUpload, setDisableImageUpload] = useState(true)


//If the user goes over the designated Character Space for either Skills or its explanation
const [aboutMeTextError, setAboutMeTextError] = useState({
  state: false,
  text: ""
})

const [aboutMeText2Error, setAboutMeText2Error] = useState({
  state: false,
  text: ""
})

function refreshPage() {
  window.location.reload(false);
}

const [openMod, setopenMod] = React.useState(false);

const handleClickOpen = () => {
  setopenMod(true);
};

const handleCloseMod = () => {
  setopenMod(false);
  refreshPage();
};

// Handles the onClick event of the Save button
function handleSave() {
  let okToSaveData = true;

  if(!validateTextMaxLength(aboutMeTextTemp, 50)) {
    okToSaveData = false
    setAboutMeTextError({
      state: true,
      text: "Must be less than 15 characters (There are " + aboutMeTextTemp.length + ")"
    });
  }

  if(!validateTextMaxLength(aboutMeText2Temp, 250)) {
    okToSaveData = false
    setAboutMeText2Error({
      state: true,
      text: "Must be less than 250 characters (There are " + aboutMeText2Temp.length + ")"
    });
  }

  if(okToSaveData) {
    setCityAdd(cityAddTemp);
    setStateAdd(stateAddTemp);
    setAboutMeText(aboutMeTextTemp);
    setAboutMeText2(aboutMeText2Temp);
    setCAdd(cAddTemp);

    const userId = "";
    const token = localStorage.getItem('token');
  
    //value to commit to Backend changable_fields
    const payload = {
      summary: aboutMeText2Temp, 
      title:    aboutMeTextTemp,
      description: aboutMeText2Temp,
      price: priceTemp,
      status: "Teaching",
      state: stateAddTemp,
      city: cityAddTemp,
      country: cAddTemp
    };

      axios.post(`/api/skills/`, payload,{
        headers: { 'Authorization': `Bearer ${token}`}
    })
    .then((res) => {
      console.log("success")
      setopenMod(true)
    })
    .catch((err) => {
      console.log(err);
    })

// handleClose();  
// refreshPage();
}}


function handleCancelButton() {
  clearTextValidationErrorMessages();
  handleClose();
  // exitEditMode();
}

function validateTextMaxLength(text, max) {
  if(text.length <= max) {
    return 1;
  } else {
    return 0;
  }
}

function clearTextValidationErrorMessages() {
  setAboutMeTextError({
    state: false,
    text: ""
  });
  setAboutMeText2Error({
    state: false,
    text: ""
  });
}


function handleOnChangeAboutMeText(e) {
  setAboutMeTextTemp(e.target.value);
}

function handleOnChangeAboutMeText2(e) {
  setAboutMeText2Temp(e.target.value);
}

function handleOnChangeCityAddress(e) {
  setcityAddTemp(e.target.value);
}

function handleOnChangeStateAddress(e) {
  setstateAddTemp(e.target.value);
}

function handleOnChangePrice(e) {
  setpriceTemp(e.target.value);
}

function handleOnChangeCAddress(e) {
  setCAddTemp(e.target.value);
}


  return (
    <div >
      <form onSubmit={handleSave}>
      <Paper variant="outlined" 
            square 
            style={{ borderWidth:"0px"}}
            >
            <Button justifycontent="left" style={{backgroundColor: Theme.palette.secondary.main}} onClick={handleOpen}>
              Add New Skill </Button>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // alignItems="center"
      >
      <Box sx={loginModalStyle} style={{overflow:"hidden"}} >

      <Grid container classes={loginModalStyle} justifycontent="center">
      <Card  sx={{ border: 4, borderRadius:5, borderColor:"black", width:"300px"}}>

      <CardContent style={{paddingLeft: 0,paddingRight:0, paddingTop:0, paddingBottom:10}}>

          <Grid align='center' padding>
            <Avatar style={{backgroundColor: Theme.palette.secondary.main}}>
              <AddCircleTwoToneIcon/>
            </Avatar>
            <h2>Add New Skill</h2>
          </Grid>

        {/*************************** What Skills can be taught (Edit Mode) ************************************/}
            <TextField required
              label="How to ..."
              multiline
              variant="filled"
              rows={2}
              value={aboutMeTextTemp}
              fullWidth
              onChange={handleOnChangeAboutMeText}
              // sx={{display: displayEditFields, color: "black",marginTop: "10px"}}
              // helperText={aboutMeTextError.text}
              // error={aboutMeTextError.state}
            />

        {/*************************** Explanation on what can be taught (Edit Mode) ************************************/}
            <TextField required
              label="Brief explanation of the skill"
              // color="secondary"
              // className={classes.root}
              multiline
              variant="filled"
              rows={5}
              value={aboutMeText2Temp}
              fullWidth
              onChange={handleOnChangeAboutMeText2}
              // sx={{display: displayEditFields,color:"black", marginTop: "10px"}}
              helperText={aboutMeText2Error.text}
              error={aboutMeText2Error.state}
            />

        {/* **********************************************************************************************/}
        
        {/*************************** LOCATION (Edit Mode) ************************************/}

          <Grid container>

            <Grid item xs={5}>
              <TextField required
                label="City"
                variant="filled"
                rows={1}
                value={cityAddTemp}
                fullWidth
                onChange={handleOnChangeCityAddress}
                // sx={{display: displayEditFields,color:"black", marginTop: "10px"}}
                // helperText={aboutMeText2Error.text}
                // error={aboutMeText2Error.state}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField 
                label="State"
                variant="filled"
                rows={1}
                value={stateAddTemp}
                fullWidth
                onChange={handleOnChangeStateAddress}
                // sx={{display: displayEditFields,color:"black", marginTop: "10px"}}
                // helperText={aboutMeText2Error.text}
                // error={aboutMeText2Error.state}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField 
                label="Country"
                variant="filled"
                rows={1}
                value={cAddTemp}
                fullWidth
                onChange={handleOnChangeCAddress}
                // sx={{display: displayEditFields,color:"black", marginTop: "10px"}}
                // helperText={aboutMeText2Error.text}
                // error={aboutMeText2Error.state}
              />
            </Grid>
          </Grid>

          <Grid container >
            <Grid item xs={12} sm={12} md={12} lg={12} >
              <TextField required
                label="Price"
                variant="filled"
                type="number"
                rows={1}
                value={priceTemp}
                fullWidth
                onChange={handleOnChangePrice}
                // sx={{display: displayEditFields,color:"black", marginTop: "10px"}}
                // helperText={aboutMeText2Error.text}
                // error={aboutMeText2Error.state}
              />
            </Grid>
          </Grid>

         {/******************** Cancel+SAVE Button *********************/}
        <Box padding sx={{
              display: 'flex',
              justifycontent: 'space-evenly',
              alignItems: 'safe center',
              flexWrap: "wrap-reverse"
            }}>
              <Grid container alignItems="center" >

                <Grid item xs={3}>
                  {/* <Fade in={fade}> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCancelButton}
                      aria-label="cancel-skills-button"
                      // sx={{display: displayButton}}
                    > <CancelPresentationIcon/>
                    </Button>
                  {/* </Fade> */}
                </Grid>

                <Grid item xs={3}>
                  {/* <Fade in={fade}> */}
                    <Button
                      color="secondary"
                      variant="contained"
                      type='submit'
                      onClick={handleSave}
                      aria-label="save-skills-button"
                      // handleClickOpen
                    ><SaveIcon/>
                    </Button>
                    <div>
                      <Dialog open={openMod} onClose={handleCloseMod}>
                        <DialogTitle>Skill Added!</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Your brand new skill has been added! It is time to get started with Skill Trading!
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          {/* <Button onClick={handleSave}>Save</Button> */}
                          <Button aria-label="close-modal-button" onClick={handleCloseMod}>Close</Button>
                        </DialogActions>
                      </Dialog>
                    </div>

                  {/* </Fade> */}
                </Grid>
              </Grid>
              
              {/******************** Cancel+SAVE Button DONE *********************/}
              
        </Box>
      </CardContent>
    </Card>
    </Grid>
    </Box>
    </Modal>
    </form>
    </div>
  );
}