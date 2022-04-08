import React from "react";
import "./SwipeButtons.css";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SportsHockeyRoundedIcon from "@mui/icons-material/SportsHockeyRounded";
import IceSkatingRoundedIcon from "@mui/icons-material/IceSkatingRounded";
import DownhillSkiingRoundedIcon from "@mui/icons-material/DownhillSkiingRounded";
import SnowboardingRoundedIcon from "@mui/icons-material/SnowboardingRounded";
import Divider from "@mui/material/Divider";
import like from "./like.png";
import dislike from "./dislike.png";

// function to render fileter and direction icon for photo cards.
function SwipeButtons({ setActiveFilter }) {
  // declaring data used in this component.
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  // rendering filter
  const list = () => (
    <div>
      <List>
        <ListItem className="title_list">
          <p>
            <span>
              Sport
              <br />
              Filter
            </span>
          </p>
        </ListItem>
        <Divider />
      </List>
      <List>
        <ListItem
          className="list_item"
          fontSize="large"
          button={true}
          onClick={() => setActiveFilter("Hockey")}
        >
          <SportsHockeyRoundedIcon fontSize="large" />
        </ListItem>
        <Divider />
        <ListItem
          className="list_item"
          button={true}
          onClick={() => setActiveFilter("Skating")}
        >
          <IceSkatingRoundedIcon fontSize="large" />
        </ListItem>
        <Divider />
        <ListItem
          className="list_item"
          button={true}
          onClick={() => setActiveFilter("Skiing")}
        >
          <DownhillSkiingRoundedIcon fontSize="large" />
        </ListItem>
        <Divider />
        <ListItem
          className="list_item"
          button={true}
          onClick={() => setActiveFilter("Snowboarding")}
        >
          <SnowboardingRoundedIcon fontSize="large" />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div className="swipeButtons">
      <img className="swipe_right" src={dislike}></img>

      <IconButton className="filter">
        <FilterAltRoundedIcon fontSize="large" onClick={toggleDrawer(true)} />
        <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </IconButton>
      <img className="swipe_right" src={like}></img>
    </div>
  );
}

export default SwipeButtons;
