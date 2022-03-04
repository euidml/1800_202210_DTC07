import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link as RouterDomLink, useNavigate } from "react-router-dom";
import { } from "react-router-dom";
import { auth, sendPasswordReset as sendPasswordResetEmail } from "../firebase";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
    Link,
  } from "@material-ui/core";
import logo from "../Olympic_Rings.svg";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const logoStyle = { width: "100%" };
  const btnstyle = { margin: "8px 0", backgroundColor: "Black" };
  useEffect(() => {
    if (loading) return;
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
        placeholder="Your email address"
        fullWidth
        required
      />
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
        Don't have an account?  <RouterDomLink to="/register">Sign Up</RouterDomLink>
      </Typography>
    </Paper>
  </Grid>
  );
}
export default Reset;