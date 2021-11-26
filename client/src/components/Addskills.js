import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Divider, Fade} from "@mui/material";
import {styled} from '@mui/material/styles';
import SaveIcon from "@mui/icons-material/Save";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { Modal } from '@mui/material';
import { Paper } from '@mui/material';
import { Theme } from './Theme';

const loginModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // width: "auto",
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
const [cityAdd, setCityAdd] = useState("Oralndo");
const [stateAdd, setStateAdd] = useState("Florida");

const [cityAddTemp, setcityAddTemp] = useState("");
const [stateAddTemp, setstateAddTemp] = useState("");

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

    const userId = "";
    const token = localStorage.getItem('token');
  
    //value to commit to Backend changable_fields
    const payload = {
      summary: aboutMeTextTemp, 
      title:    aboutMeTextTemp,
      description: aboutMeText2Temp,
      price: priceTemp,
      status: "Teaching",
      state: stateAddTemp,
      city: cityAddTemp
    };
  
      console.log(token);
      axios.post(`/api/skills/`, payload,{
        headers: { 'Authorization': `Bearer ${token}`}
    })
    .then((res) => {
      console.log("success")
    })
    .catch((err) => {
      console.log(err);
    })

handleClose();  
refreshPage();
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


  return (
    <div >
      <Paper variant="outlined" 
            square 
            style={{ borderWidth:"0px"}}
            >
            <Button justifyContent="left" style={{backgroundColor: Theme.palette.secondary.main}} onClick={handleOpen}>
              Add New Skill </Button>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={loginModalStyle} style={{overflow:"hidden"}} >

      <Grid container classes={loginModalStyle} justifyContent="center">
      <Card  sx={{ border: 4, borderRadius:5, borderColor:"black", width:"300px"}}>

      <CardContent style={{paddingLeft: 0,paddingRight:0, paddingTop:0, paddingBottom:10}}>

          <Grid align='center' padding>
            <Avatar style={{backgroundColor: Theme.palette.secondary.main}}>
              <AddCircleTwoToneIcon/>
            </Avatar>
            <h2>Add New Skill</h2>
          </Grid>

        {/*************************** What Skills can be taught (Edit Mode) ************************************/}
            <TextField
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
            <TextField
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
              <TextField
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
                label="Price"
                variant="filled"
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
              justifyContent: 'space-evenly',
              alignItems: 'safe center',
              flexWrap: "wrap-reverse"
            }}>
              <Grid container justifyContent="center" >
                
                <Grid item xs={3}>
                  {/* <Fade in={fade}> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCancelButton}
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
                      onClick={handleSave }
                      // type="submit"
                      // onClick={editSkills }
                      // sx={{display: displayButton}}
                    ><SaveIcon/>
                    </Button>

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
    </div>
  );
}