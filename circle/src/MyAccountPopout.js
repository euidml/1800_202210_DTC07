import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDoc, where, doc } from "firebase/firestore";
// import {app} from "./firebase"

function MyAccountPopout() {
  // initiated data we're gonna use with useState()
  const [name, userName] = useState("")
  const [email, userEmail] = useState("")
  // fetch user's auth
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  // q is query
  const q = doc(db, "UserInfo", user?.uid)
  // async means the function is gonna wait until they get proper data, while other functions executed
  const fetchUserInfo = async () => {
    try {
      const doc = await getDoc(q);
      const UserInfo = doc.data();
      // assign each data into proper var
      userName(UserInfo.name);
      userEmail(UserInfo.email);

    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    fetchUserInfo();
    // app.auth().onAuthStateChanged((user) => {setCurrentUser(user)})
  }, [])

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
          <p style={{marginBottom: "8px"}}><span style={{fontWeight: "bold"}}>Name:</span> {name}</p>
          <p><span style={{fontWeight: "bold"}}>Email:</span> {email}</p>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default MyAccountPopout