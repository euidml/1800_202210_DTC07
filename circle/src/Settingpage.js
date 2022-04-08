import React, {useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Divider } from "@material-ui/core";
import SettingProfileCard from "./SettingProfileCard";
import { Button } from "@material-ui/core";
import { Link as RouterDomLink } from "react-router-dom";
import LogOutPopout from "./LogOutPopout";
import MyAccountPopout from "./MyAccountPopout";
import Acknowledgment from "./Acknowledgementpop";
import Support from "./SupportPopup";
import Version from "./AppInfoPopout";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { logout, auth, useAuth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { fabClasses } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary
}));

export default function Settingpage() {
  const [loading, setLoading] = useState(false);
  // const [photoURL, setPhotoURL] = useState(
  //   "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
  // );
  const [people, setPeople] = useState([]);
  const [name, userName] = useState("")
  const [user] = useAuthState(auth);
  const [picture, setPicture] = useState("");
  const [profileAvailablity] = useState(true)
  const q = doc(db, "UserInfo", user?.uid)

  const handleSubmit = (e) => {
    setLoading(true)
    const storage = getStorage();
    const userProfileImageRef = ref(storage, user.uid + picture.name);
    console.log(userProfileImageRef);
    uploadBytes(userProfileImageRef, picture).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    getDownloadURL(userProfileImageRef).then((url) => {
      console.log(url);
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();
      const currentUserInfo = doc(db, "UserInfo", user.uid);
      console.log(url)
       updateDoc(currentUserInfo, {
        profilePhoto: {
          availability: profileAvailablity,
          photo: url
        }
      });
    });
    setLoading(false)
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
    }
  }
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SettingProfileCard />
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <span className="Setting_title">AVATAR UPLOAD PHOTO </span>
          </Grid>
          <Grid container spacing={12} className="Setting_upload_container">
          <Grid item xs={6}>
            <span class="btn btn-primary btn-file">
              {" "}
              <span>Find image</span>
              <input
                type={"file"}
                className="Setting_input"
                onChange={handleChange}
              ></input>
            </span>
          </Grid>
          <Grid item xs={6}>
            {/* <div className="=Setting_upload_box"> */}
              {picture !== null && (
                <button className="Setting_upload" onClick={handleSubmit} disabled={loading}>
                  Upload
                </button>
              )}
            {/* </div> */}
          </Grid>
          </Grid>
          <Grid item xs={12}>
            <span className="Setting_title">USER SETTINGS</span>
          </Grid>
          <Grid item xs={1}>
            <AccountBoxRoundedIcon fontSize="Large" color="primary" />
          </Grid>
          <Grid item xs={11}>
            <MyAccountPopout />
          </Grid>
          <Grid item xs={1}>
            <CreateRoundedIcon fontSize="Large" color="primary" />
          </Grid>
          <Grid item xs={11}>
            <Button
              variant="text"
              fullWidth={true}
              style={{ justifyContent: "flex-start" }}
              component={RouterDomLink}
              to="/dashboard/profile"
            >
              <span className="Setting_text">About Me</span>
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <span className="Setting_title">GENERAL INFORMATION</span>
          </Grid>

          <Grid item xs={1}>
            <HelpRoundedIcon fontSize="Large" color="primary" />
          </Grid>
          <Grid item xs={11}>
            <Support />
          </Grid>

          <Grid item xs={1}>
            <InfoRoundedIcon fontSize="Large" color="primary" />
          </Grid>
          <Grid item xs={11}>
            <Version />
          </Grid>

          <Grid item xs={1}>
            <GroupsRoundedIcon fontSize="Large" color="primary" />
          </Grid>
          <Grid item xs={11}>
            <Acknowledgment />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <LogOutPopout className="logout" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
