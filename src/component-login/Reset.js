import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link as RouterDomLink, useNavigate } from "react-router-dom";
import {} from "react-router-dom";
import {
  auth,
  sendPasswordReset as sendPasswordResetEmail
} from "../component-global/firebase";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import logo from "./Circle_logo_front.png";
import theme from "./Palette"

// rendering password reset page.
function Reset() {
  // declaring the data used in this component.
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto"
  };
  const logoStyle = { width: "20vh", height: "20vh" };
  const btnstyle = {
    margin: "8px 0",
    backgroundColor: theme.palette.primary.main
  };
  // render reset page.
  useEffect(() => {
    if (loading) return;
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
            placeholder="Your email address"
            fullWidth
            required
          />
        </Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={() => sendPasswordResetEmail(email)}
        >
          Send password reset email
        </Button>
        <Typography>
          {" "}
          Don't have an account?{" "}
          <RouterDomLink to="/register">Sign Up</RouterDomLink>
        </Typography>
      </Paper>
    </Grid>
  );
}
export default Reset;
