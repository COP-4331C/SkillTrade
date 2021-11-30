import Grid from "@mui/material/Grid";
import {Typography} from "@material-ui/core";
import {Theme} from "./Theme";


export const Sections = () => {

  return (
    <Grid container spacing={2} sx={{display: "flex"}}>

      {/**************************  Section 1 - Search for a skill to learn ***********/}
      <Grid item container spacing={4} sx={{justifyContent: "center", margin: 0}}>

        {/*************** Image ***********/}
        <Grid item xs={12} sm={12} md={12} lg={6}
              sx={{marginBottom: {xs: "0px", sm: "0px", md: "0px", lg: "60px", xl: "60px"}}}>
          <img src="img/section1.png" className="img img-responsive" alt="Search for a skill"/>
        </Grid>

        {/*************** Text ***********/}
        <Grid item xs={10} sm={10} md={8} lg={6}
              sx={{
                textAlign: "left",
                color: Theme.palette.primary.light,
                marginTop: {xs: "0px", sm: "0px", md: "0px", lg: "40px"},
                marginBottom: {xs: "50px", sm: "50px", md: "50px", lg: "0px"},
                paddingRight: {sx: "10px", sm: "30px", md: "40px", lg: "40px"},
              }}
        >
          <Typography variant="h3">
            Search for a skill to learn
          </Typography>
          <Typography variant="h5">
            <ul>
              <li>There are plenty of people willing to trade their skills with yours.</li>
              <li>Search for anything you would like to learn.</li>
              <li>Select the new skill to learn</li>
              <li>Either trade one of your skills or</li>
              <li>Buy credits to exchange for new skills</li>
            </ul>
          </Typography>

        </Grid>
      </Grid>



      {/**************************  Section 2 - Post a skill to teach ***********/}
      <Grid item container spacing={4}
            sx={{
              justifyContent: "center",
              backgroundColor: Theme.palette.primary.main,
              flexWrap:"wrap-reverse"
            }}
      >
        {/*************** Text ***********/}
        <Grid item xs={10} sm={10} md={7} lg={5} xl={4}
              sx={{
                textAlign: "left",
                color: "grey.300",
                marginTop: {xs: "0px", sm: "0px", md: "0px", lg: "20px", xl:"40px"},
                marginBottom: {xs: "50px", sm: "50px", md: "50px", lg: "0px"},
                paddingRight: {sx: "10px", sm: "30px", md: "40px", lg: "40px"},
              }}
        >
          <Typography variant="h3">
            Post a skill to teach
          </Typography>
          <Typography variant="h5">
            <ul>
              <li>Add a skill posts for thousands of people to see</li>
              <li>When someone wants to learn your skill, they will contact you</li>
              <li>After both parties agree to the terms</li>
              <li>Schedule a a day and time to meet online or in person</li>
              <li>And voila! You just earn some credits!</li>
            </ul>
          </Typography>
        </Grid>

        {/*************** Image ***********/}
        <Grid item xs={12} sm={12} md={12} lg={6}
              sx={{marginBottom: {xs: "0px", sm: "0px", md: "0px", lg: "60px", xl: "60px"}}}>
          <img src="img/section2.png" className="img img-responsive" alt="Post a skill"/>
        </Grid>
      </Grid>


      {/**************************  Section 3 - Trade!  ************************************************/}
      <Grid item container spacing={4} sx={{justifyContent: "center", margin: 0}}>

        {/*************** Image ***********/}
        <Grid item xs={12} sm={12} md={12} lg={6}
              sx={{marginBottom: {xs: "0px", sm: "0px", md: "0px", lg: "60px", xl: "60px"}}}>
          <img src="img/section3.png" className="img img-responsive" alt="Trade a skill"/>
        </Grid>

        {/*************** Text ***********/}
        <Grid item xs={10} sm={10} md={8} lg={6}
              sx={{
                textAlign: "left",
                color: Theme.palette.primary.light,
                marginTop: {xs: "0px", sm: "0px", md: "0px", lg: "40px"},
                marginBottom: {xs: "50px", sm: "50px", md: "50px", lg: "0px"},
                paddingRight: {sx: "10px", sm: "30px", md: "40px", lg: "40px"},
              }}
        >
          <Typography variant="h3">
            Trade!!!
          </Typography>
          <Typography variant="h5">
            <ul>
              <li>You don't have to spend money to learn knew skills</li>
              <li>Many people don't want to spend any money just like you</li>
              <li>So, you can search for those that are willing to trade</li>
              <li>You can teach them your skills, and they can teach you theirs</li>
              <li>It's that simple!</li>
            </ul>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}