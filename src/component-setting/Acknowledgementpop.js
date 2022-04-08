import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Acknowledgment() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button fullWidth={true} style={{justifyContent: "flex-start", color: 'black'}} onClick={handleClickOpen}><span className='Setting_text'>Acknowledgment</span></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Created by DTC-TEAM07:"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <p>Edward Lee</p>
              <br/>
              <p>Hairun Huang</p>
              <br/>
              <p>Jason Lui</p>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}