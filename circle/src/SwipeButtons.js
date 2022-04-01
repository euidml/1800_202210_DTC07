import React, { useEffect } from 'react';
import "./SwipeButtons.css";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import IconButton from "@material-ui/core/IconButton"
import Drawer from '@material-ui/core/Drawer'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import SportsHockeyRoundedIcon from '@mui/icons-material/SportsHockeyRounded';
import IceSkatingRoundedIcon from '@mui/icons-material/IceSkatingRounded';
import DownhillSkiingRoundedIcon from '@mui/icons-material/DownhillSkiingRounded';
import SnowboardingRoundedIcon from '@mui/icons-material/SnowboardingRounded';
import Divider from '@mui/material/Divider';


function SwipeButtons(
    setActiveFilter, activeFilter, people, setFilter) {

    // useEffect(() => {
    //     if (activeFilter === "") {
    //         setFilter(people)
    //         return;
    //     }
    //     const filtered = people.filter((person) => person.)

    // }, [activeFilter]);

    const [state, setState] = React.useState(false)
    const toggleDrawer = (open) => (event) => {
        setState(open)
    }

    const list = () => (
        <div>
            <List>
                <ListItem className='title_list' >
                    <h4><span >Sport filter</span></h4>
                </ListItem>
            </List>
            <Divider/>
            <List>

                <ListItem button divider onClick={() => setActiveFilter('Hockey')}>
                    <SportsHockeyRoundedIcon className='list_item' fontSize='large' />

                </ListItem >
                <ListItem button divider onClick={() => setActiveFilter('Skating')}>
                    <IceSkatingRoundedIcon className='list_item' fontSize='large'/>
                </ListItem>
                <ListItem button divider onClick={() => setActiveFilter('Skiing')}>
                    <DownhillSkiingRoundedIcon className='list_item' fontSize='large'/>
                </ListItem>
                <ListItem button divider onClick={() => setActiveFilter('Snowboarding')}>
                    <SnowboardingRoundedIcon className='list_item' fontSize='large'/>
                </ListItem>
            </List>
        </div>
    )

    return (
        <div className='swipeButtons'>
            <IconButton className='swipe_left'>
                <CloseRoundedIcon fontSize='large' />
            </IconButton>


            <IconButton className='filter'>
                <FilterAltRoundedIcon fontSize='large' onClick={toggleDrawer(true)} />
                <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}
                >

                    {list()}
                </Drawer>
            </IconButton>


            <IconButton className='swipe_right' >
                <CheckRoundedIcon fontSize='large' />
            </IconButton>
        </div>
    );
}

export default SwipeButtons