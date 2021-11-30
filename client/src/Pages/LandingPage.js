import AppNavBar from "../components/AppNavBar";
import { Header } from "../components/header";
import {Sections} from "../components/Sections";

const LandingPage = () => {

  return (
    <div>
      <AppNavBar/>
      <Header />
      <Sections />
    </div>
  );
};

export default LandingPage;