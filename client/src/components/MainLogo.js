import {Link as RouterLink} from "react-router-dom";
import logo1WhiteTransparent from "../logo1WhiteTransparent.png";

const MainLogo = () => {
    return (
            <RouterLink to="/">
                <img src={logo1WhiteTransparent} alt="Logo" />
            </RouterLink>
    );
};

export default MainLogo;