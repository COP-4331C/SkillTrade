import {useState} from "react";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import {IconButton} from "@mui/material";
import ResetIcon from "@mui/icons-material/Close";
import * as React from "react";


const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 20,
  // marginX: "10px",
  // width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

export default function SearchBar(props) {
  const [searchText, setSearchText] = useState("");

  function handleSearchBarOnChange(e) {
    setSearchText(e.target.value);
  }

  const handleEnterPressed = (e) => {
    if (e.key === "Enter") {
      props.onKeyDown(e.target.value);
    }
  }

  // Calls the onClick function in the HomePage
  // that triggers a search of a blank string
  // effectively "Resetting" the previous search.
  const handleSearchReset = () => {
    setSearchText("");
    props.onClick();
  }

  return(
    <Grid item xs={6}
          sx={{alignItems: "center", justifyContent: "center", display: {xs: "none", sm: "flex", md: "flex"}}}>
      {/*{displaySearchBarIfNeeded()}*/}

      <Search>
        <SearchIconWrapper>
          <SearchIcon/>
        </SearchIconWrapper>
        <StyledInputBase
          key="search1234"
          autoFocus
          placeholder="Search for a skill to learn..."
          inputProps={{'aria-label': 'search'}}
          onChange={handleSearchBarOnChange}
          value={searchText}
          onKeyDown={(e) => handleEnterPressed(e)}
          // onFocus={() => setDisplayResetIcon("block")}
          // onBlur={() => setDisplayResetIcon("none")}
          endAdornment={
            <IconButton color={"secondary"} onClick={(e) => handleSearchReset(e)}>
              <ResetIcon
                fontSize={"small"}
                // sx={{marginRight: "5px", display:{displayResetIcon} }}
                sx={{marginRight: "5px", cursor: "pointer"}}
                // onClick={() => setSearchText("")}
              />
            </IconButton>
          }
        />
      </Search>


      {/*<FormControl sx={{ m: 0, width: '25ch', backgroundColor:"grey.500" }} variant="outlined">*/}
      {/*  <InputLabel htmlFor="outlined-adornment-search">search</InputLabel>*/}
      {/*  <OutlinedInput*/}
      {/*    id="outlined-adornment-search"*/}
      {/*    type={'text'}*/}
      {/*    value={""}*/}
      {/*    size={"small"}*/}
      {/*    color={"warning"}*/}
      {/*    // onChange={handleChange('password')}*/}
      {/*    endAdornment={*/}
      {/*      <InputAdornment position="end">*/}
      {/*        <SearchIcon*/}
      {/*          aria-label="search button"*/}
      {/*          // onClick={handleClickShowPassword}*/}
      {/*          // onMouseDown={handleMouseDownPassword}*/}
      {/*          edge="end"*/}
      {/*          color={"warning"}*/}
      {/*        >*/}
      {/*          {""}*/}
      {/*        </SearchIcon>*/}
      {/*      </InputAdornment>*/}
      {/*    }*/}
      {/*    label="Password"*/}
      {/*  />*/}
      {/*</FormControl>*/}
      {/*<Search>*/}
      {/*  <SearchIconWrapper>*/}
      {/*    <SearchIcon />*/}
      {/*  </SearchIconWrapper>*/}
      {/*  <StyledInputBase*/}
      {/*    // key="home-search-bar"*/}
      {/*    placeholder="Search for a skill to learn..."*/}
      {/*    inputProps={{ 'aria-label': 'search' }}*/}
      {/*    // onChange={handleSearchBarOnChange}*/}
      {/*    // value={searchText}*/}
      {/*    // onFocus={() => setDisplayResetIcon("block")}*/}
      {/*    // onBlur={() => setDisplayResetIcon("none")}*/}
      {/*    // autoFocus*/}
      {/*    // endAdornment={*/}
      {/*    //   <ResetIcon*/}
      {/*    //     // sx={{marginRight: "5px", display:{displayResetIcon} }}*/}
      {/*    //     sx={{marginRight: "5px", display:displayResetIcon }}*/}
      {/*    //     // onClick={() => alert("Reset Search coming soon")}/>}*/}
      {/*    //     // onClick={() => setSearchText("")}*/}
      {/*    //     // onKeyDown={(e) => {e.key === 'enter'? alert("Enter Key Pressed") : console.log("Enter Key not pressed")} }*/}
      {/*    //   />*/}
      {/*    // }*/}
      {/*  />*/}
      {/*</Search>*/}

      {/*<Button*/}
      {/*  onFocus*/}
      {/*>*/}
      {/*</Button>*/}
    </Grid>
  )
}