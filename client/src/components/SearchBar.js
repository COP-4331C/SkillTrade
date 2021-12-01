import { useState } from "react";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import {IconButton, TextField} from "@mui/material";
import ResetIcon from "@mui/icons-material/Close";
import * as React from "react";
import {Theme} from "./Theme";
import InputAdornment from "@mui/material/InputAdornment";
import {createTheme, makeStyles} from "@material-ui/core";
import { ThemeProvider } from "@mui/material";
import {grey} from "@material-ui/core/colors";

export default function SearchBar(props) {
  const [searchText, setSearchText] = useState("");


  function handleSearchBarOnChange(e) {
    setSearchText(e.target.value);
  }

  const handleEnterPressed = (e) => {
    if (e.key === "Enter") {
      props.onKeyDown(e.target.value);
    }
  };

  // Calls the onClick function in the HomePage
  // that triggers a search of a blank string
  // effectively "Resetting" the previous search.
  const handleSearchReset = () => {
    setSearchText("");
    props.onClick();
  };

  // Helps to override the Text Field Styles
  const textFieldTheme = createTheme({
    palette: {
      secondary: {
        main: Theme.palette.secondary.main,
      },
    }
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiFormLabel-root': {
        color: grey[500]
      },
      '& .MuiFilledInput-root': {
        color: "white"
      },
    }
  }));
  const classes = useStyles();

  return (
    <Grid
      item
      xs={props.searchBarColumns}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: { xs: props.xs, sm: props.sm, md: props.md },
      }}
    >
      <ThemeProvider theme={textFieldTheme}>
        <TextField
          id="outlined-search"
          variant="outlined"
          placeholder="Search for a skill to learn"
          type="text"
          color="secondary"
          size="small"
          className={classes.root}
          sx={{ backgroundColor: "#c4c4c4", width: props.searchBarWidth }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton
                onClick={(e) => handleSearchReset(e)}
              >
                <ResetIcon
                  fontSize={"small"}
                  // sx={{marginRight: "5px", display:{displayResetIcon} }}
                  sx={{cursor: "pointer", color:Theme.palette.primary.light }}

                />
              </IconButton>
            )
          }}
          onChange={handleSearchBarOnChange}
          value={searchText}
          onKeyDown={(e) => handleEnterPressed(e)}
        />

      </ThemeProvider>

    </Grid>
  );
}
