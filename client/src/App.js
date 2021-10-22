import './App.css';
import React, { Component } from 'react';
import Login from './components/Login';
import Registration from './components/registration/Registration';
import Footer from './components/Footer';
import AppNavBar from './components/AppNavBar';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

class App extends Component {
  render(){
    return(
      <Router>
        <Route path="/" component={AppNavBar}/>
        <Route path="/Login" component={AppNavBar,Login}/>
        <Route path="/Register" component={AppNavBar,Registration}/>
      </Router>
      // {/* <Registration /> */}
      // <AppNavBar />
      // <LandingPage/>
      // <Login />
      // <Footer />
    
  );
}}


export default App;