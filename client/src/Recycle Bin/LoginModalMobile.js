import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Login from "../components/Login";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";

export default function LoginModalMobile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleOpen}>
        <LoginIcon/>
      </IconButton>
      <Typography onClick={handleOpen}  sx={{width: "100%"}}>Sign in      </Typography>

      <Modal open={open} onClose={handleClose} >
        <Box sx={loginModalStyle}>
          <Login onClick={() => { handleClose() }}/>
        </Box>
      </Modal>
    </>
  );
}

const loginModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
};
