import './App.css';
import Registration from './components/registration/Registration';
import Footer from './components/Footer';
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfilePage2 from "./Pages/ProfilePage2";

function App() {
  return (

    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={LandingPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/profile2" component={ProfilePage2} />
          </Switch>
          <Footer />
        </div>
    </Router>
  );
}

export default App;