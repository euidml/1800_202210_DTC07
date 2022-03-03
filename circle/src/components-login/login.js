import React, { useEffect, useState } from "react";
import { Link as RouterDomLink, Route, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import logo from "./oring_logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const outterLayoutStyle = {};
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const logoStyle = { width: "100%" };
  const btnstyle = { margin: "8px 0", backgroundColor: "Black" };
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (<Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "100vh" }}
  >
    <Paper elevation={4} style={paperStyle}>
      <Grid align="center">
        <img src={logo} className="App-logo" alt="logo" style={logoStyle} />
        <h2>Welcome To Circle</h2>
      </Grid>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        fullWidth
        required
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        type="password"
        fullWidth
        required
      />
      <FormControlLabel
        control={<Checkbox name="checkedB" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={btnstyle}
        fullWidth
        onClick={() => signInWithEmailAndPassword(auth, email, password)}
      >
        Sign in
      </Button>
      <Typography>
        <RouterDomLink to="resetpassword">Forgot password?</RouterDomLink>
      </Typography>
      <Typography>
        {" "}
        Do you have an account?  <RouterDomLink to="/register">Sign Up</RouterDomLink>
      </Typography>
    </Paper>
  </Grid>
  );
};

export default Login;

