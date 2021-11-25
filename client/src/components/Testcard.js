import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {Divider, Fade} from "@mui/material";
import {styled} from '@mui/material/styles';
import SaveIcon from "@mui/icons-material/Save";
import {Theme} from "../components/Theme";
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Paper } from '@mui/material';
import { Avatar } from '@mui/material';
import axios from 'axios';

export default function Testcard(props) {

//skills to be learnt 
const [aboutMeText, setAboutMeText] = useState(props.skillname); 
//explanation of skill
const [aboutMeText2, setAboutMeText2] = useState(props.skilldescription);

//Price stuff
const [price, setPrice] = useState(props.skillprice);
const [displayPrice, setdisplayPrice] = useState("block")
const [priceTemp, setpriceTemp] = useState("");

//display cosmetics
const [fade, setFade] = useState(false);
const [displayAddress, setDisplayAddress] = useState("inline-flex");
const [displayButton, setDisplayButton] = useState("none");
const [displayEditButton, setDisplayEditButton] = useState("none");
const [inEditMode, setEditMode] = useState(false);
const [displayEditFields, setDisplayEditFields] = useState("none");

//City and State
const [cityAdd, setCityAdd] = useState(props.skillcity);
const [stateAdd, setStateAdd] = useState(props.skillstate);

//Skills explanation display/edit mode variable
const [displayAboutMeText2, setDisplayAboutMeText2] = useState("block")
const [aboutMeText2Temp, setAboutMeText2Temp] = useState("");

//Show/Hide the icons
const [displayContainer, setDisplayContainer] = useState("block")

//Skills name display/edit mode variable
const [displayAboutMeText, setDisplayAboutMeText] = useState("block")
const [aboutMeTextTemp, setAboutMeTextTemp] = useState("");

//
const [cityAddTemp, setcityAddTemp] = useState("");
const [stateAddTemp, setstateAddTemp] = useState("");

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

const [photo, setPhoto] = useState(props.skillimage);

function enterEditMode() {
  setEditMode(true);                      // Turns edit mode mode (set variable to true)

  setDisplayAddress("none");              // Hides the City and State names
  setDisplayAboutMeText("none");          // Hides the Skills text
  setDisplayAboutMeText2("none");         // Hides the Skills Description text
  setDisplayContainer("none");            //Hides Icons

  setdisplayPrice("none"); 

  setDisplayEditButton("none");           // Hides the edit button
  setDisplayEditFields("inline-flex");    // Displays the edit text fields
  setDisplayButton("inline-flex");        // Displays the save and cancel button

  setcityAddTemp(cityAdd);                  // Copies city name to editable text fields
  setstateAddTemp(stateAdd);                // Copies state name to editable text fields
  
  setpriceTemp(price);

  setAboutMeTextTemp(aboutMeText);              // Copies Skills text to editable text field
  setAboutMeText2Temp(aboutMeText2);            // Copies Skills Description text to editable text field


  setFade(true);                          // Tells the buttons to fade in
}

function exitEditMode() {
  setEditMode(false);                          // Turn off edit mode
  setdisplayPrice("inline-flex"); 
  setDisplayAddress("inline-flex");          // Displays the city and state names
  setDisplayAboutMeText("block")            // Displays the Skills text
  setDisplayAboutMeText2("block")          // Displays the Skills Description text
  setDisplayContainer("block")            //Displays the Icons
  setDisplayEditButton("inline-flex");   // Display Edit button
  setDisplayEditFields("none")          // Hides edit text fields
  setDisplayButton("none");            // Hides the Cancel and Save buttons
  setFade(false);                     // Tells the button to fade out
  
}

function validateTextMinLength(text, min) {
  if (text.length >= min) {
    return 1;
  } else {
    return 0;
  }
}

// Handles the onClick event of the Save button
function handleSave() {
  let okToSaveData = true;

  if (!validateTextMinLength(aboutMeTextTemp, 1)) {
    okToSaveData = false;
    setAboutMeTextError({
      state: true,
      text: "Can't be empty"
    });
  }

  if(!validateTextMaxLength(aboutMeTextTemp, 50)) {
    okToSaveData = false
    setAboutMeTextError({
      state: true,
      text: "Must be less than 15 characters (There are " + aboutMeTextTemp.length + ")"
    });
  }

  if (!validateTextMinLength(aboutMeText2Temp, 1)) {
    okToSaveData = false;
    setAboutMeText2Error({
      state: true,
      text: "Can't be empty"
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
    setPrice(priceTemp);

    const token = localStorage.getItem('token');  
    //value to commit to Backend changable_fields
    const payload = {
      summary: aboutMeTextTemp, 
      title:    aboutMeTextTemp,
      description: aboutMeText2Temp,
      price: priceTemp,
      status: "Teaching",
      city: cityAddTemp,
      state: stateAddTemp
    };

      console.log(token);
      axios.put(`/api/skills/${props.skillid}`, payload,{
        headers: { 'Authorization': `Bearer ${token}`}
    })
    .then((res) => {
      console.log("success")
    })
    .catch((err) => {
      console.log(err);
    })

    exitEditMode();
  }
}


function handleCancelButton() {
  clearTextValidationErrorMessages();
  exitEditMode();
}

function handleDeleteButton(){

  const token = localStorage.getItem('token');

  console.log(token);
  axios.delete(`/api/skills/${props.skillid}`,{
    headers: { 'Authorization': `Bearer ${token}`}
})
.then((res) => {
  console.log("success")
})
.catch((err) => {
  console.log(err);
})

exitEditMode();
refreshPage() ;
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

function handleOnMouseOver() {
  if (!inEditMode && window.location.href.toLowerCase().includes("skillpage")) {
    setDisplayEditButton("inline-block");
  }
}

function refreshPage() {
  window.location.reload(false);
}

function handleOnMouseLeave() {
  if (!inEditMode && editPermission) {
    setDisplayEditButton("none");
  }
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

function handleOnChangePrice(e) {
  setpriceTemp(e.target.value);
}

function handleOnChangeStateAddress(e) {
  setstateAddTemp(e.target.value);
}


const Input = styled('input')({
  display: 'none',
});

function handleskillpic(e) {

  const formData = new FormData();
  formData.append("file", e.target.files[0]);

  const token = localStorage.getItem('token');

    axios.post(`/api/skills/${props.skillid}`, formData,{
      headers: { Authorization: `Bearer ${token}`,'content-type': 'multipart/form-data' }
  })
    // axios.post(URL, formData, config)
      .then( function(response){
        setPhoto(response.data.URL);
      })
      .catch("error"+console.log);
  // }
}

useEffect(() => {
  try {

    if (editPermission) {
      setDisableImageUpload(false);
      setMousePointer("pointer");
    } else {
      setDisableImageUpload(true);
      setMousePointer("");
    }

  } catch (e) {
    console.log(e.message);
  }

}, []);
  
  return (
    <Grid container sx={{display:"flex"}} justifyContent="center">
      {/* //start of card// */}
      <Card  sx={{ border: 4, borderRadius:5, borderColor:"black", width: "350px"}}>
      
      {/* //start of the image-header// */}
      <Box position="relative">

        <label htmlFor="icon-button-file-2">
          <Input
            accept=".png, .jpg, .jpeg"
            id="icon-button-file-2"
            type="file"
            name="photo"
            onChange={handleskillpic}
            disabled={disableImageUpload}
          />
          {/** **************************** Image ********************** **/}
          <img
              src={photo}
              style={{
                // background: {photo},
                // backgroundSize: "300px",
                width: 350,
                height: 200,
                borderRadius: "4px 0 0 4px",
                display: "block",
                cursor: mousePointer,
                // opacity: imageOpacity
              }}
              alt="user"
            />
          </label>  
      </Box>
          

      <CardContent style={{paddingLeft: 0,paddingRight:0, paddingTop:0, marginBottom:0, paddingBottom:5}}>

        <Box padding sx={{backgroundColor: "white", alignContent: "center" }}>
          <Typography  variant="body5" color="black" style={{paddingTop:1}}>
            I can teach you...
          </Typography>
        </Box>
      {/*************************** What Skills can be taught ************************************/}
      <div
        sx={{backgroundColor: Theme.palette.primary.main, alignContent: "center" }}
        style={{overflow: "hidden", textOverflow: "ellipsis", alignItems:"center"}}>
          <Paper 
            variant="outlined" 
            square 
            style={{backgroundColor: Theme.palette.primary.contrastText, position: "relative", borderWidth:"0px"}}
            sx={{height:"72px", display: displayContainer}}>
            <Typography padding
              style={{
                alignItems:"center", 
                position: "absolute",
                textAlign: "center", 
                width: "100%", 
                left:"50%", 
                top:"50%", 
                transform:"translate(-50%,-50%)"}}  

              sx={{
                fontWeight: 300,
                fontSize: "1.2rem",              
                display: displayAboutMeText,
                flexWrap:"wrap",
                alignContent: "center"}}>
                {"How to "+aboutMeText}

            </Typography>
          </Paper>
        </div>
        {/*************************** What Skills can be taught (Edit Mode) ************************************/}
            <TextField
              label="How to ..."
              multiline
              variant="filled"
              rows={2}
              value={aboutMeTextTemp}
              fullWidth
              onChange={handleOnChangeAboutMeText}
              sx={{display: displayEditFields, color: "black",marginTop: "10px"}}
              helperText={aboutMeTextError.text}
              error={aboutMeTextError.state}
            />

        {/*************************** What Skills can be taught DONE ************************************/}

        {/*************************** Explanation on what can be taught ************************************/}
        <div
          sx={{backgroundColor: Theme.palette.primary.main, alignContent: "center" }}
          style={{overflow: "hidden", textOverflow: "ellipsis", alignItems:"center"}}>
        
        <Paper 
            variant="outlined" 
            square 
            style={{ position: "relative", borderWidth:"0px"}}
            sx={{height:"108px", display: displayContainer}}>

            <Grid container >
              <Grid item xs={2} >
                <IconButton 
                  color="secondary" 
                  aria-label="edit"  
                  sx={{display: displayContainer}}>
                    <DescriptionIcon/>
                </IconButton>
              </Grid>

              <Grid item xs={10} >
                <Typography padding="8px"
                  style={{
                    alignItems:"center", 
                    // position: "absolute",
                    textAlign: "left", 
                    width: "100%", 
                    left:"50%", 
                    top:"50%", 
                    // transform:"translate(-50%,-50%)"
                  }} 
                  variant="body5"
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    display: displayAboutMeText2,
                    flexWrap:"wrap",
                    alignContent: "center"}}>
                  {aboutMeText2}
                </Typography>
              </Grid>
            </Grid>
                        
            </Paper></div>
          

        {/* </Grid> */}
        
        {/*************************** Explanation on what can be taught (Edit Mode) ************************************/}
            <TextField
              label="Brief explanation of the skill"
              // color="secondary"
              // className={classes.root}
              multiline
              variant="filled"
              rows={2}
              value={aboutMeText2Temp}
              fullWidth
              onChange={handleOnChangeAboutMeText2}
              sx={{display: displayEditFields,color:"black", marginTop: "10px"}}
              helperText={aboutMeText2Error.text}
              error={aboutMeText2Error.state}
            />

        {/* **********************************************************************************************/}
        {/*************************** LOCATION STUFF ************************************/}

        <div sx={{backgroundColor: Theme.palette.primary.main, alignContent: "center" }} style={{overflow: "hidden", textOverflow: "ellipsis", alignItems:"center"}}>
        <Paper 
            variant="outlined" 
            square 
            style={{ position: "relative", borderWidth:"0px"}}
            sx={{height:"auto", display: displayContainer}}>

            <Grid container >

            {/* //icon// */}
              <Grid item xs={2} >
                <IconButton 
                  color="secondary" 
                  aria-label="edit" 
                  sx={{display: displayContainer}}>
                    <PersonPinCircleIcon/>
                </IconButton>
              </Grid>

                {/* //City// */}
              <Grid item xs={3} >
                <Typography padding="8px"
                  style={{
                    alignItems:"center", 
                    // position: "absolute",
                    textAlign: "left", 
                    width: "100%", 
                    left:"50%", 
                    top:"50%", 
                    // transform:"translate(-50%,-50%)"
                  }} 
                  variant="body4"
                  sx={{
                    fontWeight: 600,
                    display: displayAddress,
                    flexWrap:"wrap",
                    alignContent: "center"}}>
                  {cityAdd + " "}
                </Typography>
              </Grid>

                  {/* //Address// */}
              <Grid item xs={4} >
                <Typography padding="8px"
                  style={{
                    alignItems:"center", 
                    // position: "absolute",
                    textAlign: "left", 
                    width: "100%", 
                    left:"50%", 
                    top:"50%", 
                    // transform:"translate(-50%,-50%)"
                  }} 
                  variant="body4"
                  sx={{
                    fontWeight: 600,
                    display: displayAddress,
                    flexWrap:"wrap",
                    alignContent: "center"}}>
                  {stateAdd}
                </Typography>
              </Grid>
            </Grid>
            </Paper>
            </div>
          

        {/* </Grid> */}
        
        {/*************************** LOCATION (Edit Mode) ************************************/}

          <Grid container>
            <Grid item xs={6}>
              <TextField
                label="City"
                variant="filled"
                rows={1}
                value={cityAddTemp}
                fullWidth
                onChange={handleOnChangeCityAddress}
                sx={{display: displayEditFields,color:"black", marginTop: "10px"}}
                // helperText={aboutMeText2Error.text}
                // error={aboutMeText2Error.state}
              />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="State"
              variant="filled"
              rows={1}
              value={stateAddTemp}
              fullWidth
              onChange={handleOnChangeStateAddress}
              sx={{display: displayEditFields,color:"black", marginTop: "10px"}}
              // helperText={aboutMeText2Error.text}
              // error={aboutMeText2Error.state}
            />
            </Grid>
          </Grid>

              {/*************************** Price Stuff ************************************/}
          <div sx={{backgroundColor: Theme.palette.primary.main, alignContent: "center" }} style={{overflow: "hidden", textOverflow: "ellipsis", alignItems:"center"}}>
        <Paper 
            variant="outlined" 
            square 
            style={{ position: "relative", borderWidth:"0px"}}
            sx={{height:"auto", display: displayContainer}}>

            <Grid container sx={{mb:0}} >

            {/* //icon// */}
              <Grid item xs={2} >
                <IconButton 
                  color="secondary" 
                  aria-label="edit" 
                  sx={{display: displayContainer}}>
                    <MonetizationOnTwoToneIcon/>
                </IconButton>
              </Grid>

                {/* //City// */}
              <Grid item xs={3} >
                <Typography padding="8px"
                  style={{
                    alignItems:"center", 
                    // position: "absolute",
                    textAlign: "left", 
                    width: "100%", 
                    left:"50%", 
                    top:"50%", 
                    // transform:"translate(-50%,-50%)"
                  }} 
                  variant="body4"
                  sx={{
                    fontWeight: 600,
                    display: displayPrice,
                    flexWrap:"wrap",
                    alignContent: "center"}}>
                  {price}
                </Typography>
              </Grid>
            </Grid>
            </Paper>
            </div>

                    {/*************************** Price Stuff (Edit Mode) ************************************/}

          <Grid container>
            <Grid item xs={6}>
              <TextField
                label="Price"
                variant="filled"
                rows={1}
                value={priceTemp}
                fullWidth
                onChange={handleOnChangePrice}
                sx={{display: displayEditFields,color:"black", marginTop: "10px"}}
                // helperText={aboutMeText2Error.text}
                // error={aboutMeText2Error.state}
              />
            </Grid>
          </Grid>

         {/******************** Cancel+SAVE Button *********************/}
        <Box sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'safe center',
              flexWrap: "wrap-reverse"
            }}>
              <Grid container justifyContent="center" >
                

              <Grid item xs={3} sx={{paddingBottom: 0, paddingTop:0}} style={{paddingBottom:0, paddingTop:0}}>
                  <Fade in={fade}>
                    <Button
                      variant="outlined"
                      style={{backgroundColor: Theme.palette.third.notmain}} 
                      onClick={handleDeleteButton}
                      sx={{display: displayButton}}
                    > <DeleteForeverIcon/>
                    </Button>
                  </Fade>
                </Grid>

                <Grid item xs={3}>
                  <Fade in={fade}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCancelButton}
                      sx={{display: displayButton}}
                    > <CancelPresentationIcon/>
                    </Button>
                  </Fade>
                </Grid>

                <Grid item xs={3}>
                  <Fade in={fade}>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handleSave }
                      // type="submit"
                      // onClick={editSkills }
                      sx={{display: displayButton}}
                    ><SaveIcon/>
                    </Button>

                  </Fade>
                </Grid>

              </Grid>
              
              {/******************** Cancel+SAVE Button DONE *********************/}
              
        </Box>
      </CardContent>

      {/********************Bottom Part of the Card*********************/}

      <Divider variant="middle" style={{color: 'black', border: "1px solid"}}/>

      <Grid container spacing={2} padding onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>

        <Grid item xs={3} justifyContent="left">
          <Avatar alt="User Pic" src={props.skilluserpic}/>
        </Grid>

        <Grid item xs={6} justifyContent="left">
          <Typography
              variant={"body5"}
              sx={{
                textAlign: "left",
                marginTop: "20px",
                color: "black",
                fontWeight: 600
              }}
            >
              {props.skilluserid}
          </Typography>
        </Grid>

        <Grid item xs={3} justifyContent="right">
          <IconButton  
                      aria-label="edit" 
                      variant="outlined"
                      color="secondary"
                      onClick={enterEditMode}
                      sx={{display: displayEditButton, alignItems: "right"}} 
                      align="bottom"
                      position= "absolute" 
                      top= "50%" 
                      transform= "translateY(-50%)">

            <EditIcon/>
          </IconButton>
        </Grid>
        
      </Grid>

    
    </Card>
    {/* </form> */}
    </Grid>
    
  );
}