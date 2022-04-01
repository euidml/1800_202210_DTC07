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
import { Divider } from "@mui/material";

function SwipeButtons({
  setActiveFilter,
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
            <span>Sport <br/>filter</span>
          </p>
        </ListItem>
        <Divider/>
      </List>
      <List>
        <ListItem className="list_item" fontSize="large"button={true} onClick={() => setActiveFilter("Hockey")}>
          <SportsHockeyRoundedIcon fontSize="large"/>
        </ListItem>
        <Divider/>
        <ListItem className="list_item" button={true} onClick={() => setActiveFilter("Skating")}>
          <IceSkatingRoundedIcon fontSize="large"/>
        </ListItem>
        <Divider/>
        <ListItem className="list_item" button={true} onClick={() => setActiveFilter("Skiing")}>
          <DownhillSkiingRoundedIcon fontSize="large"/>
        </ListItem>
        <Divider/>
        <ListItem className="list_item" button={true} onClick={() => setActiveFilter("Snowboarding")}>
          <SnowboardingRoundedIcon fontSize="large" />
        </ListItem>
      </List>
    </div>
  );
  useEffect(() => {
    
  }, []);
  return (
    <div className="swipeButtons">
      <IconButton className="swipe_left">
        <CloseRoundedIcon fontSize="large" />
      </IconButton>

      <IconButton className="filter">
        <FilterAltRoundedIcon fontSize="large" onClick={toggleDrawer(true)} />
        <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </IconButton>

      <IconButton className="swipe_right">
        <CheckRoundedIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default SwipeButtons;
