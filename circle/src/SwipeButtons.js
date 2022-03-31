import React from 'react';
import "./SwipeButtons.css";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import IconButton from "@material-ui/core/IconButton"
import Drawer from '@material-ui/core/Drawer'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"

function SwipeButtons() {

    const [state, setState] = React.useState(false)
    const toggleDrawer = (open) => (event) => {
        setState(open)
    }

    const list = () => (
        <div onClick={toggleDrawer(false)}>
            <List>
                <ListItem>
                    <p>It works, hell yeah!</p>
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
                <Drawer anchor={"top"} open={state} onClose={toggleDrawer(false)}
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