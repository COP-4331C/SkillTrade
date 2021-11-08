import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Login from "./Login";
import {Dialog} from "@material-ui/core";

const loginModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  width: "auto",
  overflow: "scroll"
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleOpen}
        sx={{whiteSpace: 'nowrap'}}
      >
        Sign in
      </Button>
      <Modal open={open} onClose={handleClose} >
        <Box sx={loginModalStyle} >
          <Login onClick={() => { handleClose() }}/>
        </Box>
      </Modal>
    </div>
  );
}
