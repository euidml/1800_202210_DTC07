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
import MyAccountPopout from './MyAccountPopout';
import Acknowledgment from './Acknowledgementpop';
import Support from './SupportPopup';
import Version from './AppInfoPopout';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
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
        <span className='Setting_title'>USER SETTINGS</span>
        </Grid>
        <Grid item xs={1}>
        <AccountBoxRoundedIcon fontSize='Large' color='primary'/>
        </Grid>
        <Grid item xs={11}>
        <MyAccountPopout/>
        </Grid>
        <Grid item xs={1}>
        <CreateRoundedIcon fontSize='Large' color='primary'/>
        </Grid>
        <Grid item xs={11}>
        <Button variant="text" fullWidth={true} style={{justifyContent: "flex-start"}} component={RouterDomLink} to="/dashboard/profile"><span className='Setting_text'>About Me</span></Button>
        </Grid>

        <Grid item xs={12}>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
        <span className='Setting_title'>GENERAL INFORMATION</span>
        </Grid>


        <Grid item xs={1}>
        <HelpRoundedIcon fontSize='Large' color='primary'/>
        </Grid>
        <Grid item xs={11}>
        <Support/>
        </Grid>

        <Grid item xs={1}>
        <InfoRoundedIcon fontSize='Large' color='primary'/>
        </Grid>
        <Grid item xs={11}>
        <Version/>
        </Grid>

        <Grid item xs={1}>
        <GroupsRoundedIcon fontSize='Large' color='primary'/>
        </Grid>
        <Grid item xs={11}>
        <Acknowledgment/>
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
