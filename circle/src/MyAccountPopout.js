import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import {app} from "./firebase"

export default function MyAccountPopout() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   const [currentUser, setCurrentUser] = useState()

//   useEffect(() => {
//     app.auth().onAuthStateChanged((user) => {setCurrentUser(user)})
//   }, [])

  return (
    <div>
      <Button fullWidth={true} style={{justifyContent: "flex-start", color: 'black'}} onClick={handleClickOpen}> <span className='Setting_text'>My Account</span></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"User Account Info"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* {currentUser && <p>{currentUser.displayName}</p>} */}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}