import './App.css';
import Login from './components/Login';
import Registration from './components/registration/Registration';
import Footer from './components/Footer';
import AppNavBar from './components/AppNavBar';

function App() {
  return (

    <div className="App">
      {/* <Registration />*/}
      <AppNavBar />
      <Login />
      <Footer />
    </div>
  );
}

export default App;