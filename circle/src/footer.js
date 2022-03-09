import React from "react";
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { makeStyles } from '@material-ui/core/styles'
import { logout } from "./firebase";
import LogOutPopout from "./LogOutPopout";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link } from "react-router-dom";


const useStyles = makeStyles({
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      background: "#9acd32",
      
    },
  });
  
  function Footer() {
  
    const classes = useStyles()
  
    const [value, setValue] = React.useState(0)
  
    const handlechange =(event, newValue) => {
      setValue(newValue)
    }
    return (
  
      <div>
        <BottomNavigation
          className={classes.root}
          value={value}
          onChange={(event, newValue) => handlechange(event, newValue)}
          className={classes.stickToBottom}
          icon-color={"#0000"}
          >
          <BottomNavigationAction component={Link} to='/dashboard' icon={<HomeRoundedIcon/>}/>
          <BottomNavigationAction icon={<FavoriteRoundedIcon />}/>
          <BottomNavigationAction component={Link} to='/dashboard/chats' icon={<ForumRoundedIcon />}/>
          <BottomNavigationAction onClick={logout} icon={<PersonRoundedIcon />}/>
          {/* <BottomNavigationAction onClick={LogOutPopout} icon={<LogoutRoundedIcon />}/> */}
        </BottomNavigation>
      </div>
    );
  }
  
  export default Footer;
  