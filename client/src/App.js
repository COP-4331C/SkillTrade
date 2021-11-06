import './App.css';
import Registration from './components/registration/Registration';
import Footer from './components/Footer';
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (

    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={LandingPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
            {/* <Route path="/testProgile" component= */}
          </Switch>
          <Footer />
        </div>
    </Router>
  );
}

export default App;