import './App.css';
import Login from './components/Login';
import Registration from './components/registration/Registration';
import Footer from './components/Footer';
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";

function App() {
  return (

    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/Registration" component={Registration} />
            <Route path="/Home" component={HomePage} />
          </Switch>
          <Footer />
        </div>
    </Router>
  );
}

export default App;