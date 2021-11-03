import './App.css';
import Registration from './components/registration/Registration';
import Footer from './components/Footer';
import LandingPage from "./Pages/LandingPage";
import LoginModal from './components/LoginModal';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from './components/Login';

function App() {
  return (

    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/Registration" component={Registration} />
            <Route path="/Login" component={Login} />
            <Route path="/Home" component={HomePage} />
          </Switch>
          <Footer />
        </div>
    </Router>
  );
}

export default App;