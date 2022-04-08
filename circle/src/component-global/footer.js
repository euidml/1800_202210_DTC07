import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterDomLink } from "react-router-dom";

//function for footer
const useStyles = makeStyles({
  // declaring styles
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    background: "#9acd32"
  }
});

function Footer() {
  // declaring what data is used at footer
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handlechange = (event, newValue) => {
    setValue(newValue);
  };

  // rendering footer
  return (
    <div>
      {/* footer */}
      <BottomNavigation
        // className={classes.root}
        value={value}
        onChange={(event, newValue) => handlechange(event, newValue)}
        className={classes.stickToBottom}
        icon-color={"#0000"}
      >
        {/* each icons */}
        <BottomNavigationAction
          component={RouterDomLink}
          to="/dashboard"
          icon={<HomeRoundedIcon />}
        />
        <BottomNavigationAction
          component={RouterDomLink}
          to="/favorite"
          icon={<FavoriteRoundedIcon />}
        />
        <BottomNavigationAction
          component={RouterDomLink}
          to="/dashboard/chats"
          icon={<ForumRoundedIcon />}
        />
        <BottomNavigationAction
          component={RouterDomLink}
          to="/bottom/settingpage"
          icon={<SettingsRoundedIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default Footer;
