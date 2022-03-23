import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider } from '@material-ui/core';
import SettingProfileCard from "./SettingProfileCard"
import { Button } from '@material-ui/core';
import { Link as RouterDomLink } from "react-router-dom";
import LogOutPopout from './LogOutPopout';
import { logout } from "./firebase";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function Settingpage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SettingProfileCard/>
      <Box padding={2}>
        

      <Grid container spacing={2}>
      <Grid item xs={12}>
        <span>USER SETTINGS</span>
        </Grid>
        <Grid item xs={12}>
        <Button variant="text" fullWidth={true} style={{justifyContent: "flex-start"}} component={RouterDomLink} to="/dashboard/profile">My Account</Button>
        </Grid>
        <Grid item xs={12}>
        <Button variant="text" fullWidth={true} style={{justifyContent: "flex-start"}}>About Me</Button>
        </Grid>

        <Grid item xs={12}>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
        <span>APP INFORMATION</span>
        </Grid>

        <Grid item xs={12}>
        <Button variant="text" fullWidth={true} style={{justifyContent: "flex-start"}}>Support</Button>
        </Grid>
        <Grid item xs={12}>
        <Button variant="text" fullWidth={true} style={{justifyContent: "flex-start"}}>Updates</Button>
        </Grid>
        <Grid item xs={12}>
        <Button variant="text" fullWidth={true} style={{justifyContent: "flex-start"}}>Acknowledgment</Button>
        </Grid>

        
        <Grid item xs={12}>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
        <LogOutPopout className="logout"/>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
}
