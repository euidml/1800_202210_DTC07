import React, { useEffect } from "react";
import "./SwipeButtons.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SportsHockeyRoundedIcon from "@mui/icons-material/SportsHockeyRounded";
import IceSkatingRoundedIcon from "@mui/icons-material/IceSkatingRounded";
import DownhillSkiingRoundedIcon from "@mui/icons-material/DownhillSkiingRounded";
import SnowboardingRoundedIcon from "@mui/icons-material/SnowboardingRounded";

function SwipeButtons({
  setActiveFilter,
  swipe
}) {
  // useEffect(() => {
  //     if (activeFilter === "") {
  //         setFilter(people)
  //         return;
  //     }
  //     const filtered = people.filter((person) => person.)

  // }, [activeFilter]);

  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const list = () => (
    <div>
      <List>
        <ListItem className="title_list">
          <p>
            <span>Sport filter</span>
          </p>
        </ListItem>
      </List>
      <List className="list_item" fontSize="large">
        <ListItem button={true} onClick={() => setActiveFilter("Hockey")}>
          <SportsHockeyRoundedIcon />
        </ListItem>
        <ListItem button={true} onClick={() => setActiveFilter("Skating")}>
          <IceSkatingRoundedIcon />
        </ListItem>
        <ListItem button={true} onClick={() => setActiveFilter("Skiing")}>
          <DownhillSkiingRoundedIcon />
        </ListItem>
        <ListItem button={true} onClick={() => setActiveFilter("Snowboarding")}>
          <SnowboardingRoundedIcon />
        </ListItem>
      </List>
    </div>
  );
  useEffect(() => {
    
  }, []);
  return (
    <div className="swipeButtons">
      <IconButton className="swipe_left" onClick={() => swipe('left')}>
        <CloseRoundedIcon fontSize="large" />
      </IconButton>

      <IconButton className="filter">
        <FilterAltRoundedIcon fontSize="large" onClick={toggleDrawer(true)} />
        <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </IconButton>

      <IconButton className="swipe_right" onClick={() => swipe('right')}>
        <CheckRoundedIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default SwipeButtons;
