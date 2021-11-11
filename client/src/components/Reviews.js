import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import {styled} from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";
import testUserAvatar from "../images/avatars/testUserAvatar.jpg";
import * as React from "react";
import FlagIcon from '@mui/icons-material/EmojiFlagsTwoTone';
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import {Rating} from "@mui/material";
import {Theme} from "./Theme";


export default function Reviews() {

  // Allows a custom rating starts
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: Theme.palette.secondary.main,
      backgroundColor: "primary"
    },
    '& .MuiFilledInput-root:after': {
      borderBottom: "secondary"
    },
    '& MuiRating-icon': {
      color: Theme.palette.secondary.main
    }
  });

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        marginTop: 1,
        maxWidth: 948,
        flexGrow: 1,
        border: "0.5px solid",
        borderColor: "primary.light"
      }}
    >
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item sx={{alignItems: "flex-start"}}>
          <Avatar alt="User Pic" src={testUserAvatar}/>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1" component="div">
                  Charlie A.
                </Typography>
                {/*********************************** Rating  ************************************/}
                <Box sx={{marginTop: 5, justifyContent: "center", display: "inline-flex"}}>
                  <StyledRating
                    defaultValue={4.5}
                    precision={0.5}
                    icon={<StarIcon fontSize="inherit"/>}
                    emptyIcon={<StarBorderOutlinedIcon fontSize="inherit"/>}
                    readOnly
                  />
                </Box>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <FlagIcon/>
                <Typography variant="body2" gutterBottom>
                  United States
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{textAlign: "left"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}