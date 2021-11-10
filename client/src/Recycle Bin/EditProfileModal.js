import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {useState} from "react";
import EditProfile from "../components/EditProfile";

const editModalStyle = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
};

export default function EditProfileModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box sx={{flexGrow: 1, textAlign: "right"}}>
        <IconButton
          color="primary"
          aria-label="edit"
          onClick={handleOpen}
        >
          <EditOutlinedIcon/>
        </IconButton>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={editModalStyle}>
          <EditProfile onClick={() => {handleClose()}}/>
        </Box>
      </Modal>
    </div>
  );
}
