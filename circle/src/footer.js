import React from "react";
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      background: "Salmon",
      
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
          <BottomNavigationAction label='Home' icon={<HomeRoundedIcon/>}/>
          <BottomNavigationAction label='Favorites' icon={<FavoriteRoundedIcon />}/>
          <BottomNavigationAction label='Chat' icon={<ForumRoundedIcon />}/>
          <BottomNavigationAction label='Profile' icon={<PersonRoundedIcon />}/>
        </BottomNavigation>
      </div>
    );
  }
  
  export default Footer;
  