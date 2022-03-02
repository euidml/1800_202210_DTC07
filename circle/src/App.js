import logo from "./oring_logo.png";
import "./App.css";
import * as React from 'react';
import ReactDOM from 'react-dom';
// import Button from '@mui/material/Button';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


function App() {
  const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Circle
        </p>
        {/* <Button variant="text">Text</Button> */}
        <Button variant="contained">Contained</Button>
        {/* <Button variant="outlined">Outlined</Button> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        
      </header>
    </div>
  );
}

export default App;
