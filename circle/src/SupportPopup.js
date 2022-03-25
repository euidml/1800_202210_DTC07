import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Support() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button fullWidth={true} style={{justifyContent: "flex-start", color: 'black'}} onClick={handleClickOpen}> <span className='Setting_text'>Support</span></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select Your Desired Support"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <Button href='https://discord.gg/VcyZ4K3'> Technical Support</Button>
              <br/>
              <Button href='https://www.optionsforsexualhealth.org/care/'> Medical Support</Button>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}