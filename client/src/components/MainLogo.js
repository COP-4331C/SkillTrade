import {Link as RouterLink} from "react-router-dom";
import logo1WhiteTransparent from "../logo1WhiteTransparent.png";
import Box from "@mui/material/Box";

const MainLogo = () => {
    return (
        <Box>
            <RouterLink to="/" >
                <img src={logo1WhiteTransparent} alt="Logo" />
            </RouterLink>
        </Box>
    );
};

export default MainLogo;