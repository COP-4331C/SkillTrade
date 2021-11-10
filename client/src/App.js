import './App.css';
import Registration from './components/registration/Registration';
import Footer from './components/Footer';
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Skills from './Pages/Skills';
import ProfilePage from "./Pages/ProfilePage";
import Login from './components/Login';
import NavBar from './components/NavBar';
import Testcard from './components/Testcard'
import { Switch } from 'react-router';


function App() {
  return (

    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/registration" component={ Registration} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/card" component={Skills}/>
            <Route path="/card2" component={Testcard}/>

            {/* <Route path="/testProgile" component= */}
          </Switch>
          <Footer />
        </div>
    </Router>
  );
}

export default App;