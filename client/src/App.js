import './App.css';
import Login from './components/Login';
import Registration from './components/registration/Registration';
import Footer from './components/Footer';
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (

    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/Login" component={Login} />
            <Route path="/Registration" component={Registration} />
          </Switch>
          <Footer />
        </div>
    </Router>
  );
}

export default App;