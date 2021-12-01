import { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import ResetIcon from "@mui/icons-material/Close";
import * as React from "react";

export default function SearchBar(props) {
  const [searchText, setSearchText] = useState("");

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, props.bgColor),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, props.bgColorHover),
    },
    // marginRight: theme.spacing(2),
    // marginLeft: 20,
    marginX: "10px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    "& .MuiInputBase-root": {
      width: "100%",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      paddingLeft: "50px",
      // paddingLeft: props.inputBasePaddingLeft,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "40ch",
      },
    },
  }));

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
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          key="Home-search-bar"
          placeholder="Search for a skill to learn..."
          inputProps={{ "aria-label": "search" }}
          onChange={handleSearchBarOnChange}
          value={searchText}
          onKeyDown={(e) => handleEnterPressed(e)}
          // onFocus={() => setDisplayResetIcon("block")}
          // onBlur={() => setDisplayResetIcon("none")}
          endAdornment={
            <IconButton
              color={props.xIconColor}
              onClick={(e) => handleSearchReset(e)}
              aria-label="reset-button"
            >
              <ResetIcon
                fontSize={"small"}
                // sx={{marginRight: "5px", display:{displayResetIcon} }}
                sx={{ marginRight: "5px", cursor: "pointer" }}
                // onClick={() => setSearchText("")}
              />
            </IconButton>
          }
        />
      </Search>
    </Grid>
  );
}
