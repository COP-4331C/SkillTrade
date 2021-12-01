import "./App.css";
import RegistrationPage from "./Pages/RegistrationPage";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Skills from "./Pages/Skills";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import Testcard from "./components/Testcard";
import Addskills from "./components/Addskills";
import Resetpassword from "./Pages/Resetpassword";
import ChangePasswordPage from "./Pages/ChangePasswordPage";
import SkillCreditsPage from "./Pages/SkillCreditsPage";
import ChatPage from "./Pages/chatPage/ChatPage";
import PrivateRoutes from "./components/PrivateRoutes";


function App() {

  return (
    <Router>
      <div className="App">
        <Box className="App-body">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/registration" component={RegistrationPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/Resetpassword" component={Resetpassword} />
            {/*<PrivateRoutes exact path="/home" name="company" component={props => <HomePage {...props}/>} />*/}
            <PrivateRoutes exact path="/home" component={HomePage} />
            <PrivateRoutes path="/profile/:userId?" component={ProfilePage} />
            <PrivateRoutes path="/card/:userId?" component={Testcard} />
            <PrivateRoutes path="/cards/:userId?" component={Addskills} />
            <PrivateRoutes path="/skillpage/:userId?" component={Skills} />
            <PrivateRoutes path="/change" component={ChangePasswordPage} />
            <PrivateRoutes path="/BuyCredits" component={SkillCreditsPage} />
            <PrivateRoutes path="/Chat" component={ChatPage} />
          </Switch>
        </Box>
        <Footer className="App-footer" />
      </div>
    </Router>
  );
}

export default App;
