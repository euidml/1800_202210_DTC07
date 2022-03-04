import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link as RouterDomLink, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "../firebase";
import {
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
  } from "@material-ui/core";
  import FormControlLabel from "@material-ui/core/FormControlLabel";
  import logo from "../oring_logo.png";
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
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
    const register = () => {
      if (!name) alert("Please enter name");
      registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
      if (loading) return;
      if (user) return navigate("/dashboard");
    }, [user, loading]);
    return(
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
        <h2>Register your account</h2>
      </Grid>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        fullWidth
        required
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
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
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={btnstyle}
        fullWidth
        onClick={register}
      >
        Sign Up
      </Button>
      <Typography>
        {" "}
       Already have an account? <RouterDomLink to="/" >Sign In</RouterDomLink>
      </Typography>
    </Paper>
  </Grid>
  );
  }
  export default Register;