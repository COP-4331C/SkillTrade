import AppNavBar from "../components/AppNavBar";
import { Header } from "../components/header";
import {Sections} from "../components/Sections";
import HomeNavBar from "../components/HomeNavBar";
import * as React from "react";
import axios from "axios";
import {useEffect, useState} from "react";

const LandingPage = () => {

  const token = localStorage.getItem("token");
  const [loggedUserAvatar, setLoggedUserAvatar] = useState("");
  const [loggedUserId, setLoggedUserId] = useState("");

  function fetchUserAvatar() {
    axios.get(
      "/api/user/profile",
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(function (response) {
        setLoggedUserAvatar(response.data["profilePic"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function fetchUserId() {
  // Fetches the logged user's Id
  axios.get(
    "api/user/id",
    { headers: { Authorization: `Bearer ${token}` } }
  )
    .then(function (response) {
      setLoggedUserId(response.data["userId"]);
    })
    .catch(console.log)
}

  useEffect(() => {
    if(token !== null) {
      fetchUserAvatar();
      fetchUserId();
    }
  }, [])


 function navBar () {
    if(token !== null) {

      return(
        <HomeNavBar
          loggedUserAvatar={loggedUserAvatar}
          loggedUserId={loggedUserId}
          // onKeyDown={(textToSearch) => { handleEnterKey(textToSearch) }}
          // onClick={() => { handleResetSearch() }}
        />
      );
    } else {
      return(<AppNavBar/>);
    }
  }

  return (
    <div>
      {navBar()}
      <Header />
      <Sections />
    </div>
  );
};

export default LandingPage;