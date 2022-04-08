import React, { useEffect, useState } from "react";
import { Link as RouterDomLink, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../component-global/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import logo from "./Circle_logo_front.png";
import theme from "./Palette"

// rendering login page
const Login = () => {
  // declaring data we will use in this component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto"
  };
  const logoStyle = { width: "20vh", height: "20vh", bgcolor: "#633cff" };
  const btnstyle = {
    margin: "8px 0",
    backgroundColor: theme.palette.primary.main
  };
  // rendering login page.
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <Grid
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
        <Grid style={{ height: "18vh" }}>
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
        </Grid>
        <Button
          type="submit"
          color="primary"
          bgcolor={theme.palette.primary.main}
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
          Do you have an account?{" "}
          <RouterDomLink to="/register">Sign Up</RouterDomLink>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
