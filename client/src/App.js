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
import SkillCreditsPage from "./Pages/SkillCreditsPage";
import Testcard from "./components/Testcard";
import Addskills from "./components/Addskills";
import Resetpassword from "./Pages/Resetpassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Box className="App-body">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/registration" component={RegistrationPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/card/:userId?" component={Testcard} />
            <Route path="/cards/:userId?" component={Addskills} />
            <Route path="/skillpage/:userId?" component={Skills} />
            <Route path="/Resetpassword" component={Resetpassword} />
            <Route path="/BuyCredits" component={SkillCreditsPage} />

            {/* <Route path="/card/:userId?" component={Testcard}/> */}
          </Switch>
        </Box>
        <Footer className="App-footer" />
      </div>
    </Router>
  );
}

export default App;
